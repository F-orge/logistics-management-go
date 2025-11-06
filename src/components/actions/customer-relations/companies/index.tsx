import React from "react";
import CreateCompanyFormDialog from "./create";
import DeleteCompanyFormDialog from "./delete";
import UpdateCompanyFormDialog from "./update";

export default [
	<CreateCompanyFormDialog />,
	<UpdateCompanyFormDialog />,
	<DeleteCompanyFormDialog />,
] satisfies React.ReactNode;
