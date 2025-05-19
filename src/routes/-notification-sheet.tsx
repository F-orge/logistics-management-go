import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@marahuyo/react-ui/ui/sheet';

import { Bell, ExternalLink } from 'lucide-react';
import { Button } from '@marahuyo/react-ui/ui/button';
import { useQuery } from '@tanstack/react-query';
import { pb } from '../../lib/pocketbase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@marahuyo/react-ui/ui/card';
import { cn } from '@marahuyo/react-ui/lib/utils';

const NotificationSideSheet = () => {
  const notifications = useQuery({
    queryKey: ['notifications'],
    queryFn: () => pb.collection('notifications').getFullList(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-fit justify-self-end">
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto no-scrollbar">
        <SheetHeader className="border-b">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div>
          {notifications.data?.map((notif) => (
            <Card
              onClick={() => {
                if (notif.link)
                  window.open(notif.link, '_blank', 'noopener,noreferrer');
              }}
              key={notif.title}
              className={cn(
                'rounded-none border-none bg-background hover:bg-secondary transition-all',
                notif.link && 'cursor-pointer',
              )}
            >
              <CardContent className="flex flex-col gap-1.5">
                <CardTitle>{notif.title}</CardTitle>
                <CardDescription
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                  dangerouslySetInnerHTML={{ __html: notif.message }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSideSheet;
