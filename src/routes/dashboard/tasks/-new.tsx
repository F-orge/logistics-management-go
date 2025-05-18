import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';
import { Input } from '@marahuyo/react-ui/ui/input';
import { Label } from '@marahuyo/react-ui/ui/label';
import { Textarea } from '@marahuyo/react-ui/ui/textarea';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@marahuyo/react-ui/ui/select';
import {
  TasksPriorityOptions,
  TasksStatusOptions,
  TasksTagsOptions,
} from '../../../../lib/pocketbase.gen';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@marahuyo/react-ui/ui/popover';
import { Button } from '@marahuyo/react-ui/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@marahuyo/react-ui/ui/calendar';

const NewTask = () => {
  const { newTaskDialog } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <Dialog open={newTaskDialog}>
      <DialogContent
        className="!max-w-1/2 max-h-1/2 overflow-y-auto no-scrollbar"
        ref={(el) => {
          const closeBtn = el?.querySelector(
            'button > span.sr-only',
          )?.parentElement;

          closeBtn?.addEventListener('click', () =>
            navigate({
              search: (prev) => ({ ...prev, newTaskDialog: undefined }),
            }),
          );
        }}
      >
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Create new task</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5 col-span-4">
            <Label>Title</Label>
            <Input placeholder="Task #" />
          </div>
          <div className="flex flex-col gap-1.5 col-span-4">
            <Label>Description</Label>
            <Textarea placeholder="Description..." />
          </div>
          <div className="flex flex-col gap-1.5 col-span-1">
            <Label>Status</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Todo" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksStatusOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-1">
            <Label>Priority</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Low" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksPriorityOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Assignees</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Low" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksPriorityOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-1">
            <Label>Department</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Low" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksPriorityOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-1">
            <Label>Tags</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Low" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksTagsOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Due date</Label>
            <Popover>
              <PopoverTrigger className="w-full">
                <Button
                  variant={'outline'}
                  className="justify-between w-full text-muted-foreground"
                >
                  <span>Pick a deadline</span>
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-1.5 col-span-4">
            <Label>Order #</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Low" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksPriorityOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-4">
            <Label>Shipment #</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g Low" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TasksPriorityOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTask;
