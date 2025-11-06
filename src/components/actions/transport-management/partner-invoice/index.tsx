import React from "react";
import CreatePartnerInvoiceFormDialog from "./create";
import DeletePartnerInvoiceFormDialog from "./delete";
import UpdatePartnerInvoiceFormDialog from "./update";

export default [
	<CreatePartnerInvoiceFormDialog />,
	<UpdatePartnerInvoiceFormDialog />,
	<DeletePartnerInvoiceFormDialog />,
] satisfies React.ReactNode;
