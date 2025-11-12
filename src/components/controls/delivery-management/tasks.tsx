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
 * TaskControls
 * Searchable fields:
   * - deliveryAddress
   * - recipientName
   * - recipientPhone
 */
const TaskControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [failureReasonFilter, setFailureReasonFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`((deliveryAddress ~ '${searchTerm}' || recipientName ~ '${searchTerm}' || recipientPhone ~ '${searchTerm}'))`);
    }

    if (statusFilter) filters.push(`status = '${statusFilter}'`);
    if (failureReasonFilter) filters.push(`failureReason = '${failureReasonFilter}'`);

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
  }, [statusFilter, failureReasonFilter]);

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
          <SelectItem value="pending">pending</SelectItem>
          <SelectItem value="assigned">assigned</SelectItem>
          <SelectItem value="out-for-delivery">out-for-delivery</SelectItem>
          <SelectItem value="delivered">delivered</SelectItem>
          <SelectItem value="failed">failed</SelectItem>
          <SelectItem value="cancelled">cancelled</SelectItem>
          <SelectItem value="rescheduled">rescheduled</SelectItem>
        </SelectContent>
      </Select>
      <Select value={failureReasonFilter} onValueChange={setFailureReasonFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All failureReason" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reecipient-not-home">reecipient-not-home</SelectItem>
          <SelectItem value="address-not-found">address-not-found</SelectItem>
          <SelectItem value="refused-delivery">refused-delivery</SelectItem>
          <SelectItem value="damaged-package">damaged-package</SelectItem>
          <SelectItem value="access-denied">access-denied</SelectItem>
          <SelectItem value="weather-conditions">weather-conditions</SelectItem>
          <SelectItem value="vehicle-breakdown">vehicle-breakdown</SelectItem>
          <SelectItem value="other">other</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </section>
  );
};

export default TaskControls;
