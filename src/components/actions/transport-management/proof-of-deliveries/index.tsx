import React from "react";
import CreateProofOfDeliveryFormDialog from "./create";
import DeleteProofOfDeliveryFormDialog from "./delete";
import UpdateProofOfDeliveryFormDialog from "./update";

export default [
	<CreateProofOfDeliveryFormDialog />,
	<UpdateProofOfDeliveryFormDialog />,
	<DeleteProofOfDeliveryFormDialog />,
] satisfies React.ReactNode;
