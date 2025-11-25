/**
 * Programmatic Button Group Generator
 *
 * This utility generates button group code similar to the companies.tsx pattern.
 * Use this to add button group functionality to any control without modifying existing code.
 */

export interface ButtonGroupGeneratorConfig {
  /** Primary button label */
  primaryButtonLabel: string;
  /** Whether to include dropdown menu for global actions */
  includeDropdown: boolean;
  /** Navigation route context (e.g., "/dashboard/$schema/$collection") */
  navigationRoute: string;
  /** Global actions array type hint */
  globalActionsType?: string;
}

/**
 * Generate imports needed for button group functionality
 */
export const generateButtonGroupImports = (): string => {
  return `import { ChevronDownIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalAction } from "@/lib/utils";`;
};

/**
 * Generate the button group JSX code
 */
export const generateButtonGroupJSX = (
  config: ButtonGroupGeneratorConfig
): string => {
  const baseButtonGroup = `<ButtonGroup>\n  <Button\n    onClick={() =>\n      navigate({ search: (prev) => ({ ...prev, action: "create" }) })\n    }\n  >\n    ${config.primaryButtonLabel}\n  </Button>`;

  if (!config.includeDropdown) {
    return `${baseButtonGroup}\n</ButtonGroup>`;
  }

  const dropdownPart = `\n  {globalAction.length > 0 && (\n    <>\n      <ButtonGroupSeparator />\n      <DropdownMenu>\n        <DropdownMenuTrigger asChild>\n          <Button size="icon">\n            <ChevronDownIcon />\n          </Button>\n        </DropdownMenuTrigger>\n        <DropdownMenuContent align="end">\n          <DropdownMenuGroup>\n            {renderMenuItems(globalAction)}\n          </DropdownMenuGroup>\n        </DropdownMenuContent>\n      </DropdownMenu>\n    </>\n  )}\n</ButtonGroup>`;

  return baseButtonGroup + dropdownPart;
};

/**
 * Generate the renderMenuItems helper function
 */
export const generateRenderMenuItemsFunction = (
  navigationRoute: string
): string => {
  return `const renderMenuItems = (
    actions: GlobalAction<"${navigationRoute}">[]
  ): React.ReactNode => {
    return actions.map((action, index) => {
      const submenuItems = action.submenu;

      return (
        <React.Fragment key={index}>
          {action.divider && index > 0 && <DropdownMenuSeparator />}
          {submenuItems && submenuItems.length > 0 ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger disabled={action.disabled}>
                {action.icon && React.isValidElement(action.icon) && (
                  <span className="mr-2">{action.icon}</span>
                )}
                {typeof action.icon === "function" && (
                  <span className="mr-2">{action.icon(searchQuery)}</span>
                )}
                {action.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {renderMenuItems(submenuItems)}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem
              onClick={() => handleGlobalAction(action)}
              disabled={action.disabled}
              variant={action.variant}
            >
              {action.icon && React.isValidElement(action.icon) && (
                <span className="mr-2">{action.icon}</span>
              )}
              {typeof action.icon === "function" && (
                <span className="mr-2">{action.icon(searchQuery)}</span>
              )}
              {action.label}
            </DropdownMenuItem>
          )}
        </React.Fragment>
      );
    });
  };`;
};

/**
 * Generate the global action handler function
 */
export const generateGlobalActionHandler = (
  navigationRoute: string
): string => {
  return `const handleGlobalAction = (
    action: GlobalAction<"${navigationRoute}">
  ) => {
    action.onSelect?.(navigate);
  };`;
};

/**
 * Generate complete button group integration code
 * Returns an object with individual pieces that can be integrated
 */
export const generateButtonGroupIntegration = (
  config: ButtonGroupGeneratorConfig
): {
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
} => {
  return {
    imports: generateButtonGroupImports(),
    renderMenuItems: generateRenderMenuItemsFunction(config.navigationRoute),
    handleGlobalAction: generateGlobalActionHandler(config.navigationRoute),
    buttonGroupJSX: generateButtonGroupJSX(config),
  };
};

/**
 * Full code generator - returns ready-to-use code snippets
 * Usage:
 * const code = getButtonGroupCode({
 *   primaryButtonLabel: "Create",
 *   includeDropdown: true,
 *   navigationRoute: "/dashboard/$schema/$collection"
 * });
 *
 * console.log(code.imports);
 * console.log(code.buttonGroupJSX);
 */
export const getButtonGroupCode = (
  config: ButtonGroupGeneratorConfig
): ReturnType<typeof generateButtonGroupIntegration> => {
  return generateButtonGroupIntegration(config);
};
