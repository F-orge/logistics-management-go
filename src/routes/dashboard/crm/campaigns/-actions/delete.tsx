import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { pb } from "@/pocketbase";

const DeleteCampaignDialog = () => {
  const route = getRouteApi("/dashboard/crm/campaigns/");

  const navigate = route.useNavigate();

  const searchParams = route.useSearch();

  return (
    <AlertDialog
      open={searchParams.deleteCampaign}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            deleteCampaign: undefined,
            id: undefined,
          }),
        })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            campaign and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteCampaign: undefined,
                  id: undefined,
                }),
              })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await toast
                .promise(
                  pb.collection("crm_campaigns").delete(searchParams.id ?? ""),
                  {
                    success: "Campaign deleted successfully",
                    error: "An error occurred when deleting campaign",
                  },
                )
                .unwrap();

              navigate({
                search: (prev) => ({
                  ...prev,
                  deleteCampaign: undefined,
                  id: undefined,
                }),
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCampaignDialog;
