import React from "react";
import CreateCreditNoteFormDialog from "./create";
import DeleteCreditNoteFormDialog from "./delete";
import UpdateCreditNoteFormDialog from "./update";

export default [
	<CreateCreditNoteFormDialog />,
	<UpdateCreditNoteFormDialog />,
	<DeleteCreditNoteFormDialog />,
] satisfies React.ReactNode;
