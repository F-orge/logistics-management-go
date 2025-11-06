import React from "react";
import CreateOpportunityFormDialog from "./create";
import DeleteOpportunityFormDialog from "./delete";
import UpdateOpportunityFormDialog from "./update";

export default [
	<CreateOpportunityFormDialog />,
	<UpdateOpportunityFormDialog />,
	<DeleteOpportunityFormDialog />,
] satisfies React.ReactNode;
