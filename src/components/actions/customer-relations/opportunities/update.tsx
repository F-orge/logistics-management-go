import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import { OpportunitiesForm, UpdateOpportunitiesFormOption } from "./form";

const UpdateOpportunitiesForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useSuspenseQuery({
    queryKey: ["opportunity", searchQuery.id],
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsOpportunities)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm(UpdateOpportunitiesFormOption(pocketbase, data));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <OpportunitiesForm form={form as any} action="edit" />
        <DialogFooter>
          <form.SubmitButton>Update Opportunity</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateOpportunitiesForm;
