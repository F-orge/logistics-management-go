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
import CreateInvoiceForm from "./create";
import DeleteInvoice from "./delete";
import UpdateInvoiceForm from "./update";

const InvoiceActions = () => {
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
			title: "Create Invoice",
			description: "Fill out the form to create a new invoice.",
			Element: <CreateInvoiceForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Invoice",
			description: "Modify the invoice details below.",
			Element: <UpdateInvoiceForm />,
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Invoice",
			description: "Are you sure you want to delete this invoice?",
			Element: <DeleteInvoice />,
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

export default InvoiceActions;
