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

const GeofenceEventControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [typeFilter, setTypeFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
    if (typeFilter) filters.push(`type = '${typeFilter}'`);

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
    setTypeFilter("");
    navigate({
      search: (prev) => {
        const { filter, ...rest } = prev;
        return rest;
      },
    });
  };

  const hasActiveFilters = typeFilter;

  React.useEffect(() => {
    handleFilterChange();
  }, [typeFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2 items-center">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="enter">enter</SelectItem>
          <SelectItem value="exit">exit</SelectItem>
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

export default GeofenceEventControls;
