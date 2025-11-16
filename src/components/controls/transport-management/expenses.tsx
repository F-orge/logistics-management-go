import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const ExpensControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [typeFilter, setTypeFilter] = React.useState("");
	const [currencyFilter, setCurrencyFilter] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState("");

	const handleFilterChange = () => {
		const filters = [];
		if (typeFilter) filters.push(`type = '${typeFilter}'`);
		if (currencyFilter) filters.push(`currency = '${currencyFilter}'`);
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
		setTypeFilter("");
		setCurrencyFilter("");
		setStatusFilter("");
		navigate({
			search: (prev) => {
				const { filter, ...rest } = prev;
				return rest;
			},
		});
	};

	const hasActiveFilters = typeFilter || currencyFilter || statusFilter;

	React.useEffect(() => {
		handleFilterChange();
	}, [typeFilter, currencyFilter, statusFilter]);

	return (
		<section className="col-span-full flex justify-between gap-4">
			<div className="flex gap-2 items-center">
				<Select value={typeFilter} onValueChange={setTypeFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="fuel">fuel</SelectItem>
						<SelectItem value="tolls">tolls</SelectItem>
						<SelectItem value="maintenance">maintenance</SelectItem>
						<SelectItem value="parking">parking</SelectItem>
						<SelectItem value="meals">meals</SelectItem>
						<SelectItem value="accomodation">accomodation</SelectItem>
					</SelectContent>
				</Select>
				<Select value={currencyFilter} onValueChange={setCurrencyFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All currency" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="PHP">PHP</SelectItem>
						<SelectItem value="USD">USD</SelectItem>
						<SelectItem value="EUR">EUR</SelectItem>
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="pending">pending</SelectItem>
						<SelectItem value="approved">approved</SelectItem>
						<SelectItem value="rejected">rejected</SelectItem>
						<SelectItem value="reimbursed">reimbursed</SelectItem>
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

export default ExpensControls;
