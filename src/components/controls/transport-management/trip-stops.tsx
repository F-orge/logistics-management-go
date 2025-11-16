import { useNavigate } from "@tanstack/react-router";
import { SearchIcon, X } from "lucide-react";
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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * TripStopControls
 * Searchable fields:
 * - address
 */
const TripStopControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [searchTerm, setSearchTerm] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState("");

	const handleSearch = () => {
		const filters = [];

		if (searchTerm.trim()) {
			filters.push(`(address ~ '${searchTerm}')`);
		}

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

	React.useEffect(() => {
		handleSearch();
	}, [statusFilter]);

	const handleClearFilters = () => {
		setSearchTerm("");
		setStatusFilter("");
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
								<SelectItem value="pending">pending</SelectItem>
								<SelectItem value="arrived">arrived</SelectItem>
								<SelectItem value="completed">completed</SelectItem>
								<SelectItem value="skipped">skipped</SelectItem>
							</SelectContent>
						</Select>
						{(searchTerm || statusFilter) && (
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

export default TripStopControls;
