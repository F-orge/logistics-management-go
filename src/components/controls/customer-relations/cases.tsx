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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from "lucide-react";

/**
 * CasControls
 * Searchable fields:
   * - caseNumber
 */
const CasControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(caseNumber ~ '${searchTerm}')`);
    }

    if (statusFilter) filters.push(`status = '${statusFilter}'`);
    if (priorityFilter) filters.push(`priority = '${priorityFilter}'`);
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

  React.useEffect(() => {
    handleSearch();
  }, [statusFilter, priorityFilter, typeFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
    setTypeFilter("");
    navigate({
      search: (prev) => {
        const { filter, ...rest } = prev;
        return rest;
      },
    });
  };

  return (
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
          <SelectItem value="new">new</SelectItem>
          <SelectItem value="in-progress">in-progress</SelectItem>
          <SelectItem value="waiting-for-customer">waiting-for-customer</SelectItem>
          <SelectItem value="waiting-for-internal">waiting-for-internal</SelectItem>
          <SelectItem value="escalated">escalated</SelectItem>
          <SelectItem value="resolved">resolved</SelectItem>
          <SelectItem value="closed">closed</SelectItem>
          <SelectItem value="cancelled">cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="critical">critical</SelectItem>
          <SelectItem value="high">high</SelectItem>
          <SelectItem value="medium">medium</SelectItem>
          <SelectItem value="low">low</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="question">question</SelectItem>
          <SelectItem value="problem">problem</SelectItem>
          <SelectItem value="complaint">complaint</SelectItem>
          <SelectItem value="feature-request">feature-request</SelectItem>
          <SelectItem value="bug-report">bug-report</SelectItem>
          <SelectItem value="technical-support">technical-support</SelectItem>
        </SelectContent>
      </Select>
            {(searchTerm || statusFilter || priorityFilter || typeFilter) && (
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
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, action: "create" }) })
          }
        >
          Create
        </Button>
      </div>
    </section>
  );
};

export default CasControls;
