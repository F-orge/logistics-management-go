import React from "react";
import CreateInteractionFormDialog from "./create";
import DeleteInteractionFormDialog from "./delete";
import UpdateInteractionFormDialog from "./update";

export default [
	<CreateInteractionFormDialog />,
	<UpdateInteractionFormDialog />,
	<DeleteInteractionFormDialog />,
] satisfies React.ReactNode;
