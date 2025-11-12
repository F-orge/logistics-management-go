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
 * InteractionControls
 * Searchable fields:
   * - outcome
 */
const InteractionControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(outcome ~ '${searchTerm}')`);
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
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="call">call</SelectItem>
          <SelectItem value="meeting">meeting</SelectItem>
          <SelectItem value="text">text</SelectItem>
          <SelectItem value="email">email</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </section>
  );
};

export default InteractionControls;
