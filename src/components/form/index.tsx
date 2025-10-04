import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import CheckBoxField from '@/components/ui/checkbox-field';
import { DateField } from '@/components/ui/date-field';
import { SelectField } from '@/components/ui/select-field';
import { TextField } from '@/components/ui/text-field';

export const SubmitButton = ({ ...props }: React.ComponentProps<'button'>) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit" {...props} />
      )}
    </form.Subscribe>
  );
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, SelectField, DateField, CheckBoxField },
  formComponents: { SubmitButton },
});
