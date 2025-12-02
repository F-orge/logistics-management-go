import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { CampaignForm, CreateCampaignsFormOption } from "./form";

const CreateCampaignForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(CreateCampaignsFormOption(pocketbase));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate });
			}}
		>
			<form.AppForm>
				<CampaignForm form={form as any} action="create" />
				<DialogFooter className="pt-4">
					<form.ClearButton
						type="reset"
						variant={"outline"}
						onClick={(e) => {
							e.preventDefault();
							form.reset();
						}}
					>
						Reset
					</form.ClearButton>
					<form.SubmitButton>Create Campaign</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateCampaignForm;
