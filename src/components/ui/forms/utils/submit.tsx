import React from "react";
import { Button } from "../../button";
import { useFormContext } from "..";

const SubmitButton = (props: React.ComponentProps<typeof Button>) => {
	const form = useFormContext();

	return (
		<Button
			variant="default"
			type="submit"
			disabled={form.state.isSubmitting}
			className="mt-4"
			{...props}
		>
			{props.children ?? (form.state.isSubmitting ? "Submitting..." : "Submit")}
		</Button>
	);
};

export default SubmitButton;
