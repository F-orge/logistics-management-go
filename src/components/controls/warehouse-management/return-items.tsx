import { useNavigate } from "@tanstack/react-router";
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

const ReturnItemControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [conditionFilter, setConditionFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
    if (conditionFilter) filters.push(`condition = '${conditionFilter}'`);

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
    setConditionFilter("");
    navigate({
      search: (prev) => {
        const { filter, ...rest } = prev;
        return rest;
      },
    });
  };

  const hasActiveFilters = conditionFilter;

  React.useEffect(() => {
    handleFilterChange();
  }, [conditionFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2 items-center">
        <Select value={conditionFilter} onValueChange={setConditionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sellable">sellable</SelectItem>
            <SelectItem value="damaged">damaged</SelectItem>
            <SelectItem value="defective">defective</SelectItem>
            <SelectItem value="expired">expired</SelectItem>
            <SelectItem value="unsellable">unsellable</SelectItem>
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

export default ReturnItemControls;
