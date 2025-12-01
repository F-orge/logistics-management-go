import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import { UpdateWarehousesFormOption, WarehousesForm } from "./form";

const UpdateWarehousesForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useSuspenseQuery({
		queryKey: ["warehouse", searchQuery.id],
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.WarehouseManagementWarehouses)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm(UpdateWarehousesFormOption(pocketbase, data));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<WarehousesForm form={form as any} action="edit" />
				<DialogFooter>
					<form.SubmitButton>Update Warehouse</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateWarehousesForm;
