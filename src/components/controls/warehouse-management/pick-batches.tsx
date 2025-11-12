import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
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

/**
 * PickBatchControls
 * Searchable fields:
   * - batchNumber
 */
const PickBatchControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [strategyFilter, setStrategyFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(batchNumber ~ '${searchTerm}')`);
    }

    if (statusFilter) filters.push(`status = '${statusFilter}'`);
    if (strategyFilter) filters.push(`strategy = '${strategyFilter}'`);

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
  }, [statusFilter, strategyFilter]);

  return (
    <section className="col-span-full space-y-4">
      <div className="flex justify-between gap-4">
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
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, action: "create" }) })
          }
        >
          Create
        </Button>
      </div>
      <div className="flex gap-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open">open</SelectItem>
          <SelectItem value="in-progress">in-progress</SelectItem>
          <SelectItem value="completed">completed</SelectItem>
          <SelectItem value="cancelled">cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Select value={strategyFilter} onValueChange={setStrategyFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All strategy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="batch-picking">batch-picking</SelectItem>
          <SelectItem value="zone-picking">zone-picking</SelectItem>
          <SelectItem value="wave-picking">wave-picking</SelectItem>
          <SelectItem value="single-order-picking">single-order-picking</SelectItem>
          <SelectItem value="cluster-picking">cluster-picking</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </section>
  );
};

export default PickBatchControls;
