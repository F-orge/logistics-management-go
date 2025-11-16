import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { fieldRegistry } from "@/components/ui/autoform-tanstack/types";
import { Collections } from "@/lib/pb.types";
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations/opportunity-products";

const CreateOpportunityProductsFormSchema = z.object({
  opportunity: OpportunityProductsSchema.shape.opportunity.register(
    fieldRegistry,
    {
      id: "crm-opportunity-products-opportunity-create",
      type: "field",
      label: "Opportunity",
      description: "Select the opportunity (optional)",
      inputType: "text",
    }
  ),
  product: OpportunityProductsSchema.shape.product.register(fieldRegistry, {
    id: "crm-opportunity-products-product-create",
    type: "field",
    label: "Product",
    description: "Select the product (optional)",
    inputType: "text",
  }),
  quantity: OpportunityProductsSchema.shape.quantity.register(fieldRegistry, {
    id: "crm-opportunity-products-quantity-create",
    type: "field",
    label: "Quantity",
    description: "Enter the quantity",
    inputType: "number",
  }),
  priceSnapshot: OpportunityProductsSchema.shape.priceSnapshot.register(
    fieldRegistry,
    {
      id: "crm-opportunity-products-priceSnapshot-create",
      type: "field",
      label: "Price Snapshot",
      description: "Enter the price snapshot (optional)",
      inputType: "number",
    }
  ),
});

const UpdateOpportunityProductsFormSchema = z.object({
  opportunity: OpportunityProductsSchema.shape.opportunity
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-opportunity-update",
      type: "field",
      label: "Opportunity",
      description: "Select the opportunity (optional)",
      inputType: "text",
    }),
  product: OpportunityProductsSchema.shape.product
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-product-update",
      type: "field",
      label: "Product",
      description: "Select the product (optional)",
      inputType: "text",
    }),
  quantity: OpportunityProductsSchema.shape.quantity
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-quantity-update",
      type: "field",
      label: "Quantity",
      description: "Enter the quantity",
      inputType: "number",
    }),
  priceSnapshot: OpportunityProductsSchema.shape.priceSnapshot
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-priceSnapshot-update",
      type: "field",
      label: "Price Snapshot",
      description: "Enter the price snapshot (optional)",
      inputType: "number",
    }),
});

export const OpportunityProductsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["opportunity-productss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsOpportunityProducts)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateOpportunityProductsFormSchema>
        title="Create OpportunityProducts"
        description="Fill in the details to create a new opportunity-products."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsOpportunityProducts)
              .create(data);
            toast.success("OpportunityProducts created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create opportunity-products: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateOpportunityProductsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateOpportunityProductsFormSchema>
        title="Update OpportunityProducts"
        description="Update the opportunity-products details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsOpportunityProducts)
              .update(searchQuery.id!, data);
            toast.success("OpportunityProducts updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update opportunity-products: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateOpportunityProductsFormSchema}
        defaultValues={data as any}
      />
    );
  }

  if (searchQuery.action === "delete" && data) {
    return (
      <AlertDialog
        open={searchQuery.action === "delete"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete OpportunityProducts</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this opportunity-products? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(
                      Collections.CustomerRelationsOpportunityProducts
                    )
                    .delete(searchQuery.id!);
                  toast.success("OpportunityProducts deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete opportunity-products: ${error.message} (${error.status})`
                    );
                  }
                } finally {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      action: undefined,
                      id: undefined,
                    }),
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default OpportunityProductsActions;
