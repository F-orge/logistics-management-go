import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';
import { Sheet, SheetContent } from '@marahuyo/react-ui/ui/sheet';
import React from 'react';
import { useTask, useTaskMessages } from '../../../hooks/taskInfo';

import { Avatar, AvatarImage } from '@marahuyo/react-ui/ui/avatar';
import { Card, CardContent, CardFooter } from '@marahuyo/react-ui/ui/card';
import { Input } from '@marahuyo/react-ui/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@marahuyo/react-ui/ui/tooltip';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Ellipsis, ExternalLink, Files, Send } from 'lucide-react';
import { Route } from '.';
import { pb } from '../../../../lib/pocketbase';
import { TaskRepository } from '../../../queries/tasks';

const ViewTask = () => {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const task = useQuery({
    queryKey: ['task', id],
    queryFn: () => new TaskRepository(pb).getTask(id || ''),
  });

  const messages = useQuery({
    queryKey: ['taskMessages', id],
    queryFn: () => new TaskRepository(pb).getMessages(id || '', 1, 10),
  });

  return (
    <Sheet open={id !== undefined}>
      <SheetContent
        ref={(el) => {
          const closeBtn = Array.from(
            el?.querySelectorAll('button > span.sr-only') || [],
          ).find((span) => span.textContent?.trim() === 'Close')?.parentElement;

          const sheetOverlay = el?.parentElement?.querySelector(
            '[data-slot="sheet-overlay"]',
          );

          sheetOverlay?.addEventListener('click', () => {
            navigate({ search: (prev) => ({ ...prev, id: undefined }) });
          });

          closeBtn?.addEventListener('click', () => {
            navigate({ search: (prev) => ({ ...prev, id: undefined }) });
          });
        }}
        className="!max-w-3/4"
      >
        <div className="grid grid-cols-3 h-full">
          <div className="flex flex-col gap-2.5 p-4 col-span-2">
            <div className="text-accent-foreground flex items-center justify-between gap-2.5 border-b border-border pb-1.5 text-xs">
              <div className="flex flex-row gap-2.5">
                <span>
                  STATUS:{' '}
                  <Badge variant={'secondary'}>{task.data?.status}</Badge>
                </span>
                <span>
                  PRIORITY:{' '}
                  <Badge variant={'outline'}>{task.data?.priority}</Badge>
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
                <span className="text-sm text-accent-foreground">
                  Assigner:
                </span>
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
                <span className="text-sm text-accent-foreground">
                  Assignees:
                </span>
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
                <span className="text-sm text-accent-foreground">
                  Related Order #
                </span>
                {task.data?.expand.order_ref ? (
                  <Badge asChild variant={'outline'}>
                    <Link
                      to="/dashboard/orders/$order_id_custom"
                      params={{
                        order_id_custom: task.data.expand.order_ref.id,
                      }}
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
                <span className="text-sm text-accent-foreground">
                  Related Shipment #
                </span>
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
          <div className="bg-secondary p-4 flex flex-col justify-end items-end overflow-y-auto no-scrollbar">
            <div className="flex flex-col pb-4 gap-2.5 overflow-y-auto no-scrollbar">
              {messages.data?.items?.map((message) => (
                <div
                  key={message.content}
                  className="flex flex-row gap-2.5 items-end"
                >
                  <Link
                    to="/dashboard/users/$user_id"
                    params={{ user_id: message.expand.sender.id }}
                  >
                    <Tooltip>
                      <TooltipTrigger className="hover:cursor-pointer">
                        <Avatar>
                          <AvatarImage
                            src={`/api/files/_pb_users_auth_/${message.expand.sender.id}/${message.expand.sender.avatar}`}
                          />
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        {message.expand.sender.name}
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <div className="not:first:w-3/4">
                    <Link
                      to="/dashboard/users/$user_id"
                      params={{ user_id: message.expand.sender.id }}
                    >
                      <span className="text-xs">
                        {message.expand.sender.name}
                      </span>
                    </Link>
                    <Card className="p-0">
                      <CardContent className="p-2.5">
                        <div
                          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                          dangerouslySetInnerHTML={{ __html: message.content }}
                        />
                        {message.attachments.length !== 0 && (
                          <div className="border-t pt-2.5">
                            {message.attachments.map((file) => (
                              <Badge asChild key={file} variant={'outline'}>
                                <a
                                  href={`/api/files/${message.collectionName}/${message.id}/${file}`}
                                >
                                  <ExternalLink />
                                  {file.slice(0, 20)}
                                </a>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row w-full gap-2.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={'icon'} variant={'outline'}>
                    <Files />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload file</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={'icon'} variant={'outline'}>
                    <Ellipsis />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>More options</TooltipContent>
              </Tooltip>
              <Input className="w-full" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={'icon'} variant={'outline'}>
                    <Send />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewTask;
