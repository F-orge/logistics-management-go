import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

const PartnerInvoiceItemControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "createPartnerInvoiceItem" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default PartnerInvoiceItemControls;
