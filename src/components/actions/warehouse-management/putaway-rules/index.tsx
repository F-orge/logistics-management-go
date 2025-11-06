import React from "react";
import CreatePutawayRuleFormDialog from "./create";
import DeletePutawayRuleFormDialog from "./delete";
import UpdatePutawayRuleFormDialog from "./update";

export default [
	<CreatePutawayRuleFormDialog />,
	<UpdatePutawayRuleFormDialog />,
	<DeletePutawayRuleFormDialog />,
] satisfies React.ReactNode;
