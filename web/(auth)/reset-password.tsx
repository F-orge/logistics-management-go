import { type Component } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

const ResetPasswordPage: Component<{}> = (props) => {
  return (
    <div class="h-full flex flex-col items-center justify-center">
      <form action="" class="flex flex-col gap-5 w-1/2" method="post">
        <div>
          <h1 class="text-3xl pb-1">Reset your password</h1>
          <p class="text-sm text-muted-foreground">Enter your new password</p>
        </div>
        <TextField class="grid w-full items-center gap-1.5">
          <TextFieldLabel for="password">New Password</TextFieldLabel>
          <TextFieldInput
            type="password"
            name="password"
            id="password"
            placeholder="********"
          />
        </TextField>
        <TextField class="grid w-full items-center gap-1.5">
          <TextFieldLabel for="password">Confirm Password</TextFieldLabel>
          <TextFieldInput
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="********"
          />
        </TextField>
        <Button>Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
