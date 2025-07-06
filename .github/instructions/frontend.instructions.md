---
applyTo: 'src/routes/*.{ts,tsx}'
---

# Frontend Development Copilot Instructions

## Core Technology Stack
- **TypeScript**: Strict typing, latest ES features
- **TanStack Router**: File-based routing with loaders for data fetching
- **TanStack Form**: Form composition with pre-built field components
- **shadcn/ui**: Accessible, customizable component library
- **tRPC**: End-to-end typesafe APIs using vanilla client

## Development Principles

### 1. TypeScript Best Practices
- Use strict mode with `"strict": true`
- Prefer `interface` over `type` for object shapes
- Use `const assertions` for immutable data
- Leverage discriminated unions for state management
- Always define return types for functions
- Use generics for reusable components

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUserProfile = async (id: string): Promise<UserProfile> => {
  // implementation
}

// Discriminated union for loading states
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
```

### 2. TanStack Router Patterns

#### Route Definition
```typescript
// routes/users/$userId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserProfile,
  loader: ({ params }) => fetchUser(params.userId),
  validateSearch: (search) => ({
    tab: search.tab as 'profile' | 'settings' | undefined,
  }),
})
```

#### Navigation with Type Safety
```typescript
// Use the router's navigate function
const navigate = useNavigate()

// Type-safe navigation
navigate({
  to: '/users/$userId',
  params: { userId: '123' },
  search: { tab: 'profile' }
})

// Link component
<Link 
  to="/users/$userId" 
  params={{ userId: user.id }}
  search={{ tab: 'profile' }}
>
  View Profile
</Link>
```

#### Route Guards and Auth
```typescript
export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: Dashboard,
})
```

### 3. Data Fetching with TanStack Router Loaders

#### Route-Level Data Loading
```typescript
// routes/users.tsx
import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '../utils/trpc'

export const Route = createFileRoute('/users')({
  component: UserList,
  loader: async () => {
    // Use tRPC vanilla client in loaders
    const users = await trpc.user.getAll.query()
    return { users }
  },
  pendingComponent: () => <div>Loading users...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})

