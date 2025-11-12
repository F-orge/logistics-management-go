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
 * RateRuleControls
 * Searchable fields:
   * - condition
   * - value
 */
const RateRuleControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pricingModelFilter, setPricingModelFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`((condition ~ '${searchTerm}' || value ~ '${searchTerm}'))`);
    }

    if (pricingModelFilter) filters.push(`pricingModel = '${pricingModelFilter}'`);

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
  }, [pricingModelFilter]);

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
          <div className="flex gap-2">
      <Select value={pricingModelFilter} onValueChange={setPricingModelFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All pricingModel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="per-kg">per-kg</SelectItem>
          <SelectItem value="per-item">per-item</SelectItem>
          <SelectItem value="flat-rate">flat-rate</SelectItem>
          <SelectItem value="per-cubic-meter">per-cubic-meter</SelectItem>
          <SelectItem value="per-zone">per-zone</SelectItem>
          <SelectItem value="percentage">percentage</SelectItem>
          <SelectItem value="tiered">tiered</SelectItem>
        </SelectContent>
      </Select>
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

export default RateRuleControls;
