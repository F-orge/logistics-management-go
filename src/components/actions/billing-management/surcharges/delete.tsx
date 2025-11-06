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

const DeleteSurchargeFormDialog = () => {
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const [isDeleting, setIsDeleting] = useState(false);

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.BillingManagementSurcharges, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementSurcharges)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const handleDelete = async () => {
		if (!searchParams.id) {
			toast.error("No Surcharge selected");
			return;
		}

		setIsDeleting(true);
		try {
			await pocketbase
				.collection(Collections.BillingManagementSurcharges)
				.delete(searchParams.id);

			navigate({
				search: (prev) => ({
					...prev,
					action: undefined,
					id: undefined,
				}),
			});

			toast.success("Surcharge deleted successfully");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(error.message);
			} else {
				toast.error("Failed to delete Surcharge");
			}
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog
			open={searchParams.action === "deleteSurcharge"}
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
					<AlertDialogTitle>Delete Surcharge</AlertDialogTitle>
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

export default DeleteSurchargeFormDialog;
