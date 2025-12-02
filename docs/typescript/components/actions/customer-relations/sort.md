# components/actions/customer-relations/sort

## Variables

### default

```ts
default: {
  label: string;
  onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
  icon: (searchQuery: 
     | {
     page: number;
     perPage: number;
     filter?: string;
     sort?: string;
     action?: string;
     id?: string;
   }
    | undefined) => false | Element;
}[];
```

#### Type Declaration

##### label

```ts
label: string = "Oldest to Newest";
```

##### onSelect()

```ts
onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
```

###### Parameters

###### navigate

`UseNavigateResult`\<`"/dashboard/$schema/$collection"`\>

###### Returns

`void`

##### icon()

```ts
icon: (searchQuery: 
  | {
  page: number;
  perPage: number;
  filter?: string;
  sort?: string;
  action?: string;
  id?: string;
}
  | undefined) => false | Element;
```

###### Parameters

###### searchQuery

\{
`page`: `number`;
`perPage`: `number`;
`filter?`: `string`;
`sort?`: `string`;
`action?`: `string`;
`id?`: `string`;
\} | `undefined`

###### Returns

`false` \| `Element`
