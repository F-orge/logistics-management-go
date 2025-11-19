import { useNavigate, useSearch } from "@tanstack/react-router";
import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { GlobalAction } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
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

const InboundShipmentControls = () => {const renderMenuItems = (
    actions: GlobalAction<"/dashboard/$schema/$collection">[]
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
  };

const handleGlobalAction = (
    action: GlobalAction<"/dashboard/$schema/$collection">
  ) => {
    action.onSelect?.(navigate);
  };



  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [statusFilter, setStatusFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
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

  const handleClearFilters = () => {
    setStatusFilter("");
    navigate({
      search: (prev) => {
        const { filter, ...rest } = prev;
        return rest;
      },
    });
  };

  const hasActiveFilters = statusFilter;

  React.useEffect(() => {
    handleFilterChange();
  }, [statusFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">pending</SelectItem>
            <SelectItem value="arrived">arrived</SelectItem>
            <SelectItem value="processing">processing</SelectItem>
            <SelectItem value="completed">completed</SelectItem>
            <SelectItem value="cancelled">cancelled</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
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
      <ButtonGroup>
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, action: "create" }) })
          }
        >
          Create
        </Button>
      </ButtonGroup>
    </section>
  );
};

export default InboundShipmentControls;
