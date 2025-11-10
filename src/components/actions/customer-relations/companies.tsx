import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import FormDialog from "@/components/ui/autoform/components/helpers/FormDialog";
import { usePocketBaseClient } from "@/pocketbase";
import { CompanySchema } from "@/pocketbase/schemas/customer-relations/companies";

export const CreateCompany = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create Company"
      description="Fill in the details to create a new company."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={CompanySchema}
      onSubmit={(data) => {}}
    />
  );
};

export default [<CreateCompany key={"action-create"} />];
