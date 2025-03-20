import { Info } from "lucide-solid";
import { type Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import Divider from "~/components/ui/divider";
import { Label } from "~/components/ui/label";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const RegisterPage: Component<{}> = (props) => {
  return (
    <div class="h-full flex flex-col items-center justify-center overflow-y-auto">
      <form action="" class="flex flex-col gap-5 w-1/2">
        <div>
          <h1 class="text-3xl pb-1">Set up your account</h1>
          <p class="text-sm text-muted-foreground">
            Build digital products with Preline.
          </p>
        </div>
        <Button class="w-full">Sign in with Google</Button>
        <Divider>OR</Divider>
        <TextField class="grid w-full items-center gap-1.5">
          <TextFieldLabel for="name">Full name</TextFieldLabel>
          <TextFieldInput
            type="text"
            name="name"
            id="name"
            placeholder="Ex. Juan Dela Cruz"
          />
        </TextField>
        <TextField class="grid w-full items-center gap-1.5">
          <TextFieldLabel for="email">Email</TextFieldLabel>
          <TextFieldInput
            type="email"
            name="email"
            id="email"
            placeholder="abc@email.com"
          />
        </TextField>
        <div class="space-y-2.5">
          <TextField class="grid w-full items-center gap-1.5">
            <TextFieldLabel for="password">Password</TextFieldLabel>
            <TextFieldInput
              type="password"
              name="password"
              id="password"
              placeholder="********"
            />
          </TextField>
          <TextField class="grid w-full items-center gap-1.5">
            <TextFieldInput
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="********"
            />
          </TextField>
        </div>
        <div class="flex items-center gap-1.5">
          <Checkbox id="terms1" />
          <Label for="terms1-input">Accept terms and conditions</Label>
          <Tooltip>
            <TooltipTrigger as="a" href="/terms-and-services">
              <Info class="text-muted" size={12} />
            </TooltipTrigger>
            <TooltipContent>
              <p class="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Button>Sign Up</Button>
        <div class="text-sm">
          <span class="text-muted-foreground">
            Already have an account? {"  "}
          </span>
          <Button
            variant={"link"}
            as="a"
            href="/signin"
            class="p-0 text-muted-foreground text-sm justify-start underline"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
