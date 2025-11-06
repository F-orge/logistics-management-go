import React from "react";
import CreateBinThresholdFormDialog from "./create";
import DeleteBinThresholdFormDialog from "./delete";
import UpdateBinThresholdFormDialog from "./update";

export default [
	<CreateBinThresholdFormDialog />,
	<UpdateBinThresholdFormDialog />,
	<DeleteBinThresholdFormDialog />,
] satisfies React.ReactNode;
