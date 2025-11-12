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
 * OpportunityControls
 * Searchable fields:
   * - name
 */
const OpportunityControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(name ~ '${searchTerm}')`);
    }

    if (stageFilter) filters.push(`stage = '${stageFilter}'`);
    if (sourceFilter) filters.push(`source = '${sourceFilter}'`);

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
  }, [stageFilter, sourceFilter]);

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
      <Select value={stageFilter} onValueChange={setStageFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All stage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="prospecting">prospecting</SelectItem>
          <SelectItem value="qualification">qualification</SelectItem>
          <SelectItem value="need-analysis">need-analysis</SelectItem>
          <SelectItem value="demo">demo</SelectItem>
          <SelectItem value="proposal">proposal</SelectItem>
          <SelectItem value="negotiation">negotiation</SelectItem>
          <SelectItem value="closed-won">closed-won</SelectItem>
          <SelectItem value="closed-lost">closed-lost</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sourceFilter} onValueChange={setSourceFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="website">website</SelectItem>
          <SelectItem value="referral">referral</SelectItem>
          <SelectItem value="social-media">social-media</SelectItem>
          <SelectItem value="email-campaign">email-campaign</SelectItem>
          <SelectItem value="cold-call">cold-call</SelectItem>
          <SelectItem value="event">event</SelectItem>
          <SelectItem value="advertisment">advertisment</SelectItem>
          <SelectItem value="partner">partner</SelectItem>
          <SelectItem value="existing-customer">existing-customer</SelectItem>
          <SelectItem value="other">other</SelectItem>
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

export default OpportunityControls;
