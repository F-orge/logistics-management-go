import React from "react";
import CreateCampaignFormDialog from "./create";
import DeleteCampaignFormDialog from "./delete";
import UpdateCampaignFormDialog from "./update";

export default [
	<CreateCampaignFormDialog />,
	<UpdateCampaignFormDialog />,
	<DeleteCampaignFormDialog />,
] satisfies React.ReactNode;
