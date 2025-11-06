import React from "react";
import CreateGeofenceEventFormDialog from "./create";
import DeleteGeofenceEventFormDialog from "./delete";
import UpdateGeofenceEventFormDialog from "./update";

export default [
	<CreateGeofenceEventFormDialog />,
	<UpdateGeofenceEventFormDialog />,
	<DeleteGeofenceEventFormDialog />,
] satisfies React.ReactNode;
