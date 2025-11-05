# TanStack Form Fields Implementation Plan

## Core Philosophy
- **UI-focused only**: No base utilities, no custom validation logic
- **Minimal duplication accepted**: Embrace repetition for clarity
- **Validation delegated to Zod**: Use Zod scalars (`.string()`, `.email()`, `.date()`) at the form level
- **Direct context usage**: Each field directly uses `useFieldContext()` without wrapper utilities

---

## File Structure

```
@src/components/ui/forms/fields/
├── text.tsx                    # ✅ Exists - template for others
├── textarea.tsx
├── email.tsx
├── number.tsx
├── url.tsx
├── select.tsx                  # Accepts: z.enum() OR {label, value}[]
├── bool.tsx                    # Checkbox/Switch toggle
├── radio-group.tsx             # Radio button group
├── checkbox-group.tsx          # Checkbox array with pushValue/removeValue
├── datetime.tsx                # Date/time picker
├── relation.tsx                # Entity/relation selector
├── json.tsx                    # JSON editor
├── rich-editor.tsx             # Rich text editor
├── file.tsx                    # File upload
├── geo-point.tsx               # Geographic coordinates
└── index.tsx                   # Barrel export
```

---

## Unified Field Component Pattern

Every field follows this exact template (like your `text.tsx`):

```typescript
// 1. Import hooks & components
import { useFieldContext } from "..";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { InputComponent } from "../../input-component"; // or Select, Textarea, etc.

// 2. Define props type
type FieldProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  // Input-specific props here
} & React.ComponentProps<"input">; // or appropriate HTML element

// 3. Component implementation
const MyField = (props: FieldProps) => {
  const field = useFieldContext<ValueType>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
      <InputComponent
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...props}
      />
      <FieldDescription>{props.description}</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default MyField;
```

---

## Field-Specific Implementations

### Phase 1: Text Inputs (5 components)

#### 1. **textarea.tsx** - Multi-line text
- Component: `<Textarea />`
- Value: `field.state.value` (string)
- Handler: `onChange={(e) => field.handleChange(e.target.value)}`

#### 2. **email.tsx** - Email validation
- Component: `<Input type="email" />`
- Zod: `.email("Invalid email")`
- Same pattern as text

#### 3. **number.tsx** - Numeric input
- Component: `<Input type="number" />`
- Zod: `.number()` or `.coerce.number()`
- Handler: `onChange={(e) => field.handleChange(Number(e.target.value))}`

#### 4. **url.tsx** - URL validation
- Component: `<Input type="url" />`
- Zod: `.url("Invalid URL")`
- Same pattern as text

#### 5. **datetime.tsx** - Date/time picker
- Component: shadcn date picker (lazy load)
- Zod: `.date()` or `.string().datetime()`
- Value: Date object or ISO string

---

### Phase 2: Selection Components (4 components)

#### 1. **select.tsx** - Dropdown/Combobox
- Accept two option formats:
  ```typescript
  type SelectFieldProps = {
    options: ZodEnum | Array<{ label: string; value: string }>;
    // ... rest
  }
  ```
- Extract values from `z.enum()`: `enumSchema._def.values`
- Component: shadcn `<Select />`
- Handler: `onValueChange={field.handleChange}`

#### 2. **bool.tsx** - Single checkbox or switch toggle
- Component: `<Checkbox />` or `<Switch />`
- Variant prop: `variant="checkbox" | "switch"`
- Value: `field.state.value` (boolean)
- Handler: `onCheckedChange={(checked) => field.handleChange(checked === true)}`

#### 3. **radio-group.tsx** - Mutually exclusive options
- Component: shadcn `<RadioGroup />`
- Options: `z.enum()` or `{label, value}[]`
- Value: `field.state.value` (string)
- Handler: `onValueChange={field.handleChange}`

#### 4. **checkbox-group.tsx** - Multiple selections (array mode)
- Use `form.Field` with `mode="array"`
- Component: Multiple `<Checkbox />` elements
- Methods: `field.pushValue()` / `field.removeValue()`
- Check: `field.state.value.includes(optionId)`

