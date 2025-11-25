import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections } from "@/lib/pb.types";
import {
  InventoryBatchesForm,
  UpdateInventoryBatchesFormOption,
} from "./form";

const UpdateInventoryBatchesForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useSuspenseQuery({
    queryKey: ["inventory-batch", searchQuery.id],
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.WarehouseManagementInventoryBatches)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm(UpdateInventoryBatchesFormOption(pocketbase, data));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <InventoryBatchesForm form={form as any} action="edit" />
        <DialogFooter>
          <form.SubmitButton>Update Inventory Batch</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInventoryBatchesForm;
