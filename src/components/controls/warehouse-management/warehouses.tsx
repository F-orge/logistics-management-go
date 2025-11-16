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
 * WarehousControls
 * Searchable fields:
 * - name
 * - address
 * - city
 * - state
 * - postalCode
 * - country
 * - timezone
 * - contactPerson
 * - contactEmail
 * - contactPhone
 */
const WarehousControls = () => {
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
		const filterQuery = `(name ~ '${searchTerm}' || address ~ '${searchTerm}' || city ~ '${searchTerm}' || state ~ '${searchTerm}' || postalCode ~ '${searchTerm}' || country ~ '${searchTerm}' || timezone ~ '${searchTerm}' || contactPerson ~ '${searchTerm}' || contactEmail ~ '${searchTerm}' || contactPhone ~ '${searchTerm}')`;

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

export default WarehousControls;
