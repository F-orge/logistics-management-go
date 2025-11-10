import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Button } from "@/components/ui/button";

const PaymentControls = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

	return (
		<section className="col-span-full flex justify-end">
			<Button
				onClick={() =>
					navigate({ search: (prev) => ({ ...prev, action: "createPayment" }) })
				}
			>
				Create
			</Button>
		</section>
	);
};

export default PaymentControls;
