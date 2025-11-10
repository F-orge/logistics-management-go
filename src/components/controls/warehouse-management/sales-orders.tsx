import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Button } from "@/components/ui/button";

const SalesOrderControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

	return (
		<section className="col-span-full flex justify-end">
			<Button
				onClick={() =>
					navigate({
						search: (prev) => ({ ...prev, action: "createSalesOrder" }),
					})
				}
			>
				Create
			</Button>
		</section>
	);
};

export default SalesOrderControls;
