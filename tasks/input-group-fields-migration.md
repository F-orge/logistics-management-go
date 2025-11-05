# InputGroup Fields Migration Plan

## Overview

Migrate all Phase 1 and Phase 2 field components to use shadcn's `InputGroup` component for better extensibility, visual polish, and consistent addon patterns. This plan is based on the official shadcn InputGroup documentation: https://ui.shadcn.com/docs/components/input-group.md

## Current State

### Phase 1 Fields (Text Inputs)
- `TextField` - Basic text input
- `TextareaField` - Multi-line textarea
- `EmailField` - Email input with validation
- `NumberField` - Numeric input with type coercion
- `URLField` - URL input with validation
- `DateTimeField` - Date/time picker (custom layout)

### Phase 2 Fields (Selection)
- `SelectField` - Dropdown select
- `BoolField` - Toggle/checkbox variant
- `RadioGroupField` - Radio button group
- `CheckboxGroupField` - Multiple checkboxes

### Phase 3 Fields (Placeholders)
- `RelationField`, `FileField`, `JSONField`, `RichEditorField`, `GeoPointField`

## InputGroup Component Analysis

The `InputGroup` component from shadcn provides:
- **Composition-based architecture** with clear separation of concerns
- **Flexible addon positioning**: 
  - For `InputGroupInput`: `inline-start` (left) or `inline-end` (right)
  - For `InputGroupTextarea`: `block-start` (top) or `block-end` (bottom)
- **Built-in focus management**: Clicking addons focuses the input; addons must be placed AFTER input for proper keyboard navigation
- **Error state styling**: Via `aria-invalid` on control elements
- **Support for complex content**: Icons, buttons, text, tooltips, spinners via composition
- **Three main addon components**:
  - `InputGroupText` - Display text content (prefixes, suffixes, counts)
  - `InputGroupButton` - Interactive button elements only
  - Icons/custom content - Can be placed directly in addons

## Key Guidelines from shadcn Documentation

### Critical Rules

1. **Addon Placement**: `InputGroupAddon` components MUST be placed AFTER the input for proper focus navigation
2. **Alignment Rules**:
   - For `InputGroupInput`: use `inline-start` or `inline-end`
   - For `InputGroupTextarea`: use `block-start` or `block-end`
3. **Multiple Addons**: A single `InputGroupAddon` can contain multiple buttons, icons, and text elements
4. **Custom Inputs**: Use `data-slot="input-group-control"` on custom inputs for automatic focus state handling
5. **Composition Over Wrapper**: Don't wrap everything; compose directly with InputGroupText, InputGroupButton, and raw icons

### Common Patterns from Documentation

**Currency Field:**
```tsx
<InputGroup>
  <InputGroupAddon>
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

**Domain Prefix:**
```tsx
<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>.com</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

**Email Suffix:**
```tsx
<InputGroup>
  <InputGroupInput placeholder="Enter your username" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>@company.com</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

**Copy Button:**
```tsx
<InputGroup>
  <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" onClick={() => copyToClipboard(...)}>
      {isCopied ? <IconCheck /> : <IconCopy />}
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

**Textarea with Actions:**
```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Ask, Search or Chat..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>+</InputGroupButton>
    <InputGroupButton variant="ghost">Auto</InputGroupButton>
    <InputGroupText>52% used</InputGroupText>
    <InputGroupButton variant="default">Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

**Character Count:**
```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Enter your message" />
  <InputGroupAddon align="block-end">
    <InputGroupText className="text-xs">120 characters left</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

**Icon Addon:**
```tsx
<InputGroup>
  <InputGroupInput type="email" placeholder="Enter your email" />
  <InputGroupAddon align="inline-end">
    <MailIcon />  {/* Icon placed directly */}
  </InputGroupAddon>
</InputGroup>
```

## Revised Props Interface

All Phase 1 field components should support:

```typescript
export type ExtensibleFieldProps = {
  // Field wrapper props
  label?: React.ReactNode;
  description?: React.ReactNode;

  // Text addons (prefix/suffix) - for InputGroupText
  textAddonStart?: string;      // "$", "https://", etc.
  textAddonEnd?: string;        // "USD", ".com", "@company.com", etc.

  // Icon addons (for validation or info) - placed directly in addon
  iconAddonStart?: React.ReactNode;
  iconAddonEnd?: React.ReactNode;

  // Button addons (for actions) - wrapped in InputGroupButton
  buttonAddonEnd?: React.ReactNode;

  // Special features
  maxLength?: number;           // For textarea character count
  showCharCount?: boolean;      // For textarea
  
  // Custom styling
  inputGroupClassName?: string;
  
  // Composition fallback - allow completely custom addon content
  // Use when textAddon/iconAddon/buttonAddon are too limited
  addonStart?: React.ReactNode;
  addonEnd?: React.ReactNode;
};
```

## Implementation Phases

### Phase 1A: Create Utilities (Foundation)

Create `/src/components/ui/forms/utils/input-group-patterns.tsx` with reusable patterns:

```typescript
// Common addon patterns for reuse
export const CharCountAddon: React.FC<{current: number; max?: number}> = ...
export const ValidationIconAddon: React.FC<{isValid?: boolean; isError?: boolean}> = ...
export const CopyButtonAddon: React.FC<{value: string; onCopy?: () => void}> = ...
export const ClearButtonAddon: React.FC<{onClick: () => void}> = ...
export const PasswordToggleAddon: React.FC<{visible: boolean; toggle: () => void}> = ...
```

### Phase 1B: Migrate Phase 1 Text Input Fields (Priority 1)

**Order:** text → email → url → number → textarea → datetime

