import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppForm, withForm } from "@/components/ui/form";
import { pb, type UpdateRecord } from "@/pocketbase";
import { type CrmProductsRecord } from "@/pocketbase/types";

export const EditProductForm = withForm({
  defaultValues: {} as UpdateRecord<CrmProductsRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Product Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="sku">
          {(field) => (
            <field.TextField
              label="SKU"
              placeholder="PROD-001"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="price">
          {(field) => (
            <field.TextField
              label="Price"
              min={0}
              step={0.01}
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField
              label="Description"
              className="col-span-full"
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const EditProductDialog = () => {
  const route = getRouteApi("/dashboard/crm/products/");

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: product } = useSuspenseQuery({
    queryKey: ["products", searchParams.id],
    queryFn: () => pb.collection("crm_products").getOne(searchParams.id ?? ""),
  });

  const form = useAppForm({
    defaultValues: product as UpdateRecord<CrmProductsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection("crm_products").update(searchParams.id ?? "", value),
          {
            success: "Product Updated Successfully",
            error: "An Error Occurred when updating the record",
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, editProduct: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editProduct}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editProduct: undefined,
            id: undefined,
          }),
        })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product Information</DialogTitle>
          <DialogDescription>
            Change the information for: {product.name}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <EditProductForm form={form} />
            <form.SubmitButton>Edit Product</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
