import React from "react";
import CreateDriverScheduleFormDialog from "./create";
import DeleteDriverScheduleFormDialog from "./delete";
import UpdateDriverScheduleFormDialog from "./update";

export default [
	<CreateDriverScheduleFormDialog />,
	<UpdateDriverScheduleFormDialog />,
	<DeleteDriverScheduleFormDialog />,
] satisfies React.ReactNode;
