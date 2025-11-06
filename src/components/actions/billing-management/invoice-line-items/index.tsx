import React from "react";
import CreateInvoiceLineItemFormDialog from "./create";
import DeleteInvoiceLineItemFormDialog from "./delete";
import UpdateInvoiceLineItemFormDialog from "./update";

export default [
	<CreateInvoiceLineItemFormDialog />,
	<UpdateInvoiceLineItemFormDialog />,
	<DeleteInvoiceLineItemFormDialog />,
] satisfies React.ReactNode;
