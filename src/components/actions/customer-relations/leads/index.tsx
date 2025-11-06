import React from "react";
import CreateLeadFormDialog from "./create";
import DeleteLeadFormDialog from "./delete";
import UpdateLeadFormDialog from "./update";

export default [
	<CreateLeadFormDialog />,
	<UpdateLeadFormDialog />,
	<DeleteLeadFormDialog />,
] satisfies React.ReactNode;
