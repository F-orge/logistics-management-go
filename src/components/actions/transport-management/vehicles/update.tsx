import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import { UpdateVehiclesFormOption, VehiclesForm } from "./form";

const UpdateVehiclesForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useSuspenseQuery({
		queryKey: ["vehicle", searchQuery.id],
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.TransportManagementVehicles)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm(UpdateVehiclesFormOption(pocketbase, data));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<VehiclesForm form={form as any} action="edit" />
				<DialogFooter>
					<form.SubmitButton>Update Vehicle</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateVehiclesForm;
