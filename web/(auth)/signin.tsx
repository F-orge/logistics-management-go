import { type Component } from "solid-js";
import { Button } from "~/components/ui/button";
import Divider from "~/components/ui/divider";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

const SignInPage: Component<{}> = (props) => {
  return (
    <div class="h-full flex flex-col items-center justify-center">
      <form
        class="flex flex-col gap-5 w-1/2"
        action=""
      >
        <div>
          <h1 class="text-3xl pb-1">Log in to your account</h1>
          <span class="text-muted-foreground text-sm">
            Build digital products with Preline.
          </span>
        </div>
        <Button class="w-full">Sign in with Google</Button>
        <Divider>OR</Divider>
        <TextField class="grid w-full items-center gap-1.5">
          <TextFieldLabel for="email">Email</TextFieldLabel>
          <TextFieldInput type="email" name="email" id="email" />
        </TextField>
        <TextField class="grid w-full items-center gap-1.5">
          <div class="flex flex-row items-center justify-between">
            <TextFieldLabel for="password">Password</TextFieldLabel>
            <Button
              class="text-muted-foreground underline p-0"
              as="a"
              href="/reset"
              variant={"link"}
            >
              Forgot password?
            </Button>
          </div>
          <TextFieldInput
            type="password"
            name="password"
            id="password"
            placeholder="*********"
          />
        </TextField>
        <Button>Sign In</Button>
        <div class="text-sm">
          <span class="text-muted-foreground">
            Don't have an account yet? {"  "}
          </span>
          <Button
            as="a"
            href="/register"
            variant={"link"}
            class="p-0 text-muted-foreground text-sm justify-start underline"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
