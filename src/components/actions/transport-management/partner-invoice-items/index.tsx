import React from "react";
import CreatePartnerInvoiceItemFormDialog from "./create";
import DeletePartnerInvoiceItemFormDialog from "./delete";
import UpdatePartnerInvoiceItemFormDialog from "./update";

export default [
	<CreatePartnerInvoiceItemFormDialog />,
	<UpdatePartnerInvoiceItemFormDialog />,
	<DeletePartnerInvoiceItemFormDialog />,
] satisfies React.ReactNode;
