import React from "react";
import CreateNotificationFormDialog from "./create";
import DeleteNotificationFormDialog from "./delete";
import UpdateNotificationFormDialog from "./update";

export default [
	<CreateNotificationFormDialog />,
	<UpdateNotificationFormDialog />,
	<DeleteNotificationFormDialog />,
] satisfies React.ReactNode;
