import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import { LocationsForm, UpdateLocationsFormOption } from "./form";

const UpdateLocationsForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useSuspenseQuery({
		queryKey: ["location", searchQuery.id],
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.WarehouseManagementLocations)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm(UpdateLocationsFormOption(pocketbase, data));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<LocationsForm form={form as any} action="edit" />
				<DialogFooter>
					<form.SubmitButton>Update Location</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateLocationsForm;
