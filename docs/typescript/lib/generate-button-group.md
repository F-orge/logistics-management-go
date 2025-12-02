# lib/generate-button-group

## Interfaces

### ButtonGroupGeneratorConfig

Programmatic Button Group Generator

This utility generates button group code similar to the companies.tsx pattern.
Use this to add button group functionality to any control without modifying existing code.

#### Properties

##### primaryButtonLabel

```ts
primaryButtonLabel: string;
```

Primary button label

##### includeDropdown

```ts
includeDropdown: boolean;
```

Whether to include dropdown menu for global actions

##### navigationRoute

```ts
navigationRoute: string;
```

Navigation route context (e.g., "/dashboard/$schema/$collection")

##### globalActionsType?

```ts
optional globalActionsType: string;
```

Global actions array type hint

## Functions

### generateButtonGroupImports()

```ts
function generateButtonGroupImports(): string;
```

Generate imports needed for button group functionality

#### Returns

`string`

***

### generateButtonGroupJSX()

```ts
function generateButtonGroupJSX(config: ButtonGroupGeneratorConfig): string;
```

Generate the button group JSX code

#### Parameters

##### config

[`ButtonGroupGeneratorConfig`](#buttongroupgeneratorconfig)

#### Returns

`string`

***

### generateRenderMenuItemsFunction()

```ts
function generateRenderMenuItemsFunction(navigationRoute: string): string;
```

Generate the renderMenuItems helper function

#### Parameters

##### navigationRoute

`string`

#### Returns

`string`

***

### generateGlobalActionHandler()

```ts
function generateGlobalActionHandler(navigationRoute: string): string;
```

Generate the global action handler function

#### Parameters

##### navigationRoute

`string`

#### Returns

`string`

***

### generateButtonGroupIntegration()

```ts
function generateButtonGroupIntegration(config: ButtonGroupGeneratorConfig): {
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
};
```

Generate complete button group integration code
Returns an object with individual pieces that can be integrated

#### Parameters

##### config

[`ButtonGroupGeneratorConfig`](#buttongroupgeneratorconfig)

#### Returns

```ts
{
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
}
```

##### imports

```ts
imports: string;
```

##### renderMenuItems

```ts
renderMenuItems: string;
```

##### handleGlobalAction

```ts
handleGlobalAction: string;
```

##### buttonGroupJSX

```ts
buttonGroupJSX: string;
```

***

### getButtonGroupCode()

```ts
function getButtonGroupCode(config: ButtonGroupGeneratorConfig): {
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
};
```

Full code generator - returns ready-to-use code snippets
Usage:
const code = getButtonGroupCode({
  primaryButtonLabel: "Create",
  includeDropdown: true,
  navigationRoute: "/dashboard/$schema/$collection"
});

console.log(code.imports);
console.log(code.buttonGroupJSX);

#### Parameters

##### config

[`ButtonGroupGeneratorConfig`](#buttongroupgeneratorconfig)

#### Returns

```ts
{
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
}
```

##### imports

```ts
imports: string;
```

##### renderMenuItems

```ts
renderMenuItems: string;
```

##### handleGlobalAction

```ts
handleGlobalAction: string;
```

##### buttonGroupJSX

```ts
buttonGroupJSX: string;
```
