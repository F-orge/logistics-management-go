import React from 'react';
import { withForm } from '@/components/ui/form';
import FormDialog from '@/components/ui/form-dialog';

const EditTextDialog = withForm({
  props: {} as { value: string; name: string; label?: React.ReactNode },
  render: function ({ form, value, name, label }) {
    return (
      <form.AppForm>
        <FormDialog
          footer={
            <>
              <form.SubmitButton>Save</form.SubmitButton>
            </>
          }
        >
          <form.AppField name={name}>
            {(field) => <field.TextField label={label} />}
          </form.AppField>
        </FormDialog>
      </form.AppForm>
    );
  },
});

export default EditTextDialog;
