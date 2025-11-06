import React from "react";
import CreateCarrierRateFormDialog from "./create";
import DeleteCarrierRateFormDialog from "./delete";
import UpdateCarrierRateFormDialog from "./update";

export default [
	<CreateCarrierRateFormDialog />,
	<UpdateCarrierRateFormDialog />,
	<DeleteCarrierRateFormDialog />,
] satisfies React.ReactNode;
