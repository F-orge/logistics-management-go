import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { CampaignForm, UpdateSchema } from "./form";

const FormOption = (pocketbase: TypedPocketBase, id: string) =>
  formOptions({
    defaultValues: {} as z.infer<ReturnType<typeof UpdateSchema>>,
    validators: {
      onSubmitAsync: UpdateSchema(pocketbase, id),
    },
    onSubmitMeta: {} as {
      id: string;
      pocketbase: TypedPocketBase;
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      console.log("Submitting update with value:", value);
      try {
        await meta
          .pocketbase!.collection(Collections.CustomerRelationsCampaigns)
          .update(meta.id, value);

        toast.success("Campaign updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update campaign: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

const UpdateCampaignForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase, queryClient } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useSuspenseQuery(
    {
      queryKey: ["campaign", searchQuery.id],
      queryFn: async () => {
        return await pocketbase
          .collection(Collections.CustomerRelationsCampaigns)
          .getOne(searchQuery.id!);
      },
    },
    queryClient
  );

  const form = useAppForm({
    ...FormOption(pocketbase, searchQuery.id!),
    defaultValues: {
      ...data,
      startDate: data?.startDate ? new Date(data.startDate) : undefined,
      endDate: data?.endDate ? new Date(data.endDate) : undefined,
    } as z.infer<ReturnType<typeof UpdateSchema>>,
  });

  if (!data) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <CampaignForm form={form as any} action="edit" />
        <DialogFooter className="pt-4">
          <form.ClearButton
            variant={"outline"}
            type="reset"
            onClick={(e) => {
              e.preventDefault();
              form.reset();
            }}
          >
            Reset to original
          </form.ClearButton>
          <form.SubmitButton>Update Campaign</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateCampaignForm;
