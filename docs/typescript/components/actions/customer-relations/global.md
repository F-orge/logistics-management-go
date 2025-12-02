# components/actions/customer-relations/global

## Variables

### default

```ts
default: (
  | {
  label: string;
  submenu: {
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
  icon?: undefined;
}
  | {
  label: string;
  icon: Element;
  submenu: {
     label: string;
     onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
  }[];
})[];
```
