import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@marahuyo/react-ui/ui/avatar';
import { Link } from '@tanstack/react-router';
import { useUserRecord } from '../../hooks/userInfo';

const UserProfile = () => {
  const { data } = useUserRecord();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-2.5 border-b pb-4">
        <Avatar className="size-15">
          <AvatarImage
            src={`/api/files/_pb_${data?.collectionName}_auth_/${data?.id}/${data?.avatar}`}
          />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-2xl">{data?.name}</h4>
          <span className="text-xs text-muted-foreground">{data?.email}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <span className="text-muted-foreground text-xs">Address:</span>
        <div
          className="text-xs"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: data?.address || '' }}
        />
        <span className="text-muted-foreground text-xs">Role:</span>
        <span className="text-xs">{data?.role}</span>
        <span className="text-muted-foreground text-xs">Phone:</span>
        <span className="text-xs">{data?.phone}</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <span className="text-muted-foreground text-xs">Department:</span>
        <Link
          className="text-sm text-primary hover:underline"
          to="/dashboard/departments/$department_id"
          params={{ department_id: data?.expand.department?.id || '' }}
        >
          <div>
            {data?.expand.department?.name || 'No Information Avaiable'}
          </div>
        </Link>
        <span className="text-muted-foreground text-xs">Company:</span>
        <Link
          disabled={data?.expand.company === undefined}
          className="text-sm text-primary hover:underline"
          to="/dashboard/companies/$company_id"
          params={{ company_id: data?.expand.company?.id || '' }}
        >
          <div>{data?.expand.company?.name || 'No Information Avaiable'}</div>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
