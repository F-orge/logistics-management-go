import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
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

const PartnerInvoiceItemsActions = () => {
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
			title: "Create Partner Invoice Items",
			description: "Fill out the form to create a new partner invoice items.",
			Element: <CreateForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Partner Invoice Items",
			description: "Modify the partner invoice items details below.",
			Element: (
				<Suspense>
					<UpdateForm />
				</Suspense>
			),
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Partner Invoice Items",
			description:
				"Are you sure you want to delete this partner invoice items?",
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

export default PartnerInvoiceItemsActions;
