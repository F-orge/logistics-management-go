import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React, { useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Collections } from "@/lib/pb.types";

const DeleteReturnFormDialog = () => {
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [isDeleting, setIsDeleting] = useState(false);

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementReturns, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const handleDelete = async () => {
		if (!searchParams.id) {
			toast.error("No Return selected");
			return;
		}

		setIsDeleting(true);
		try {
			await pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.delete(searchParams.id);

			navigate({
				search: (prev) => ({
					...prev,
					action: undefined,
					id: undefined,
				}),
			});

			toast.success("Return deleted successfully");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(error.message);
			} else {
				toast.error("Failed to delete Return");
			}
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog
			open={searchParams.action === "deleteReturn"}
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
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Return</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete{" "}
						<span className="font-semibold text-foreground">
							{record?.name}
						</span>
						? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteReturnFormDialog;