#### 1. TextField Migration
- Add support for `textAddonStart`, `textAddonEnd`, `iconAddonEnd`, `buttonAddonEnd`
- Support for password toggle via `showPasswordToggle`
- Support for clear button via `showClearButton`
- Keep backward compatibility (all addon props optional)

**Example Usage:**
```tsx
// Basic (unchanged behavior)
<TextField label="Name" />

// With icon addon
<TextField label="Email" iconAddonEnd={<MailIcon />} />

// With clear button
<TextField label="Username" showClearButton />

// With text addon
<TextField label="Website" textAddonStart="https://" textAddonEnd=".com" />

// With password toggle
<TextField type="password" label="Password" showPasswordToggle />
```

#### 2. EmailField Migration
- Use InputGroup with `InputGroupText` for "@company.com" pattern (optional)
- Add validation icon addon support
- Keep email type and validation

#### 3. URLField Migration
- Use `textAddonStart="https://"` pattern
- Add validation icon addon
- Keep URL type and validation

#### 4. NumberField Migration
- Support spinner buttons via `buttonAddonEnd` (plus/minus buttons)
- Optional: use `textAddonEnd` for unit display (e.g., "USD", "kg")

#### 5. TextareaField Migration
- Add character count support via `showCharCount`
- Support for action buttons via `buttonAddonEnd`
- Use `block-end` alignment for addons (top/bottom)

#### 6. DateTimeField Migration
- Restructure layout using InputGroup for better composition
- Date picker button + optional time input in addons
- Keep existing Calendar + Popover logic

### Phase 1C: Testing & Validation

For each migrated field:
1. ✅ Default behavior (no addons) matches pre-migration
2. ✅ Each addon pattern works independently
3. ✅ Multiple addons compose correctly
4. ✅ Error states display correctly with `aria-invalid`
5. ✅ Focus management works (keyboard navigation)
6. ✅ Mobile responsiveness maintained
7. ✅ Accessibility (labels, ARIA attributes)

### Phase 2: Post-Phase 1 Decisions

**For Phase 2 fields (Select, Radio, Checkbox):**
- These are composition-based already
- Keep current structure as InputGroup doesn't provide value
- May revisit later for specific patterns (searchable select with clear button)

## Implementation Details

### Rule: Addon Placement

**WRONG:**
```tsx
<InputGroup>
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupInput />
</InputGroup>
```

**CORRECT:**
```tsx
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon align="inline-end">
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### Composition Pattern

**For Text Content:**
```tsx
<InputGroupAddon>
  <InputGroupText>$</InputGroupText>
</InputGroupAddon>
```

**For Buttons:**
```tsx
<InputGroupAddon align="inline-end">
  <InputGroupButton size="icon-xs">
    <CopyIcon />
  </InputGroupButton>
</InputGroupAddon>
```

**For Icons (direct):**
```tsx
<InputGroupAddon align="inline-end">
  <CheckIcon />  {/* No wrapping needed */}
</InputGroupAddon>
```

**For Multiple Elements:**
```tsx
<InputGroupAddon align="block-end">
  <InputGroupText>120 chars left</InputGroupText>
  <InputGroupButton variant="default">Send</InputGroupButton>
</InputGroupAddon>
```

## File Structure

```
src/components/ui/forms/
├── fields/
│   ├── text.tsx          ← Migrate with InputGroup
│   ├── textarea.tsx      ← Migrate with InputGroup
│   ├── email.tsx         ← Migrate with InputGroup
│   ├── number.tsx        ← Migrate with InputGroup
│   ├── url.tsx           ← Migrate with InputGroup
│   ├── datetime.tsx      ← Migrate with InputGroup
│   ├── select.tsx        ← Keep as-is (Phase 2 decision)
│   ├── bool.tsx          ← Keep as-is (Phase 2 decision)
│   ├── radio-group.tsx   ← Keep as-is (Phase 2 decision)
│   ├── checkbox-group.tsx← Keep as-is (Phase 2 decision)
│   ├── relation.tsx      ← Placeholder (Phase 3)
│   ├── file.tsx          ← Placeholder (Phase 3)
│   ├── json.tsx          ← Placeholder (Phase 3)
│   ├── rich-editor.tsx   ← Placeholder (Phase 3)
│   ├── geo-point.tsx     ← Placeholder (Phase 3)
│   └── index.tsx         ← Exports (no changes needed)
├── utils/
│   ├── input-group-patterns.tsx  ← NEW: Reusable addon patterns
│   └── addon-patterns.tsx        ← (rename from old plan if exists)
└── [existing field components]
```

## Benefits of This Approach

1. **Visual Polish**: Icons, validation indicators, character counts, spinners
2. **Consistency**: All field components use same composition-based pattern
3. **Extensibility**: Support custom addon content without core changes
4. **Reusability**: Addon patterns can be used across different field types
5. **Maintainability**: Single source of truth for InputGroup styling
6. **Backward Compatibility**: All addon props are optional
7. **Accessibility**: Built-in focus management and error state handling
8. **Type Safety**: Full TypeScript support with proper prop inference
9. **Follows Best Practices**: Aligns with official shadcn patterns

## Success Criteria

- ✅ All Phase 1 fields migrated to use InputGroup
- ✅ All addon patterns work correctly
- ✅ No breaking changes (all migrations are backward compatible)
- ✅ 100% test coverage for new addon functionality
- ✅ Error states display correctly
- ✅ Focus management works with keyboard navigation
- ✅ Mobile responsive (addons scale appropriately)
- ✅ Documentation updated with examples
- ✅ Type safety maintained throughout

## References

- shadcn InputGroup Docs: https://ui.shadcn.com/docs/components/input-group.md
- Current InputGroup Implementation: `src/components/ui/input-group.tsx`
- Current Field Components: `src/components/ui/forms/fields/`
