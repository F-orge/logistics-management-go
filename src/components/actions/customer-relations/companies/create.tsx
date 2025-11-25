import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { CompaniesForm, CreateCompaniesFormOption } from "./form";

const CreateCompaniesForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(CreateCompaniesFormOption(pocketbase));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <CompaniesForm form={form as any} action="create" />
        <DialogFooter>
          <form.SubmitButton>Create Company</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateCompaniesForm;
