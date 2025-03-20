import { type Component } from "solid-js";
import { toast } from "solid-sonner";
import { Alert } from "~/components/ui/alert";
import { showToast } from "~/components/ui/toast";

const SignInPage: Component<{}> = (props) => {
  return (
    <div>
      <button
        onClick={() =>
          toast("Event Created", {
            description: "Testing",
          })}
      >
        click to notify
      </button>
    </div>
  );
};

export default SignInPage;
