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
import CreateCasesForm from "./create";
import DeleteCases from "./delete";
import UpdateCasesForm from "./update";

const CasesActions = () => {
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
			title: "Create Case",
			description: "Fill out the form to create a new case.",
			Element: <CreateCasesForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Case",
			description: "Modify the case details below.",
			Element: <UpdateCasesForm />,
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Case",
			description: "Are you sure you want to delete this case?",
			Element: <DeleteCases />,
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

export default CasesActions;