function UserList() {
  const { users } = Route.useLoaderData()
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

#### Parameterized Route Loading
```typescript
// routes/users/$userId.tsx
export const Route = createFileRoute('/users/$userId')({
  component: UserProfile,
  loader: async ({ params }) => {
    const [user, posts] = await Promise.all([
      trpc.user.getById.query({ id: params.userId }),
      trpc.post.getByUserId.query({ userId: params.userId })
    ])
    return { user, posts }
  },
  errorComponent: ({ error }) => {
    if (error.message.includes('NOT_FOUND')) {
      return <div>User not found</div>
    }
    return <div>Error loading user: {error.message}</div>
  },
})
```

#### URL-Based State Management with validateSearch
```typescript
// routes/users/index.tsx
import { z } from 'zod'

const userSearchSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(5).max(100).default(10),
  sort: z.enum(['name', 'email', 'created_at']).default('name'),
  order: z.enum(['asc', 'desc']).default('asc'),
  filter: z.string().default(''),
  status: z.enum(['active', 'inactive', 'all']).default('all'),
})

export const Route = createFileRoute('/users/')({
  component: UserList,
  validateSearch: (search: Record<string, unknown>) => {
    return userSearchSchema.parse(search)
  },
  loader: async ({ search }) => {
    const users = await trpc.user.getAll.query(search)
    return { users }
  },
})

function UserList() {
  const { users } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate()

  const updateSearch = (updates: Partial<typeof search>) => {
    navigate({
      to: '/users',
      search: { ...search, ...updates },
    })
  }

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Search users..."
          value={search.filter}
          onChange={(e) => updateSearch({ filter: e.target.value, page: 1 })}
        />
        <Select 
          value={search.status} 
          onValueChange={(status) => updateSearch({ status, page: 1 })}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      
      <Pagination
        currentPage={search.page}
        totalPages={Math.ceil(users.length / search.limit)}
        onPageChange={(page) => updateSearch({ page })}
      />
    </div>
  )
}
```

#### Modal State Management via URL
```typescript
// routes/users/index.tsx with modal state
const userSearchSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(5).max(100).default(10),
  modal: z.enum(['create', 'edit', 'delete']).optional(),
  userId: z.string().optional(),
})

function UserList() {
  const { users } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate()

  const closeModal = () => {
    navigate({
      to: '/users',
      search: { ...search, modal: undefined, userId: undefined },
    })
  }

  const openModal = (modal: 'create' | 'edit' | 'delete', userId?: string) => {
    navigate({
      to: '/users',
      search: { ...search, modal, userId },
    })
  }

  return (
    <div>
      <Button onClick={() => openModal('create')}>
        Create User
      </Button>
      
      {/* User list */}
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onEdit={() => openModal('edit', user.id)}
          onDelete={() => openModal('delete', user.id)}
        />
      ))}
      
      {/* Modals controlled by URL state */}
      {search.modal === 'create' && (
        <CreateUserModal onClose={closeModal} />
      )}
      
      {search.modal === 'edit' && search.userId && (
        <EditUserModal userId={search.userId} onClose={closeModal} />
      )}
      
      {search.modal === 'delete' && search.userId && (
        <DeleteUserModal userId={search.userId} onClose={closeModal} />
      )}
    </div>
  )
}
```

#### Advanced Search with Zod Validation
```typescript
// routes/products/index.tsx
const productSearchSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(10).max(100).default(20),
  category: z.array(z.string()).default([]),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  inStock: z.boolean().default(false),
  sortBy: z.enum(['name', 'price', 'created_at']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  q: z.string().default(''),
})

export const Route = createFileRoute('/products/')({
  validateSearch: (search: Record<string, unknown>) => {
    // Handle array parsing from URL
    const parsed = {
      ...search,
      category: Array.isArray(search.category) 
        ? search.category 
        : search.category 
          ? [search.category] 
          : [],
      page: search.page ? Number(search.page) : 1,
      limit: search.limit ? Number(search.limit) : 20,
      priceMin: search.priceMin ? Number(search.priceMin) : undefined,
      priceMax: search.priceMax ? Number(search.priceMax) : undefined,
      inStock: search.inStock === 'true',
    }
    
    return productSearchSchema.parse(parsed)
  },
  loader: async ({ search }) => {
    const products = await trpc.product.search.query(search)
    const categories = await trpc.category.getAll.query()
    return { products, categories }
  },
})
```

#### tRPC Vanilla Client Setup
```typescript
// utils/trpc.ts
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server/router'

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      headers: () => {
        const token = localStorage.getItem('auth-token')
        return token ? { authorization: `Bearer ${token}` } : {}
      },
    }),
  ],
})

// For mutations in components
export const useTRPCMutation = () => {
  return {
    mutate: trpc,
    // Add any additional mutation utilities here
  }
}
```

### 4. TanStack Form Composition Patterns

#### Form Hook Context Setup
```typescript
// lib/form.tsx
import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

// Export contexts for use in custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

// Create form hook with pre-built field components
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    CheckboxField,
    DateField,
  },
  formComponents: {
    FormWrapper,
    FieldWrapper,
  },
})

export { useAppForm }
```

#### Pre-built Field Components
```typescript
// components/forms/TextField.tsx
import { useFieldContext } from '@/lib/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function TextField({ 
  label, 
  placeholder, 
  type = 'text' 
}: { 
  label: string
  placeholder?: string
  type?: string 
}) {
  const field = useFieldContext<string>()
  
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
      />
      {field.state.meta.errors.length > 0 && (
        <span className="text-red-500 text-sm">
          {field.state.meta.errors[0]}
        </span>
      )}
    </div>
  )
}

// components/forms/SelectField.tsx
export function SelectField({ 
  label, 
  options, 
  placeholder 
}: { 
  label: string
  options: { value: string; label: string }[]
  placeholder?: string 
}) {
  const field = useFieldContext<string>()
  
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Select value={field.state.value} onValueChange={field.handleChange}>
        <SelectTrigger className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {field.state.meta.errors.length > 0 && (
        <span className="text-red-500 text-sm">
          {field.state.meta.errors[0]}
        </span>
      )}
    </div>
  )
}
```

#### Form Usage with Composition
```typescript
// components/UserForm.tsx
import { useAppForm } from '@/lib/form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { trpc } from '@/utils/trpc'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  role: z.enum(['admin', 'user', 'moderator']),
  bio: z.string().optional(),
})

export function UserForm({ 
  initialData, 
  onSuccess 
}: { 
  initialData?: Partial<User>
  onSuccess?: () => void 
}) {
  const form = useAppForm({
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      role: initialData?.role || 'user',
      bio: initialData?.bio || '',
    },
    validatorAdapter: zodValidator,
    validators: {
      onChange: userSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (initialData?.id) {
          await trpc.user.update.mutate({ id: initialData.id, ...value })
        } else {
          await trpc.user.create.mutate(value)
        }
        onSuccess?.()
      } catch (error) {
        console.error('Failed to save user:', error)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <form.AppField
        name="name"
        children={(field) => (
          <field.TextField label="Full Name" placeholder="Enter full name" />
        )}
      />
      
      <form.AppField
        name="email"
        children={(field) => (
          <field.TextField 
            label="Email" 
            type="email" 
            placeholder="Enter email address" 
          />
        )}
      />
      
      <form.AppField
        name="role"
        children={(field) => (
          <field.SelectField
            label="Role"
            placeholder="Select a role"
            options={[
              { value: 'user', label: 'User' },
              { value: 'moderator', label: 'Moderator' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
        )}
      />
      
      <form.AppField
        name="bio"
        children={(field) => (
          <field.TextareaField 
            label="Bio" 
            placeholder="Tell us about yourself..." 
          />
        )}
      />

      <div className="flex gap-2">
        <Button type="submit" disabled={!form.state.canSubmit}>
          {initialData?.id ? 'Update' : 'Create'} User
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </div>
    </form>
  )
}
```

#### Dynamic Field Arrays
```typescript
// components/forms/SkillsField.tsx
export function SkillsField({ label }: { label: string }) {
  const field = useFieldContext<string[]>()
  
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {field.state.value.map((skill, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={skill}
              onChange={(e) => {
                const newSkills = [...field.state.value]
                newSkills[index] = e.target.value
                field.handleChange(newSkills)
              }}
              placeholder="Enter skill"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newSkills = field.state.value.filter((_, i) => i !== index)
                field.handleChange(newSkills)
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => field.handleChange([...field.state.value, ''])}
        >
          Add Skill
        </Button>
      </div>
    </div>
  )
}

// Usage in form
<form.AppField
  name="skills"
  children={(field) => <field.SkillsField label="Skills" />}
/>
```

### 5. shadcn/ui Component Usage

#### Consistent Component Patterns
```typescript
// Always use forwardRef for custom components
const CustomInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    label?: string
    error?: string
  }
>(({ label, error, className, ...props }, ref) => (
  <div className="space-y-2">
    {label && <Label htmlFor={props.id}>{label}</Label>}
    <Input
      ref={ref}
      className={cn(error && "border-red-500", className)}
      {...props}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
))
```

#### Minimal State with URL-Driven Modals
```typescript
// components/UserModal.tsx
function UserModal({ 
  user, 
  mode 
}: { 
  user?: User
  mode: 'create' | 'edit'
}) {
  const navigate = useNavigate()
  const search = Route.useSearch()

  const closeModal = () => {
    navigate({
      to: '/users',
      search: { ...search, modal: undefined, userId: undefined },
    })
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit User' : 'Create User'}</DialogTitle>
        </DialogHeader>
        <UserForm 
          initialData={user} 
          onSuccess={closeModal}
        />
      </DialogContent>
    </Dialog>
  )
}
```

#### Data Table Pattern
```typescript
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
```

### 6. Error Handling Patterns



#### tRPC Error Handling in Loaders
```typescript
// Error handling in route loaders
export const Route = createFileRoute('/users/$userId')({
  loader: async ({ params }) => {
    try {
      const user = await trpc.user.getById.query({ id: params.userId })
      return { user }
    } catch (error) {
      // Handle specific tRPC errors
      if (error.data?.code === 'NOT_FOUND') {
        throw new Error('User not found')
      }
      if (error.data?.code === 'UNAUTHORIZED') {
        throw new Error('You don\'t have permission to view this user')
      }
      throw new Error(`Failed to load user: ${error.message}`)
    }
  },
  errorComponent: ({ error }) => (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  ),
})

// Component-level mutations with minimal state
function UserActions({ user }: { user: User }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await trpc.user.delete.mutate({ id: user.id })
      navigate({ to: '/users' })
    } catch (error) {
      // Handle error via toast or redirect to error page
      toast.error(`Failed to delete user: ${error.message}`)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### 7. URL-First State Management Patterns

#### Complex Filter State with Zod
```typescript
// routes/dashboard/analytics.tsx
const analyticsSearchSchema = z.object({
  dateRange: z.object({
    from: z.string().transform((str) => new Date(str)),
    to: z.string().transform((str) => new Date(str)),
  }).default({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    to: new Date().toISOString(),
  }),
  metrics: z.array(z.enum(['revenue', 'users', 'sessions'])).default(['revenue']),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
  segments: z.array(z.string()).default([]),
})

export const Route = createFileRoute('/dashboard/analytics')({
  validateSearch: (search: Record<string, unknown>) => {
    // Handle complex transformations
    const parsed = {
      ...search,
      dateRange: search.dateRange ? JSON.parse(search.dateRange as string) : undefined,
      metrics: Array.isArray(search.metrics) ? search.metrics : 
               search.metrics ? [search.metrics] : undefined,
      segments: Array.isArray(search.segments) ? search.segments : 
                search.segments ? [search.segments] : undefined,
    }
    
    return analyticsSearchSchema.parse(parsed)
  },
  loader: async ({ search }) => {
    const analytics = await trpc.analytics.getData.query(search)
    return { analytics }
  },
})
```

#### Persistent UI State via URL
```typescript
// Sidebar, tabs, and view modes via URL
const uiSearchSchema = z.object({
  sidebarOpen: z.boolean().default(true),
  activeTab: z.enum(['overview', 'details', 'settings']).default('overview'),
  viewMode: z.enum(['grid', 'list', 'table']).default('grid'),
  selectedItems: z.array(z.string()).default([]),
})

function DashboardLayout() {
  const search = Route.useSearch()
  const navigate = useNavigate()

  const updateUI = (updates: Partial<typeof search>) => {
    navigate({
      search: { ...search, ...updates },
      replace: true, // Don't add to history for UI changes
    })
  }

  return (
    <div className="flex">
      <Sidebar 
        open={search.sidebarOpen}
        onToggle={() => updateUI({ sidebarOpen: !search.sidebarOpen })}
      />
      <main className="flex-1">
        <Tabs 
          value={search.activeTab} 
          onValueChange={(activeTab) => updateUI({ activeTab })}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <ViewModeToggle
              mode={search.viewMode}
              onChange={(viewMode) => updateUI({ viewMode })}
            />
            <ContentView mode={search.viewMode} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
```

#### Optimistic Navigation Instead of useState
```typescript
// Instead of managing loading state with useState, use optimistic navigation
function UserCard({ user }: { user: User }) {
  const navigate = useNavigate()
  
  const handleEdit = () => {
    // Optimistically navigate to edit page
    navigate({
      to: '/users/$userId/edit',
      params: { userId: user.id }
    })
  }

  const handleToggleStatus = async () => {
    try {
      // Optimistically update URL to show intended state
      navigate({
        to: '/users',
        search: { ...search, optimistic: `toggle-${user.id}` }
      })
      
      await trpc.user.toggleStatus.mutate({ id: user.id })
      
      // Clear optimistic state and refresh
      navigate({
        to: '/users',
        search: { ...search, optimistic: undefined }
      })
    } catch (error) {
      // Revert optimistic state on error
      navigate({
        to: '/users',
        search: { ...search, optimistic: undefined, error: error.message }
      })
    }
  }

  return (
    <Card>
      <CardContent>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <div className="flex gap-2">
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleToggleStatus}>
            {user.active ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 8. Performance Optimization
```typescript
#### Memoization with URL State
```typescript
// Memoize expensive calculations based on URL parameters
function AnalyticsDashboard() {
  const search = Route.useSearch()
  const { analytics } = Route.useLoaderData()
  
  // Memoize based on URL search parameters
  const processedData = useMemo(() => {
    return analytics.data.reduce((acc, item) => {
      // Expensive processing based on search.groupBy
      return processGroupedData(acc, item, search.groupBy)
    }, [])
  }, [analytics.data, search.groupBy])

  const chartConfig = useMemo(() => {
    return generateChartConfig(search.metrics, search.dateRange)
  }, [search.metrics, search.dateRange])

  return (
    <div>
      <Chart data={processedData} config={chartConfig} />
    </div>
  )
}
```

#### Lazy Loading
```typescript
// Route-level code splitting
const UserProfile = lazy(() => import('./UserProfile'))
const Settings = lazy(() => import('./Settings'))

// Component lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Suspense>
)
```

### 9. Testing Patterns

#### Testing Route Loaders
```typescript
import { renderWithProviders } from '@/test-utils'
import { createMemoryRouter } from '@tanstack/react-router'

// Mock tRPC client
const mockTrpc = {
  user: {
    getById: {
      query: jest.fn(),
    },
  },
}

test('loads user data correctly', async () => {
  const userData = { id: '1', name: 'John Doe' }
  mockTrpc.user.getById.query.mockResolvedValue(userData)

  const router = createMemoryRouter([
    {
      path: '/users/$userId',
      loader: () => mockTrpc.user.getById.query({ id: '1' }),
      component: () => <div>User loaded</div>,
    },
  ], {
    initialEntries: ['/users/1'],
  })

  render(<RouterProvider router={router} />)
  await waitFor(() => {
    expect(screen.getByText('User loaded')).toBeInTheDocument()
  })
})
```

## Code Organization

### File Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── forms/           # Pre-built form field components
│   └── common/          # Reusable components
├── routes/              # TanStack Router routes with loaders
├── hooks/               # Custom hooks
├── utils/
│   ├── trpc.ts          # tRPC vanilla client setup
│   └── cn.ts            # Utility functions
├── lib/
│   ├── form.tsx         # Form composition setup
│   └── router.tsx       # Router configuration
├── types/               # TypeScript type definitions
└── test-utils/          # Testing utilities
```

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (`useUserProfile.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Types: PascalCase (`UserProfile`, `ApiResponse<T>`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

### Import Organization
```typescript
// 1. React and external libraries
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Internal utilities and types
import { trpc } from '@/utils/trpc'
import type { User } from '@/types/user'

// 3. Components
import { Button } from '@/components/ui/button'
import { UserCard } from '@/components/UserCard'

// 4. Relative imports
import './UserProfile.css'
```

## Common Patterns to Follow

1. **Always use TypeScript strict mode**
2. **Use URL as primary state management with validateSearch**
3. **Leverage Zod for search parameter validation**
4. **Use TanStack Router loaders for data fetching**
5. **Leverage form composition with pre-built field components**
6. **Minimize useState - prefer URL state and optimistic updates**
7. **Use discriminated unions for complex state**
8. **Handle loading states in route loaders**
9. **Follow accessibility best practices**
10. **Implement proper form validation with Zod**

## Anti-Patterns to Avoid

1. **Don't use `any` type - use `unknown` or proper types**
2. **Don't use useState for state that can be in URL**
3. **Don't fetch data in components - use route loaders**
4. **Don't create inline field components - use pre-built ones**
5. **Don't mutate props or state directly**
6. **Don't forget to validate search parameters with Zod**
7. **Don't use index as key in lists**
8. **Don't perform side effects in render**
9. **Don't ignore TypeScript errors**
10. **Don't use inline styles - use Tailwind classes**