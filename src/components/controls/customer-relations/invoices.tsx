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
 * InvoiceControls
 * Searchable fields:
   * - invoiceNumber
 */
const InvoiceControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = React.useState("");

  const handleSearch = () => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push(`(invoiceNumber ~ '${searchTerm}')`);
    }

    if (statusFilter) filters.push(`status = '${statusFilter}'`);
    if (paymentMethodFilter) filters.push(`paymentMethod = '${paymentMethodFilter}'`);

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
  }, [statusFilter, paymentMethodFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPaymentMethodFilter("");
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
          <SelectItem value="draft">draft</SelectItem>
          <SelectItem value="sent">sent</SelectItem>
          <SelectItem value="paid">paid</SelectItem>
          <SelectItem value="overdue">overdue</SelectItem>
          <SelectItem value="cancelled">cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All paymentMethod" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="credit-card">credit-card</SelectItem>
          <SelectItem value="bank-transfer">bank-transfer</SelectItem>
          <SelectItem value="cash">cash</SelectItem>
          <SelectItem value="check">check</SelectItem>
          <SelectItem value="paypal">paypal</SelectItem>
          <SelectItem value="stripe">stripe</SelectItem>
          <SelectItem value="wire-transfer">wire-transfer</SelectItem>
          <SelectItem value="other">other</SelectItem>
          <SelectItem value="maya">maya</SelectItem>
          <SelectItem value="gcash">gcash</SelectItem>
        </SelectContent>
      </Select>
            {(searchTerm || statusFilter || paymentMethodFilter) && (
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

export default InvoiceControls;
