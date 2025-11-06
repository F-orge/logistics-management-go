import React from "react";
import CreateOpportunityProductFormDialog from "./create";
import DeleteOpportunityProductFormDialog from "./delete";
import UpdateOpportunityProductFormDialog from "./update";

export default [
	<CreateOpportunityProductFormDialog />,
	<UpdateOpportunityProductFormDialog />,
	<DeleteOpportunityProductFormDialog />,
] satisfies React.ReactNode;
