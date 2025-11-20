import { formOptions } from "@tanstack/react-form";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { CampaignsSchema } from "@/pocketbase/schemas/customer-relations/campaigns";
import { CampaignForm, CreateSchema } from "./form";

const FormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as z.infer<ReturnType<typeof CreateSchema>>,
    validators: {
      onSubmitAsync: CreateSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      pocketbase: TypedPocketBase;
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await meta
          .pocketbase!.collection(Collections.CustomerRelationsCampaigns)
          .create(value);

        toast.success("Campaign created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create campaign: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

const CreateCampaignForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(FormOption(pocketbase));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <CampaignForm form={form as any} action="create" />
        <DialogFooter className="pt-4">
          <form.ClearButton
            type="reset"
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              form.reset();
            }}
          >
            Reset
          </form.ClearButton>
          <form.SubmitButton>Create Campaign</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateCampaignForm;
