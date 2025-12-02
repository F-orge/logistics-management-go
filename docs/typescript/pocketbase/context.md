# pocketbase/context

## Interfaces

### PocketBaseContextType

#### Properties

##### pb

```ts
pb: TypedPocketBase;
```

##### isReady

```ts
isReady: boolean;
```

##### isAuthenticated

```ts
isAuthenticated: boolean;
```

##### user

```ts
user: AuthRecord;
```

##### authToken

```ts
authToken: string | null;
```

##### logout()

```ts
logout: () => void;
```

###### Returns

`void`

## Functions

### PocketBaseProvider()

```ts
function PocketBaseProvider(__namedParameters: {
  children: ReactNode;
}): Element;
```

#### Parameters

##### \_\_namedParameters

###### children

`ReactNode`

#### Returns

`Element`

***

### usePocketBase()

```ts
function usePocketBase(): PocketBaseContextType;
```

#### Returns

[`PocketBaseContextType`](#pocketbasecontexttype)

***

### useAuth()

```ts
function useAuth(): {
  isAuthenticated: boolean;
  user: AuthRecord;
  authToken: string | null;
  logout: () => void;
};
```

#### Returns

```ts
{
  isAuthenticated: boolean;
  user: AuthRecord;
  authToken: string | null;
  logout: () => void;
}
```

##### isAuthenticated

```ts
isAuthenticated: boolean;
```

##### user

```ts
user: AuthRecord;
```

##### authToken

```ts
authToken: string | null;
```

##### logout()

```ts
logout: () => void;
```

###### Returns

`void`

***

### usePocketBaseClient()

```ts
function usePocketBaseClient(): TypedPocketBase;
```

#### Returns

[`TypedPocketBase`](../lib/pb.types.md#typedpocketbase)
