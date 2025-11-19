import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const CarrierControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full space-y-4">
      <div className="flex justify-end gap-4">
        <ButtonGroup>
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, action: "create" }) })
            }
          >
            Create
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
};

export default CarrierControls;
