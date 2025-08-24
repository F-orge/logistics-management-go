# TanStack Router & React Best Practices

## Route File Structure & Naming

### File-based Routing Conventions
- Use file-based routing following TanStack Router conventions
- Route files should be placed in `src/routes/` directory
- Use kebab-case for route file names (e.g., `user-profile.tsx`)
- Special files:
  - `__root.tsx` - Root route component
  - `index.tsx` - Index route for a directory
  - `-not-found.tsx` - Not found component (prefix with `-`)
  - `_layout.tsx` - Layout route (prefix with `_`)

### Route Definition Patterns
```tsx
// ✅ Correct: Use createFileRoute for file-based routes
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users')({
  component: UsersComponent,
  loader: async ({ params }) => {
    // Loader logic here
  },
  validateSearch: (search) => {
    // Search params validation
  },
})

// ✅ Component definition after route
function UsersComponent() {
  const data = Route.useLoaderData()
  const { search } = Route.useSearch()
  const navigate = Route.useNavigate()
  
  return <div>Users</div>
}
```

## Component Architecture

### Component Organization
- Keep route components in the same file as the route definition
- Extract complex components to separate files in `src/components/`
- Use PascalCase for component names
- Prefer function declarations over arrow functions for components

```tsx
// ✅ Correct component structure
function UserDashboard() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  
  return (
    <div className="container mx-auto p-4">
      <UserHeader user={data.user} />
      <UserContent data={data} />
    </div>
  )
}

// ❌ Avoid: Arrow function components in routes
const UserDashboard = () => {
  // component logic
}
```

### State Management
- Use TanStack Router's built-in state management for route-related state
- Prefer search params for shareable/bookmarkable state
- Use React's useState/useReducer for local component state
- Leverage loaders for server state that doesn't change frequently

```tsx
// ✅ Correct: Use search params for filters
export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || '',
    page: Number(search.page) || 1,
    limit: Number(search.limit) || 10,
  }),
  component: ProductsComponent,
})

function ProductsComponent() {
  const { category, page, limit } = Route.useSearch()
  const navigate = Route.useNavigate()
  
  const updateFilters = (newFilters: Partial<typeof search>) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilters }),
    })
  }
}
```

## Data Loading & Management

### Loader Best Practices
- Use loaders for data that's needed before component renders
- Keep loaders pure and side-effect free
- Handle loading states with pending states
- Use TypeScript for type safety

```tsx
// ✅ Correct loader implementation
export const Route = createFileRoute('/users/$userId')({
  loader: async ({ params: { userId } }) => {
    const [user, posts] = await Promise.all([
      pb.collection('users').getOne(userId),
      pb.collection('posts').getList(1, 10, {
        filter: `user="${userId}"`,
      }),
    ])
    
    return { user, posts }
  },
  component: UserDetailComponent,
  pendingComponent: UserDetailPending,
  errorComponent: UserDetailError,
})
```

### Error Handling
- Implement error boundaries at appropriate levels
- Use route-level error components for route-specific errors
- Provide meaningful error messages and recovery options

```tsx
// ✅ Error component example
function UserDetailError({ error }: { error: Error }) {
  const navigate = Route.useNavigate()
  
  return (
    <div className="error-container">
      <h2>Failed to load user</h2>
      <p>{error.message}</p>
      <button onClick={() => navigate({ to: '/users' })}>
        Back to Users
      </button>
    </div>
  )
}
```

## TypeScript Best Practices

### Type Definitions
- Define interfaces for all data structures
- Use generic types for reusable components
- Leverage TanStack Router's type inference

```tsx
// ✅ Define interfaces for data structures
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
}

interface SearchParams {
  query?: string
  category?: string
  page?: number
}

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    query: (search.query as string) || '',
    category: (search.category as string) || '',
    page: Number(search.page) || 1,
  }),
})
```

## Performance Optimization

### Code Splitting
- Use route-based code splitting (enabled by default with autoCodeSplitting)
- Lazy load heavy components with React.lazy
- Implement proper loading states

