import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import {
	CreateOutboundShipmentsFormOption,
	OutboundShipmentsForm,
} from "./form";

const CreateOutboundShipmentsForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(CreateOutboundShipmentsFormOption(pocketbase));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<OutboundShipmentsForm form={form as any} action="create" />
				<DialogFooter>
					<form.SubmitButton>Create Outbound Shipment</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateOutboundShipmentsForm;
