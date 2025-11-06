import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

const ProofOfDeliveryControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "createProofOfDelivery" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default ProofOfDeliveryControls;
