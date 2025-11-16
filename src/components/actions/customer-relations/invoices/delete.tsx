import { formOptions } from "@tanstack/react-form";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";

const FormOption = formOptions({
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsInvoices)
				.delete(meta.id);
			toast.success("Invoice deleted successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(`Error: ${error.message}`);
			}
		} finally {
			meta.navigate({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const DeleteInvoice = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const form = useAppForm(FormOption);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<DialogFooter>
					<form.SubmitButton>Delete Invoice</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default DeleteInvoice;
