import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const CompanyControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "createCompany" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default CompanyControls;
