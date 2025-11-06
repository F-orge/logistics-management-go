import React from "react";
import CreatePaymentFormDialog from "./create";
import DeletePaymentFormDialog from "./delete";
import UpdatePaymentFormDialog from "./update";

export default [
	<CreatePaymentFormDialog />,
	<UpdatePaymentFormDialog />,
	<DeletePaymentFormDialog />,
] satisfies React.ReactNode;
