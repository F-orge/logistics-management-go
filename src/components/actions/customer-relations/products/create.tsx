import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { CreateProductsFormOption, ProductsForm } from "./form";

const CreateProductsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(CreateProductsFormOption(pocketbase));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate });
      }}
    >
      <form.AppForm>
        <ProductsForm form={form as any} action="create" />
        <DialogFooter>
          <form.SubmitButton>Create Product</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateProductsForm;
