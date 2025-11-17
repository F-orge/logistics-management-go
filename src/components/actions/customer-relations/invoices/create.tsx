import { formOptions } from "@tanstack/react-form";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
  fieldRegistry,
  fieldSetRegistry,
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
  Collections,
  Create,
  CustomerRelationsOpportunitiesRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  InvoiceItemsSchema,
  InvoicesSchema,
} from "@/pocketbase/schemas/customer-relations";

export const CreateItemSchema = z
  .object({
    product: InvoiceItemsSchema.shape.product.register(fieldRegistry, {
      id: "customer-relations-invoice-items-sub-product-create",
      type: "field",
      label: "Product",
      description: "Enter a product",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsProducts,
        displayField: "name",
        relationshipName: "product",
      },
    }),
    quantity: InvoiceItemsSchema.shape.quantity.register(fieldRegistry, {
      id: "customer-relations-invoice-items-sub-quantity-create",
      type: "field",
      label: "Quantity",
      description: "Enter a quantity",
      inputType: "number",
    }),
  })
  .register(fieldSetRegistry, {
    legend: "Invoice Items",
    description: "Add items to the invoice",
  });

export const CreateSchema = z.object({
  invoiceNumber: InvoicesSchema.shape.invoiceNumber.register(fieldRegistry, {
    id: "customer-relations-invoices-invoiceNumber-create",
    type: "field",
    label: "InvoiceNumber",
    description: "Invoice number is required",
    inputType: "text",
  }),
  opportunity: InvoicesSchema.shape.opportunity.register(fieldRegistry, {
    id: "customer-relations-invoices-opportunity-create",
    type: "field",
    label: "Opportunity",
    description: "Enter an opportunity",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsOpportunities,
      displayField: "name",
      relationshipName: "opportunity",
    },
  }),
  status: InvoicesSchema.shape.status.register(fieldRegistry, {
    id: "customer-relations-invoices-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  dueDate: InvoicesSchema.shape.dueDate.register(fieldRegistry, {
    id: "customer-relations-invoices-dueDate-create",
    type: "field",
    label: "DueDate",
    description: "Enter a duedate",
    inputType: "date",
  }),
  paymentMethod: InvoicesSchema.shape.paymentMethod.register(fieldRegistry, {
    id: "customer-relations-invoices-paymentMethod-create",
    type: "field",
    label: "PaymentMethod",
    description: "Enter a paymentmethod",
    inputType: "select",
  }),
  items: CreateItemSchema.array(),
});

const FormOption = formOptions({
  defaultValues: {
    status: "draft",
  } as Partial<z.infer<typeof CreateSchema>> & {
    items: z.infer<typeof CreateItemSchema>[];
  },
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      const { items, ...rest } = value;

      const products = await meta.pocketbase
        .collection(Collections.CustomerRelationsProducts)
        .getList(1, items.length, {
          filter: items.map((item) => `id = '${item.product}'`).join(" || "),
        });

      const sumPrices = items.reduce((acc, item) => {
        const product = products.items.find((p) => p.id === item.product);
        return acc + (product ? product.price * item.quantity : 0);
      }, 0);

      const invoicePayload = {
        ...rest,
        total: sumPrices,
        issueDate: new Date().toISOString(),
      };

      let invoiceId: string = "";

      try {
        // send invoice first
        const invoice = await meta
          .pocketbase!.collection(Collections.CustomerRelationsInvoices)
          .create(invoicePayload);

        invoiceId = invoice.id;

        const batch = meta.pocketbase.createBatch();

        for (const item of items) {
          const product = products.items.find((p) => p.id === item.product);

          if (!product) continue;

          const invoiceItemPayload: Create<Collections.CustomerRelationsInvoiceItems> =
            {
              invoice: invoice.id,
              product: item.product,
              quantity: item.quantity,
              price: product.price * item.quantity,
            };

          batch
            .collection(Collections.CustomerRelationsInvoiceItems)
            .create(invoiceItemPayload);
        }

        await batch.send();

        toast.success("Invoices created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          if (invoiceId) {
            await meta
              .pocketbase!.collection(Collections.CustomerRelationsInvoices)
              .delete(invoiceId);
          }

          toast.error(
            `Failed to create invoice items: ${error.message} (${error.status})`
          );
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create invoices: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateInvoiceForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(CreateSchema)}
          separator={true}
        />

        <DialogFooter>
          <form.SubmitButton>Create Invoice</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateInvoiceForm;
