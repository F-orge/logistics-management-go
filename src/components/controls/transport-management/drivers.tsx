import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronDownIcon, SearchIcon, X } from "lucide-react";
import React, { Suspense, use } from "react";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GlobalAction } from "@/lib/utils";

/**
 * DriverControls
 * Searchable fields:
 * - licenseNumber
 */
const DriverControls = ({
  globalAction = [],
}: {
  globalAction?: Array<GlobalAction<"/dashboard/$schema/$collection">>;
}) => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(licenseNumber ~ '${searchTerm}')`);
    }

    if (statusFilter) filters.push(`status = '${statusFilter}'`);

    const filterQuery = filters.length > 0 ? filters.join(" && ") : "";

    if (!filterQuery) {
      navigate({
        search: (prev) => {
          const { filter, ...rest } = prev;
          return rest;
        },
      });
      return;
    }

    navigate({
      search: (prev) => ({
        ...prev,
        filter: filterQuery,
      }),
    });
  };

  React.useEffect(() => {
    handleSearch();
  }, [statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    navigate({
      search: (prev) => {
        const { filter, ...rest } = prev;
        return rest;
      },
    });
  };

  const handleGlobalAction = (
    action: GlobalAction<"/dashboard/$schema/$collection">
  ) => {
    action.onSelect?.(navigate);
  };

  const renderMenuItems = (
    actions: GlobalAction<"/dashboard/$schema/$collection">[]
  ): React.ReactNode => {
    return actions.map((action, index) => {
      let submenuItems:
        | GlobalAction<"/dashboard/$schema/$collection">[]
        | undefined;

      // Try to resolve async submenuImport first, fallback to submenu
      if (action.submenuImport) {
        try {
          submenuItems = use(action.submenuImport());
        } catch {
          // Silent error handling - render nothing
        }
      } else if (action.submenu) {
        submenuItems = action.submenu;
      }

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
  };

  return (
    <Suspense>
      <section className="col-span-full space-y-4">
        <div className="flex justify-between gap-4">
          <div className="flex gap-2.5">
            <InputGroup className="w-full max-w-sm">
              <InputGroupInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={handleSearch}
                  variant="secondary"
                  className="rounded-md"
                >
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <div className="flex gap-2 items-center">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="inactive">inactive</SelectItem>
                  <SelectItem value="on-leave">on-leave</SelectItem>
                </SelectContent>
              </Select>
              {(searchTerm || statusFilter) && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleClearFilters}
                      variant="outline"
                      size="icon-sm"
                    >
                      <X />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear filters</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          <ButtonGroup>
            <Button
              onClick={() =>
                navigate({ search: (prev) => ({ ...prev, action: "create" }) })
              }
            >
              Create
            </Button>
            {globalAction.length > 0 && (
              <>
                <ButtonGroupSeparator />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon">
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      {renderMenuItems(globalAction)}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </ButtonGroup>
        </div>
      </section>
    </Suspense>
  );
};

export default DriverControls;
