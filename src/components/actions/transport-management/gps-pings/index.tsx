import React from "react";
import CreateGpsPingFormDialog from "./create";
import DeleteGpsPingFormDialog from "./delete";
import UpdateGpsPingFormDialog from "./update";

export default [
	<CreateGpsPingFormDialog />,
	<UpdateGpsPingFormDialog />,
	<DeleteGpsPingFormDialog />,
] satisfies React.ReactNode;
