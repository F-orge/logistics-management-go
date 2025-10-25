import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";

export const companyFormOption = formOptions({
  defaultValues: {},
});

export const CompanyForm = withForm({
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Title</FieldLegend>
        <FieldDescription>Descriptio</FieldDescription>
        <FieldGroup>{/* Forms */}</FieldGroup>
      </FieldSet>
    );
  },
});