```tsx
// ✅ Lazy load heavy components
const HeavyDataTable = React.lazy(() => import('@/components/HeavyDataTable'))

function ReportsComponent() {
  return (
    <div>
      <h1>Reports</h1>
      <React.Suspense fallback={<TableSkeleton />}>
        <HeavyDataTable />
      </React.Suspense>
    </div>
  )
}
```

### Memoization
- Use React.memo for expensive components
- Use useMemo/useCallback for expensive computations
- Be selective about memoization (don't over-optimize)

```tsx
// ✅ Memoize expensive components
const UserCard = React.memo(function UserCard({ user }: { user: User }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
    </div>
  )
})
```

## Styling & UI Guidelines

### Tailwind CSS Usage
- Use Tailwind utility classes for styling
- Create reusable component classes for common patterns
- Use CSS variables for theme values

```tsx
// ✅ Good Tailwind usage
function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}>
      {children}
    </div>
  )
}
```

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers

```tsx
// ✅ Accessible button
function DeleteButton({ onDelete, itemName }: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      className="btn-danger"
      aria-label={`Delete ${itemName}`}
    >
      <TrashIcon aria-hidden="true" />
      Delete
    </button>
  )
}
```

## Navigation Patterns

### Programmatic Navigation
- Use Route.useNavigate() for navigation within route components
- Use typed navigation with proper parameters
- Handle navigation errors gracefully

```tsx
// ✅ Correct navigation usage
function UserActions({ userId }: { userId: string }) {
  const navigate = Route.useNavigate()
  
  const editUser = () => {
    navigate({
      to: '/users/$userId/edit',
      params: { userId },
    })
  }
  
  const deleteUser = async () => {
    try {
      await pb.collection('users').delete(userId)
      navigate({ to: '/users' })
    } catch (error) {
      // Handle error
    }
  }
}
```

### Accessing Route Data Outside Route Components
- Use `getRouteApi()` to access route information from components outside the current route
- This is particularly useful for dialogs, modals, sidebars, and other components that need route data
- Avoids singleton patterns and maintains type safety

```tsx
// ✅ Using getRouteApi for accessing route data in dialogs/components
import { getRouteApi } from '@tanstack/react-router'

// Get route API for a specific route
const userRouteApi = getRouteApi('/users/$userId')

function UserEditDialog({ isOpen, onClose }: UserEditDialogProps) {
  // Access route data from any component
  const { userId } = userRouteApi.useParams()
  const userData = userRouteApi.useLoaderData()
  const navigate = userRouteApi.useNavigate()
  
  const handleSave = async (formData: UserFormData) => {
    try {
      await pb.collection('users').update(userId, formData)
      onClose()
      // Optionally navigate or refresh
      navigate({ to: '/users/$userId', params: { userId } })
    } catch (error) {
      // Handle error
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {userData.name}</DialogTitle>
        </DialogHeader>
        <UserForm 
          defaultValues={userData} 
          onSubmit={handleSave}
        />
      </DialogContent>
    </Dialog>
  )
}

// ✅ Using getRouteApi in sidebar components
const dashboardRouteApi = getRouteApi('/dashboard')

function Sidebar() {
  const search = dashboardRouteApi.useSearch()
  const navigate = dashboardRouteApi.useNavigate()
  
  const updateFilter = (filter: string) => {
    navigate({
      search: (prev) => ({ ...prev, filter }),
    })
  }
  
  return (
    <aside className="sidebar">
      <FilterButtons 
        activeFilter={search.filter} 
        onFilterChange={updateFilter} 
      />
    </aside>
  )
}

// ✅ Using getRouteApi in header components
const rootRouteApi = getRouteApi('/')

function AppHeader() {
  const router = rootRouteApi.useRouter()
  const currentLocation = router.state.location
  
  return (
    <header className="app-header">
      <nav>
        <Breadcrumbs currentPath={currentLocation.pathname} />
      </nav>
    </header>
  )
}

// ✅ Using multiple route APIs in complex components
function ProductComparisonModal({ productIds }: ProductComparisonModalProps) {
  const productsRouteApi = getRouteApi('/products')
  const searchRouteApi = getRouteApi('/search')
  
  const productsData = productsRouteApi.useLoaderData()
  const searchParams = searchRouteApi.useSearch()
  const navigate = productsRouteApi.useNavigate()
  
  const selectedProducts = productIds.map(id => 
    productsData.products.find(p => p.id === id)
  ).filter(Boolean)
  
  const addToComparison = (productId: string) => {
    const newComparison = [...(searchParams.compare || []), productId]
    navigate({
      to: '/search',
      search: (prev) => ({ ...prev, compare: newComparison }),
    })
  }
  
  return (
    <Modal>
      <ComparisonTable products={selectedProducts} />
      <AddMoreButton onClick={addToComparison} />
    </Modal>
  )
}
```

### When to Use getRouteApi
- **✅ Use when**: Component needs route data but isn't a direct route component
- **✅ Use when**: Building reusable components that work across multiple routes
- **✅ Use when**: Creating dialogs, modals, or overlays that need current route context
- **✅ Use when**: Building navigation components (breadcrumbs, sidebars)
- **✅ Use when**: Implementing global components that react to route changes

### getRouteApi Best Practices
- Import `getRouteApi` at the module level, not inside components
- Create route API instances outside of component functions for better performance
- Use specific route paths rather than generic ones when possible
- Handle cases where route data might not be available (component used on different routes)

```tsx
// ✅ Good: Create route API at module level
const userDetailRouteApi = getRouteApi('/users/$userId')

function UserActionMenu() {
  const { userId } = userDetailRouteApi.useParams()
  // Component logic
}

// ❌ Avoid: Creating route API inside component
function UserActionMenu() {
  const routeApi = getRouteApi('/users/$userId') // Creates new instance on every render
  const { userId } = routeApi.useParams()
}
```

### Link Components
- Use TanStack Router's Link component for internal navigation
- Use proper typing for link parameters

```tsx
// ✅ Typed link usage
import { Link } from '@tanstack/react-router'

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link
            to="/users/$userId"
            params={{ userId: user.id }}
            className="user-link"
          >
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

## PocketBase Integration

### Data Fetching
- Use PocketBase client in loaders and actions
- Implement proper error handling for API calls
- Use TypeScript interfaces that match PocketBase collections

```tsx
// ✅ PocketBase integration in loader
export const Route = createFileRoute('/organizations')({
  loader: async () => {
    try {
      const organizations = await pb.collection('org_organization').getList(1, 50, {
        sort: '-created',
        expand: 'teams,members',
      })
      
      return { organizations }
    } catch (error) {
      throw new Error('Failed to load organizations')
    }
  },
})
```

## Common Anti-patterns to Avoid

### ❌ Don't do these:
1. **Mixing route definition with business logic**
2. **Using useEffect for data fetching in route components** (use loaders instead)
3. **Defining components inside other components**
4. **Ignoring TypeScript errors**
5. **Not handling loading and error states**
6. **Using any type without justification**
7. **Directly mutating props or state**
8. **Creating new objects/functions in render**

### ✅ Do these instead:
1. **Separate concerns: routes, components, business logic**
2. **Use loaders for initial data loading**
3. **Define components at module level**
4. **Fix TypeScript errors properly**
5. **Implement proper loading/error UX**
6. **Use proper TypeScript types**
7. **Use immutable updates**
8. **Memoize expensive operations**

## Testing Considerations

- Write tests for route components
- Mock PocketBase client for unit tests
- Test navigation flows
- Test error scenarios
- Use React Testing Library best practices

## Code Review Checklist

- [ ] Route follows file-based routing conventions
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Accessibility considerations are met
- [ ] Performance optimizations are appropriate
- [ ] Code follows established patterns
- [ ] Tests are written for new functionality