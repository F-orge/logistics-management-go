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
import CreateProductsForm from "./create";
import DeleteProducts from "./delete";
import UpdateProductsForm from "./update";

const ProductsActions = () => {
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
			title: "Create Product",
			description: "Fill out the form to create a new product.",
			Element: <CreateProductsForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Product",
			description: "Modify the product details below.",
			Element: <UpdateProductsForm />,
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Product",
			description: "Are you sure you want to delete this product?",
			Element: <DeleteProducts />,
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

export default ProductsActions;
