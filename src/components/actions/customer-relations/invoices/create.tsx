import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { CreateInvoicesFormOption, InvoicesForm } from "./form";

const CreateInvoicesForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(CreateInvoicesFormOption(pocketbase));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <InvoicesForm form={form as any} action="create" />
        <DialogFooter>
          <form.SubmitButton>Create Invoice</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateInvoicesForm;
