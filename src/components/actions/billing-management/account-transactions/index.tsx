import React from "react";
import CreateAccountTransactionFormDialog from "./create";
import DeleteAccountTransactionFormDialog from "./delete";
import UpdateAccountTransactionFormDialog from "./update";

export default [
	<CreateAccountTransactionFormDialog />,
	<UpdateAccountTransactionFormDialog />,
	<DeleteAccountTransactionFormDialog />,
] satisfies React.ReactNode;
