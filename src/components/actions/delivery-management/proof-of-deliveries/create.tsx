import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import {
  CreateProofOfDeliveriesFormOption,
  ProofOfDeliveriesForm,
} from "./form";

const CreateProofOfDeliveryForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(CreateProofOfDeliveriesFormOption(pocketbase));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <ProofOfDeliveriesForm form={form as any} action="create" />
        <DialogFooter>
          <form.SubmitButton>Create Proof of Delivery</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateProofOfDeliveryForm;
