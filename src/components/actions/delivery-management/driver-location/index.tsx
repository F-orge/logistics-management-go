import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import CreateDriverLocationForm from "./create";
import DeleteDriverLocation from "./delete";
import UpdateDriverLocationForm from "./update";

const DriverLocationActions = () => {
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
			title: "Create Driver Location",
			description: "Fill out the form to create a new driver location.",
			Element: <CreateDriverLocationForm />,
		};
	}

	if (searchQuery.action === "update" && searchQuery.id) {
		Component = {
			title: "Update Driver Location",
			description: "Modify the driver location details below.",
			Element: (
				<Suspense>
					<UpdateDriverLocationForm />
				</Suspense>
			),
		};
	}

	if (searchQuery.action === "delete" && searchQuery.id) {
		Component = {
			title: "Delete Driver Location",
			description: "Are you sure you want to delete this driver location?",
			Element: <DeleteDriverLocation />,
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
				<DialogContent className="max-h-3/4 !max-w-3/4 overflow-y-auto">
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

export default DriverLocationActions;
