import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import React from "react";
import { QRCode } from "../kibo-ui/qr-code";
import { Dialog, DialogContent } from "../ui/dialog";
import { Item } from "../ui/item";

const QrDialog = () => {
  const params = useParams({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  return (
    <Dialog>
      <DialogContent>
        <Item className="h-24 w-24">
          <QRCode data={"test"} />
        </Item>
      </DialogContent>
    </Dialog>
  );
};

export default QrDialog;
