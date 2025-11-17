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
import CreateInvoiceItemsForm from "./create";
import DeleteInvoiceItems from "./delete";
import UpdateInvoiceItemsForm from "./update";
import { Suspense } from "react";

const InvoiceItemsActions = () => {
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
			title: "Create Invoice Item",
			description: "Fill out the form to create a new invoice item.",
			Element: <CreateInvoiceItemsForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Invoice Item",
			description: "Modify the invoice item details below.",
			Element: (
        <Suspense>
          <UpdateInvoiceItemsForm />
        </Suspense>
      ),
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Invoice Item",
			description: "Are you sure you want to delete this invoice item?",
			Element: <DeleteInvoiceItems />,
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

export default InvoiceItemsActions;
