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

/**
 * ShipmentLegEventControls
 * Searchable fields:
 * - message
 */
const ShipmentLegEventControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [searchTerm, setSearchTerm] = React.useState("");

	const handleSearch = () => {
		if (!searchTerm.trim()) {
			navigate({
				search: (prev) => {
					const { filter, ...rest } = prev;
					return rest;
				},
			});
			return;
		}

		// PocketBase filter syntax: field ~ 'value' for contains (regex)
		// Multiple fields: (field1 ~ 'term' || field2 ~ 'term')
		const filterQuery = `message ~ '${searchTerm}'`;

		navigate({
			search: (prev) => ({
				...prev,
				filter: filterQuery,
			}),
		});
	};

	return (
		<section className="col-span-full flex justify-between">
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
		</section>
	);
};

export default ShipmentLegEventControls;
