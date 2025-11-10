import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  UsersResponse,
  NotificationsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { NotificationsNotificationsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = NotificationsNotificationsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.Notifications>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.Notifications)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Notifications created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: NotificationsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.Notifications>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.Notifications)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Notifications updated successfully",
        })
        .unwrap();
    },
  });

export const NotificationsForm = withForm({
  defaultValues: {} as Create<Collections.Notifications> | Update<Collections.Notifications>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* User */}
          <FieldGroup>
            <FieldLegend>User</FieldLegend>
            <FieldDescription>
              Manage user information
            </FieldDescription>

            <form.AppField name="user">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="user"
                  label="User"
                  description="Recipient user"
                  displayField="username"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Message */}
          <FieldGroup>
            <FieldLegend>Message</FieldLegend>
            <FieldDescription>
              Manage message information
            </FieldDescription>

            <form.AppField name="message">
              {(field) => (
                <field.TextareaField
                  label="Message"
                  description="Notification message"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Action */}
          <FieldGroup>
            <FieldLegend>Action</FieldLegend>
            <FieldDescription>
              Manage action information
            </FieldDescription>

            <form.AppField name="link">
              {(field) => (
                <field.TextField
                  label="Link"
                  description="Optional link to related resource"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Status */}
          <FieldGroup>
            <FieldLegend>Status</FieldLegend>
            <FieldDescription>
              Manage status information
            </FieldDescription>

            <form.AppField name="isRead">
              {(field) => (
                <field.TextField
                  label="Is Read"
                  description="Whether notification has been read"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <NotificationsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["notifications", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.Notifications)
        .getOne<NotificationsRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <NotificationsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
