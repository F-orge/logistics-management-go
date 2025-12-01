import { useNavigate, useSearch } from "@tanstack/react-router";
import { X } from "lucide-react";
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
import { GlobalAction } from "@/lib/utils";

const ReturnItemControls = () => {
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
	const [conditionFilter, setConditionFilter] = React.useState("");

	const handleFilterChange = () => {
		const filters = [];
		if (conditionFilter) filters.push(`condition = '${conditionFilter}'`);

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
		setConditionFilter("");
		navigate({
			search: (prev) => {
				const { filter, ...rest } = prev;
				return rest;
			},
		});
	};

	const hasActiveFilters = conditionFilter;

	React.useEffect(() => {
		handleFilterChange();
	}, [conditionFilter]);

	return (
		<section className="col-span-full flex justify-between gap-4">
			<div className="flex gap-2 items-center">
				<Select value={conditionFilter} onValueChange={setConditionFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All condition" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="sellable">sellable</SelectItem>
						<SelectItem value="damaged">damaged</SelectItem>
						<SelectItem value="defective">defective</SelectItem>
						<SelectItem value="expired">expired</SelectItem>
						<SelectItem value="unsellable">unsellable</SelectItem>
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

export default ReturnItemControls;
