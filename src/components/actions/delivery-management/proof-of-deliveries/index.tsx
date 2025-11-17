import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import CreateProofOfDeliveryForm from "./create";
import DeleteProofOfDelivery from "./delete";
import UpdateProofOfDeliveryForm from "./update";
import { Suspense } from "react";

const ProofOfDeliveryActions = () => {
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
			title: "Create Proof of Delivery",
			description: "Fill out the form to create a new proof of delivery.",
			Element: <CreateProofOfDeliveryForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Proof of Delivery",
			description: "Modify the proof of delivery details below.",
			Element: (
        <Suspense>
          <UpdateProofOfDeliveryForm />
        </Suspense>
      ),
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Proof of Delivery",
			description: "Are you sure you want to delete this proof of delivery?",
			Element: <DeleteProofOfDelivery />,
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

export default ProofOfDeliveryActions;
