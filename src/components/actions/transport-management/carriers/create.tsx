import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { CarriersForm, CreateCarriersFormOption } from "./form";

const CreateCarriersForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(CreateCarriersFormOption(pocketbase));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <CarriersForm form={form as any} action="create" />
        <DialogFooter>
          <form.SubmitButton>Create Carrier</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateCarriersForm;
