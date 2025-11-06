import React from "react";
import CreateContactFormDialog from "./create";
import DeleteContactFormDialog from "./delete";
import UpdateContactFormDialog from "./update";

export default [
	<CreateContactFormDialog />,
	<UpdateContactFormDialog />,
	<DeleteContactFormDialog />,
] satisfies React.ReactNode;
