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
 * AccountTransactionControls
 * Searchable fields:
   * - referenceNumber
 */
const AccountTransactionControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(referenceNumber ~ '${searchTerm}')`);
    }

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
  }, [typeFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
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
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="credit">credit</SelectItem>
          <SelectItem value="debit">debit</SelectItem>
          <SelectItem value="top-up">top-up</SelectItem>
          <SelectItem value="refund">refund</SelectItem>
          <SelectItem value="adjustment">adjustment</SelectItem>
          <SelectItem value="fee">fee</SelectItem>
        </SelectContent>
      </Select>
            {(searchTerm || typeFilter) && (
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

export default AccountTransactionControls;