---

### Phase 3: Complex Components (5 components)

#### 1. **relation.tsx** - Entity selector
- Options loader: async function to fetch entities
- Component: Combobox or searchable select
- Value: Entity ID or full object
- Handle loading/error states

#### 2. **file.tsx** - File upload
- Component: Custom file input or dropzone
- Value: `File[]` or single `File`
- Handler: `onChange={(files) => field.handleChange(files)}`

#### 3. **json.tsx** - JSON editor
- Component: Textarea with JSON syntax highlighting (lazy load Monaco or CodeMirror)
- Value: Object (convert to/from JSON string)
- Handler: Parse JSON on change, stringify on display

#### 4. **rich-editor.tsx** - Rich text editor
- Component: Tiptap or similar (lazy load)
- Value: HTML string or JSON
- Handler: `onChange={(html) => field.handleChange(html)}`

#### 5. **geo-point.tsx** - Coordinates picker
- Component: Map with marker or lat/lng inputs
- Value: `{ lat: number; lng: number }`
- Handlers: Separate inputs for lat/lng

---

## Zod Integration Pattern

```typescript
// Form schema example
const mySchema = z.object({
  email: z.string().email("Invalid email"),
  age: z.number().min(0),
  country: z.enum(["US", "UK", "CA"]),
  tags: z.array(z.string()).min(1),
  active: z.boolean(),
  startDate: z.date(),
});

// In form fields
<form.Field name="email" children={(field) => <EmailField {...} />} />
<form.Field name="country" children={(field) => <SelectField options={z.enum(["US", "UK", "CA"])} />} />
<form.Field name="tags" mode="array" children={(field) => <CheckboxGroupField {...} />} />
```

---

## Key Implementation Details

### Select Field with Zod Enum Support
```typescript
type SelectFieldProps = {
  options: z.ZodEnum<[string, ...string[]]> | Array<{ label: string; value: string }>;
  label?: string;
  description?: string;
} & React.ComponentProps<"select">;

// Extract enum values
function getSelectOptions(options) {
  if (options instanceof z.ZodEnum) {
    return options._def.values.map(v => ({ label: v, value: v }));
  }
  return options;
}
```

### Checkbox Group with Array Mode
```typescript
// Form setup
const form = useForm({
  defaultValues: { tags: [] },
  validators: { onSubmit: z.object({ tags: z.array(z.string()) }) }
});

// Field usage
<form.Field name="tags" mode="array" children={(field) => (
  <CheckboxGroupField options={["tag1", "tag2"]} />
)} />

// Inside component
{options.map(opt => (
  <Checkbox
    checked={field.state.value.includes(opt)}
    onCheckedChange={(checked) => {
      if (checked) field.pushValue(opt);
      else field.removeValue(field.state.value.indexOf(opt));
    }}
  />
))}
```

---

## Implementation Order

### Priority 1 (essentials):
- text, textarea, email, number, url → All follow text.tsx pattern exactly

### Priority 2 (selections):
- select, bool, radio-group, checkbox-group → Require no custom logic

### Priority 3 (advanced):
- datetime, relation, json, rich-editor, file, geo-point → Can be added incrementally

---

## Benefits of This Simplified Approach

✅ **Zero utility complexity** - Each field is self-contained  
✅ **Easy to understand** - Just UI implementation, validation is Zod's job  
✅ **Trivial to extend** - Copy `text.tsx`, swap the component, done  
✅ **No over-engineering** - Embrace the repetition for clarity  
✅ **Zod-native** - Use `.enum()`, `.email()`, `.date()` directly  
✅ **TanStack-aligned** - Follows form composition without abstractions  
✅ **Type-safe** - Each field has its own props type definition  

---

## Next Steps

1. Implement Phase 1 (text inputs): textarea, email, number, url, datetime
2. Implement Phase 2 (selections): select, bool, radio-group, checkbox-group
3. Implement Phase 3 (complex): relation, file, json, rich-editor, geo-point
4. Update index.tsx with barrel exports
