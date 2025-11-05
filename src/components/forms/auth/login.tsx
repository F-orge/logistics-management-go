import React from "react";
import { withForm } from "@packages/ui/components/form/index";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from "@packages/ui";

const LoginForm = withForm({
  render: () => {
    return (
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldContent>
              <FieldLabel>Email</FieldLabel>
              <Input />
              <FieldDescription>Enter your email address</FieldDescription>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export default LoginForm;
