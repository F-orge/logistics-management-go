import { useNavigate, useSearch } from "@tanstack/react-router";
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
import { GlobalAction } from "@/lib/utils";

const SalesOrderItemControls = () => {
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

	return (
		<section className="col-span-full flex justify-end">
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

export default SalesOrderItemControls;
