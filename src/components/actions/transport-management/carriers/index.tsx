import React from "react";
import CreateCarrierFormDialog from "./create";
import DeleteCarrierFormDialog from "./delete";
import UpdateCarrierFormDialog from "./update";

export default [
	<CreateCarrierFormDialog />,
	<UpdateCarrierFormDialog />,
	<DeleteCarrierFormDialog />,
] satisfies React.ReactNode;
