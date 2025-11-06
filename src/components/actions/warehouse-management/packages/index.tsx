import React from "react";
import CreatePackageFormDialog from "./create";
import DeletePackageFormDialog from "./delete";
import UpdatePackageFormDialog from "./update";

export default [
	<CreatePackageFormDialog />,
	<UpdatePackageFormDialog />,
	<DeletePackageFormDialog />,
] satisfies React.ReactNode;
