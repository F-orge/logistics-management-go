import { type Component } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  OTPField,
  OTPFieldGroup,
  OTPFieldInput,
  OTPFieldSlot,
} from "~/components/ui/otp-field";

const VerificationPage: Component<{}> = (props) => {
  return (
    <div class="h-full flex flex-col items-center justify-center">
      <form action="" class="flex flex-col gap-5 w-1/2" method="post">
        <div>
          <h1 class="text-3xl pb-1">2-Step Verification</h1>
          <p class="text-sm text-muted-foreground">
            We sent a verification code to your email. Enter the code from the
            email in the field below.
          </p>
        </div>
        <OTPField maxLength={6}>
          <OTPFieldInput />
          <OTPFieldGroup>
            <OTPFieldSlot index={0} />
            <OTPFieldSlot index={1} />
            <OTPFieldSlot index={2} />
            <OTPFieldSlot index={3} />
            <OTPFieldSlot index={4} />
            <OTPFieldSlot index={5} />
          </OTPFieldGroup>
        </OTPField>
        <Button>Verify my account</Button>
        <div class="text-sm">
          <span class="text-muted-foreground">
            Didn't receive an email? {"  "}
          </span>
          <Button
            as="a"
            href="/reset"
            variant={"link"}
            class="p-0 text-muted-foreground text-sm justify-start underline"
          >
            Resend
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationPage;
