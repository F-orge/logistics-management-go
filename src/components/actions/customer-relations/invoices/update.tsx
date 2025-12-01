import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import { InvoicesForm, UpdateInvoicesFormOption } from "./form";

const UpdateInvoicesForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useSuspenseQuery({
		queryKey: ["invoice", searchQuery.id],
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsInvoices)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm(UpdateInvoicesFormOption(pocketbase, data));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<InvoicesForm form={form as any} action="edit" />
				<DialogFooter>
					<form.SubmitButton>Update Invoice</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateInvoicesForm;
