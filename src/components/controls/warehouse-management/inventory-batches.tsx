import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { GlobalAction } from "@/lib/utils";

/**
 * InventoryBatchControls
 * Searchable fields:
 * - batchNumber
 */
const InventoryBatchControls = () => {
	const renderMenuItems = (
		actions: GlobalAction<"/dashboard/$schema/$collection">[],
	): React.ReactNode => {
		return actions.map((action, index) => {
			const submenuItems = action.submenu;

			return (
				<React.Fragment key={index}>
					{action.divider && index > 0 && <DropdownMenuSeparator />}
					{submenuItems && submenuItems.length > 0 ? (
						<DropdownMenuSub>
							<DropdownMenuSubTrigger disabled={action.disabled}>
								{action.icon && React.isValidElement(action.icon) && (
									<span className="mr-2">{action.icon}</span>
								)}
								{typeof action.icon === "function" && (
									<span className="mr-2">{action.icon(searchQuery)}</span>
								)}
								{action.label}
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								{renderMenuItems(submenuItems)}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					) : (
						<DropdownMenuItem
							onClick={() => handleGlobalAction(action)}
							disabled={action.disabled}
							variant={action.variant}
						>
							{action.icon && React.isValidElement(action.icon) && (
								<span className="mr-2">{action.icon}</span>
							)}
							{typeof action.icon === "function" && (
								<span className="mr-2">{action.icon(searchQuery)}</span>
							)}
							{action.label}
						</DropdownMenuItem>
					)}
				</React.Fragment>
			);
		});
	};

	const handleGlobalAction = (
		action: GlobalAction<"/dashboard/$schema/$collection">,
	) => {
		action.onSelect?.(navigate);
	};

	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

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
		const filterQuery = `batchNumber ~ '${searchTerm}'`;

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
			<ButtonGroup>
				<Button
					onClick={() =>
						navigate({ search: (prev) => ({ ...prev, action: "create" }) })
					}
				>
					Create
				</Button>
			</ButtonGroup>
		</section>
	);
};

export default InventoryBatchControls;
