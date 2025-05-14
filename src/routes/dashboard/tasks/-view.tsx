import React from 'react';
import { useTask } from '../../../hooks/taskInfo';
import { Sheet, SheetContent } from '@marahuyo/react-ui/ui/sheet';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';

import { Ellipsis, ExternalLink } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const ViewTask = ({
  id,
}: {
  id: string;
}) => {
  const task = useTask(id);

  return (
    <div className="grid grid-cols-3 h-full">
      <div className="flex flex-col gap-2.5 p-4 col-span-2">
        <div className="text-accent-foreground flex items-center justify-between gap-2.5 border-b border-border pb-1.5 text-xs">
          <div className="flex flex-row gap-2.5">
            <span>
              STATUS: <Badge variant={'secondary'}>{task.data?.status}</Badge>
            </span>
            <span>
              PRIORITY: <Badge variant={'outline'}>{task.data?.priority}</Badge>
            </span>
            <span>
              DUE DATE:{' '}
              <Badge variant={'outline'}>
                {task.data?.due_date || 'No Deadine'}
              </Badge>
            </span>
            {task.data?.tags && (
              <span>
                TAGS: <Badge variant={'outline'}>{task.data?.tags}</Badge>
              </span>
            )}
          </div>
          <Button size={'icon'} variant={'ghost'}>
            <Ellipsis />
          </Button>
        </div>
        <h4 className="text-3xl pb-4 border-b">{task.data?.title}</h4>
        <div
          className="text-muted-foreground border-b pb-4"
          /* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */
          dangerouslySetInnerHTML={{ __html: task.data?.description || '' }}
        />
        <div className="flex flex-col gap-2.5 border-b pb-4">
          <div className="flex flex-row justify-between">
            <span className="text-sm text-accent-foreground">Assigner:</span>
            <span className="text-sm">
              <Badge asChild variant={'outline'}>
                <Link
                  to="/dashboard/users/$user_id"
                  params={{ user_id: task.data?.expand.assigner.id || '' }}
                >
                  <ExternalLink />
                  {task.data?.expand.assigner.name}
                </Link>
              </Badge>
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-sm text-accent-foreground">Assignees:</span>
            <div className="text-sm flex flex-wrap gap-2.5">
              {task.data?.expand.assignees.map((user) => (
                <Badge asChild variant={'outline'} key={user.name}>
                  <Link
                    to="/dashboard/users/$user_id"
                    params={{ user_id: user.id }}
                  >
                    <ExternalLink />
                    {user.name}
                  </Link>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-sm">Related Order #</span>
            {task.data?.expand.order_ref ? (
              <Badge asChild variant={'outline'}>
                <Link
                  to="/dashboard/orders/$order_id_custom"
                  params={{ order_id_custom: task.data.expand.order_ref.id }}
                >
                  <ExternalLink />
                  {task.data.expand.order_ref.id}
                </Link>
              </Badge>
            ) : (
              <Badge variant={'outline'}>Not Available</Badge>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-sm">Related Shipment #</span>
            {task.data?.expand.related_shipment ? (
              <Badge asChild variant={'outline'}>
                <Link
                  to="/dashboard/shipments/$tracking_number"
                  params={{
                    tracking_number:
                      task.data.expand.related_shipment.tracking_number ||
                      task.data.expand.related_shipment.id,
                  }}
                >
                  <ExternalLink />
                  {task.data.expand.related_shipment.id}
                </Link>
              </Badge>
            ) : (
              <Badge variant={'outline'}>Not Available</Badge>
            )}
          </div>
        </div>
        <div>
          <h4>Attachments</h4>
        </div>
        <div className="grid grid-col-3 gap-2.5">
          {task.data?.attachments.map((file) => (
            <Badge asChild key={file} variant={'secondary'}>
              <a
                target="_blank"
                rel="noreferrer"
                href={`/api/files/${task.data.collectionName}/${task.data.id}/${file}`}
              >
                <ExternalLink />
                {file}
              </a>
            </Badge>
          ))}
        </div>
      </div>
      <div className="bg-secondary p-4">Chats</div>
    </div>
  );
};

export default ViewTask;
