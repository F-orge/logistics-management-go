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
 * LocationControls
 * Searchable fields:
 * - name
 * - barcode
 */
const LocationControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [searchTerm, setSearchTerm] = React.useState("");
	const [typeFilter, setTypeFilter] = React.useState("");

	const handleSearch = () => {
		const filters = [];

		if (searchTerm.trim()) {
			filters.push(`((name ~ '${searchTerm}' || barcode ~ '${searchTerm}'))`);
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
								<SelectItem value="receiving-dock">receiving-dock</SelectItem>
								<SelectItem value="pick-bin">pick-bin</SelectItem>
								<SelectItem value="packing-station">packing-station</SelectItem>
								<SelectItem value="cross-dock-area">cross-dock-area</SelectItem>
								<SelectItem value="bulk-storage">bulk-storage</SelectItem>
								<SelectItem value="reserve-storage">reserve-storage</SelectItem>
								<SelectItem value="damaged-goods">damaged-goods</SelectItem>
								<SelectItem value="staging-area">staging-area</SelectItem>
								<SelectItem value="quality-control">quality-control</SelectItem>
								<SelectItem value="returns-area">returns-area</SelectItem>
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

export default LocationControls;
