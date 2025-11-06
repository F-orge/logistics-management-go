import React from "react";
import CreateRateCardFormDialog from "./create";
import DeleteRateCardFormDialog from "./delete";
import UpdateRateCardFormDialog from "./update";

export default [
	<CreateRateCardFormDialog />,
	<UpdateRateCardFormDialog />,
	<DeleteRateCardFormDialog />,
] satisfies React.ReactNode;
