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
      <form action="" class="flex flex-col gap-5 w-1/2">
        <div>
          <h1 class="text-3xl pb-1">Reset your password</h1>
          <p class="text-muted-foreground text-sm">
            Enter the email address associated with your account. We’ll send you
            a link to reset your password.
          </p>
        </div>
        <TextField class="grid w-full items-center gap-1.5">
          <TextFieldLabel for="email">Email</TextFieldLabel>
          <TextFieldInput type="email" name="email" id="email" />
        </TextField>
        <Button>Send email</Button>
        <div class="text-sm">
          <span class="text-muted-foreground">
            You didn’t forget your password?
          </span>{" "}
          <Button
            as="a"
            href="/signin"
            variant={"link"}
            class="p-0 text-muted-foreground text-sm justify-start underline"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
