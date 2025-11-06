import React from "react";
import CreateClientAccountFormDialog from "./create";
import DeleteClientAccountFormDialog from "./delete";
import UpdateClientAccountFormDialog from "./update";

export default [
	<CreateClientAccountFormDialog />,
	<UpdateClientAccountFormDialog />,
	<DeleteClientAccountFormDialog />,
] satisfies React.ReactNode;
