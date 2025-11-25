import React from "react";
import { Button } from "../../button";
import { useFormContext } from "..";

const ClearButton = (props: React.ComponentProps<typeof Button>) => {
	const form = useFormContext();

	return (
		<Button
			variant="default"
			type="reset"
			disabled={form.state.isSubmitting}
			onClick={(event) => {
				event.preventDefault();
				form.reset();
			}}
			{...props}
		>
			{props.children ?? "Clear"}
		</Button>
	);
};

export default ClearButton;
