import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import CreateOpportunitiesForm from "./create";
import DeleteOpportunities from "./delete";
import UpdateOpportunitiesForm from "./update";

const OpportunitiesActions = () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

	let Component:
		| {
				title: string;
				description?: string;
				Element: React.ReactNode;
		  }
		| undefined = undefined;

	if (searchQuery.action === "create") {
		Component = {
			title: "Create Opportunity",
			description: "Fill out the form to create a new opportunity.",
			Element: <CreateOpportunitiesForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Opportunity",
			description: "Modify the opportunity details below.",
			Element: <UpdateOpportunitiesForm />,
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Opportunity",
			description: "Are you sure you want to delete this opportunity?",
			Element: <DeleteOpportunities />,
		};
	}

	if (!Component) {
		return null;
	}

	return (
		<Dialog
			open={!!Component}
			onOpenChange={(open) => {
				if (!open) {
					navigate({
						search: (prev) => ({
							...prev,
							action: undefined,
							id: undefined,
						}),
					});
				}
			}}
		>
			<DialogContent className="max-h-3/4 overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{Component.title}</DialogTitle>
					{Component.description && (
						<DialogDescription>{Component.description}</DialogDescription>
					)}
				</DialogHeader>
				{Component.Element}
			</DialogContent>
		</Dialog>
	);
};

export default OpportunitiesActions;
