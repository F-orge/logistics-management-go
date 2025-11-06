import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

const DriverLocationControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "createDriverLocation" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default DriverLocationControls;
