import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import CreateForm from "./create";
import DeleteForm from "./delete";
import UpdateForm from "./update";

const ProofOfDeliveriesActions = () => {
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
			title: "Create Proof Of Deliveries",
			description: "Fill out the form to create a new proof of deliveries.",
			Element: <CreateForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Proof Of Deliveries",
			description: "Modify the proof of deliveries details below.",
			Element: <UpdateForm />,
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Proof Of Deliveries",
			description: "Are you sure you want to delete this proof of deliveries?",
			Element: <DeleteForm />,
		};
	}

	if (Component) {
		return (
			<Dialog
				open={!!searchQuery.action}
				onOpenChange={(open) => {
					if (!open) {
						navigate({
							search: (prev) => ({ ...prev, action: undefined, id: undefined }),
						});
					}
				}}
			>
				<DialogContent className="max-h-3/4 overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{Component.title}</DialogTitle>
						<DialogDescription>{Component.description}</DialogDescription>
					</DialogHeader>
					{Component.Element}
				</DialogContent>
			</Dialog>
		);
	}
};

export default ProofOfDeliveriesActions;
