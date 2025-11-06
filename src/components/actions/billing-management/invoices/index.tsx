import React from "react";
import CreateInvoiceFormDialog from "./create";
import DeleteInvoiceFormDialog from "./delete";
import UpdateInvoiceFormDialog from "./update";

export default [
	<CreateInvoiceFormDialog />,
	<UpdateInvoiceFormDialog />,
	<DeleteInvoiceFormDialog />,
] satisfies React.ReactNode;
