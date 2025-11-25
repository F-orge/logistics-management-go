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
  InventoryAdjustmentForm,
  UpdateInventoryAdjustmentFormOption,
} from "./form";

const UpdateInventoryAdjustmentForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useSuspenseQuery({
    queryKey: ["inventory-adjustment", searchQuery.id],
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.WarehouseManagementInventoryAdjustment)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm(
    UpdateInventoryAdjustmentFormOption(pocketbase, data)
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <InventoryAdjustmentForm form={form as any} action="edit" />
        <DialogFooter>
          <form.SubmitButton>Update Inventory Adjustment</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInventoryAdjustmentForm;
