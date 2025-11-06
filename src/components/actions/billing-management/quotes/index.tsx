import React from "react";
import CreateQuoteFormDialog from "./create";
import DeleteQuoteFormDialog from "./delete";
import UpdateQuoteFormDialog from "./update";

export default [
	<CreateQuoteFormDialog />,
	<UpdateQuoteFormDialog />,
	<DeleteQuoteFormDialog />,
] satisfies React.ReactNode;
