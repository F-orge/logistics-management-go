import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/form";
import { getRouteApi } from "@tanstack/react-router";

const NewLeadsDialog = () => {
  const route = getRouteApi("/dashboard/crm/leads/");

  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({});

  return (
    <Dialog>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <form.SubmitButton>Create Lead</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadsDialog;
