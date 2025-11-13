import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from "lucide-react";

const PutawayRuleControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [locationTypeFilter, setLocationTypeFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
    if (locationTypeFilter) filters.push(`locationType = '${locationTypeFilter}'`);

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
    setLocationTypeFilter("");
    navigate({
      search: (prev) => {
        const { filter, ...rest } = prev;
        return rest;
      },
    });
  };

  const hasActiveFilters = locationTypeFilter;

  React.useEffect(() => {
    handleFilterChange();
  }, [locationTypeFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2 items-center">
      <Select value={locationTypeFilter} onValueChange={setLocationTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All locationType" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="receiving-dock">receiving-dock</SelectItem>
          <SelectItem value="pick-bin">pick-bin</SelectItem>
          <SelectItem value="packing-station">packing-station</SelectItem>
          <SelectItem value="cross-dock-area">cross-dock-area</SelectItem>
          <SelectItem value="bulk-storage">bulk-storage</SelectItem>
          <SelectItem value="reserve-storage">reserve-storage</SelectItem>
          <SelectItem value="damaged-goods">damaged-goods</SelectItem>
          <SelectItem value="staging-area">staging-area</SelectItem>
          <SelectItem value="quality-control">quality-control</SelectItem>
          <SelectItem value="returns-area">returns-area</SelectItem>
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
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "create" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default PutawayRuleControls;
