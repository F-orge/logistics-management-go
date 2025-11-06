import React from "react";
import CreateInvoiceItemFormDialog from "./create";
import DeleteInvoiceItemFormDialog from "./delete";
import UpdateInvoiceItemFormDialog from "./update";

export default [
	<CreateInvoiceItemFormDialog />,
	<UpdateInvoiceItemFormDialog />,
	<DeleteInvoiceItemFormDialog />,
] satisfies React.ReactNode;
