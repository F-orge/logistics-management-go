import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

const InboundShipmentItemControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "createInboundShipmentItem" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default InboundShipmentItemControls;
