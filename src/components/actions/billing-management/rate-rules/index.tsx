import React from "react";
import CreateRateRuleFormDialog from "./create";
import DeleteRateRuleFormDialog from "./delete";
import UpdateRateRuleFormDialog from "./update";

export default [
	<CreateRateRuleFormDialog />,
	<UpdateRateRuleFormDialog />,
	<DeleteRateRuleFormDialog />,
] satisfies React.ReactNode;
