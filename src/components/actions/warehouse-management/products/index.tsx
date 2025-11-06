import React from "react";
import CreateProductFormDialog from "./create";
import DeleteProductFormDialog from "./delete";
import UpdateProductFormDialog from "./update";

export default [
	<CreateProductFormDialog />,
	<UpdateProductFormDialog />,
	<DeleteProductFormDialog />,
] satisfies React.ReactNode;
