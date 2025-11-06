import React from "react";
import CreateSurchargeFormDialog from "./create";
import DeleteSurchargeFormDialog from "./delete";
import UpdateSurchargeFormDialog from "./update";

export default [
	<CreateSurchargeFormDialog />,
	<UpdateSurchargeFormDialog />,
	<DeleteSurchargeFormDialog />,
] satisfies React.ReactNode;
