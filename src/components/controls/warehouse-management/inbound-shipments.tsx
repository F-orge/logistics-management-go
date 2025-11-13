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

const InboundShipmentControls = () => {
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

export default InboundShipmentControls;
