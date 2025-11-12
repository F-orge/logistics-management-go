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
 * CarrierRateControls
 * Searchable fields:
   * - serviceType
   * - origin
   * - destination
 */
const CarrierRateControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [unitFilter, setUnitFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`((serviceType ~ '${searchTerm}' || origin ~ '${searchTerm}' || destination ~ '${searchTerm}'))`);
    }

    if (unitFilter) filters.push(`unit = '${unitFilter}'`);

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
  }, [unitFilter]);

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
      <Select value={unitFilter} onValueChange={setUnitFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="per-kg">per-kg</SelectItem>
          <SelectItem value="per-container">per-container</SelectItem>
          <SelectItem value="per-mile">per-mile</SelectItem>
          <SelectItem value="per-km">per-km</SelectItem>
          <SelectItem value="flat-rate">flat-rate</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </section>
  );
};

export default CarrierRateControls;
