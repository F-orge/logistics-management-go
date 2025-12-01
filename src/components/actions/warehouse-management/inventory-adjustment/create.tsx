import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import {
	CreateInventoryAdjustmentFormOption,
	InventoryAdjustmentForm,
} from "./form";

const CreateInventoryAdjustmentForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(CreateInventoryAdjustmentFormOption(pocketbase));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<InventoryAdjustmentForm form={form as any} action="create" />
				<DialogFooter>
					<form.SubmitButton>Create Inventory Adjustment</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateInventoryAdjustmentForm;
