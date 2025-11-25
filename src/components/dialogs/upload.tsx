import {
  useNavigate,
  useParams,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import React from "react";

const UploadAttachments = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const pathParams = useParams({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  return <div>UploadAttachments</div>;
};

export default UploadAttachments;
