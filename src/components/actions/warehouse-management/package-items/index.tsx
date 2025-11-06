import React from "react";
import CreatePackageItemFormDialog from "./create";
import DeletePackageItemFormDialog from "./delete";
import UpdatePackageItemFormDialog from "./update";

export default [
	<CreatePackageItemFormDialog />,
	<UpdatePackageItemFormDialog />,
	<DeletePackageItemFormDialog />,
] satisfies React.ReactNode;
