# lib/utils

## Type Aliases

### GlobalAction

```ts
type GlobalAction<TNavigation> = {
  label: string;
  onSelect?: (navigate: UseNavigateResult<TNavigation>) => Promise<void> | void;
  icon?:   | React.ReactNode
     | (searchQuery?: {
     page: number;
     perPage: number;
     filter?: string;
     sort?: string;
     action?: string;
     id?: string;
   }) => React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "destructive";
  divider?: boolean;
  submenu?: GlobalAction<TNavigation>[];
};
```

#### Type Parameters

##### TNavigation

`TNavigation` *extends* `string`

#### Properties

##### label

```ts
label: string;
```

##### onSelect()?

```ts
optional onSelect: (navigate: UseNavigateResult<TNavigation>) => Promise<void> | void;
```

###### Parameters

###### navigate

`UseNavigateResult`\<`TNavigation`\>

###### Returns

`Promise`\<`void`\> \| `void`

##### icon?

```ts
optional icon: 
  | React.ReactNode
  | (searchQuery?: {
  page: number;
  perPage: number;
  filter?: string;
  sort?: string;
  action?: string;
  id?: string;
}) => React.ReactNode;
```

##### disabled?

```ts
optional disabled: boolean;
```

##### variant?

```ts
optional variant: "default" | "destructive";
```

##### divider?

```ts
optional divider: boolean;
```

##### submenu?

```ts
optional submenu: GlobalAction<TNavigation>[];
```

## Functions

### cn()

```ts
function cn(...inputs: ClassValue[]): string;
```

#### Parameters

##### inputs

...`ClassValue`[]

#### Returns

`string`
