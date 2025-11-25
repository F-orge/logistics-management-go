import { formOptions } from "@tanstack/react-form";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
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
				.pocketbase!.collection(Collections.DeliveryManagementTasks)
				.delete(meta.id);
			toast.success("Task deleted successfully!");
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

const DeleteTask = () => {
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
				<p>
					Are you sure you want to delete this task? This action cannot be
					undone.
				</p>
				<DialogFooter>
					<form.SubmitButton>Delete Task</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default DeleteTask;
