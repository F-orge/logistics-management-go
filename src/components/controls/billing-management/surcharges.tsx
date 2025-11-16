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
 * SurchargeControls
 * Searchable fields:
 * - name
 * - type
 */
const SurchargeControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [searchTerm, setSearchTerm] = React.useState("");
	const [calculationMethodFilter, setCalculationMethodFilter] =
		React.useState("");

	const handleSearch = () => {
		const filters = [];

		if (searchTerm.trim()) {
			filters.push(`((name ~ '${searchTerm}' || type ~ '${searchTerm}'))`);
		}

		if (calculationMethodFilter)
			filters.push(`calculationMethod = '${calculationMethodFilter}'`);

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
	}, [calculationMethodFilter]);

	const handleClearFilters = () => {
		setSearchTerm("");
		setCalculationMethodFilter("");
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
						<Select
							value={calculationMethodFilter}
							onValueChange={setCalculationMethodFilter}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="All calculationMethod" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="percentage">percentage</SelectItem>
								<SelectItem value="fixed">fixed</SelectItem>
								<SelectItem value="per-unit">per-unit</SelectItem>
								<SelectItem value="sliding-scale">sliding-scale</SelectItem>
							</SelectContent>
						</Select>
						{(searchTerm || calculationMethodFilter) && (
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

export default SurchargeControls;
