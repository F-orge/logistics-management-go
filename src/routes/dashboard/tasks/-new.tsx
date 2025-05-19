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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@marahuyo/react-ui/ui/select';
import {
  TasksPriorityOptions,
  TasksRecord,
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
import { useAppForm } from '@marahuyo/react-ui/ui/tanstack-form';
import { format } from 'date-fns';
import { cn } from '@marahuyo/react-ui/lib/utils';

const NewTask = () => {
  const { newTaskDialog } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const form = useAppForm({
    defaultValues: {
      title: '',
      description: '',
      status: TasksStatusOptions.todo,
      priority: TasksPriorityOptions.medium,
      assignees: '',
      department: '',
      tags: '',
      due_date: new Date(),
      order_ref: '',
      shipment_ref: '',
    },
    onSubmit: ({ value }) => console.log(value),
  });

  return (
    <Dialog open={newTaskDialog}>
      <DialogContent
        className="!max-w-1/2 max-h-3/4 overflow-y-auto no-scrollbar"
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
        <form.AppForm>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="grid grid-cols-4 gap-5"
          >
            <form.AppField name="title">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-4">
                  <field.FormLabel>Title</field.FormLabel>
                  <field.FormControl>
                    <Input
                      placeholder="Task #"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormDescription>
                    The title of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-4">
                  <field.FormLabel>Description</field.FormLabel>
                  <field.FormControl>
                    <Textarea
                      placeholder="Task #"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-1">
                  <field.FormLabel>Status</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
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
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-1">
                  <field.FormLabel>Priority</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
                        <SelectValue placeholder="e.g Todo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(TasksPriorityOptions).map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="assignees">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-2">
                  <field.FormLabel>Assignees</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
                        <SelectValue placeholder="e.g Todo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Assign employee/s</SelectLabel>
                          <SelectLabel>
                            <Input placeholder="search employees" />
                          </SelectLabel>
                          {Object.keys(TasksPriorityOptions).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="tags">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-1">
                  <field.FormLabel>Tags</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
                        <SelectValue placeholder="e.g Todo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(TasksTagsOptions).map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="due_date">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-1">
                  <field.FormLabel>Due date</field.FormLabel>
                  <field.FormControl>
                    <Popover>
                      <PopoverTrigger className="w-full">
                        <Button
                          type="button"
                          variant={'outline'}
                          className={cn(
                            'justify-between w-full',
                            !field.state.value && 'text-muted-foreground',
                          )}
                        >
                          {field.state.value ? (
                            format(field.state.value, 'PPP')
                          ) : (
                            <span>Pick a deadline</span>
                          )}
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(e: Date | undefined) =>
                            e && field.handleChange(e)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="department">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-2">
                  <field.FormLabel>Department</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
                        <SelectValue placeholder="e.g Todo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select department</SelectLabel>
                          <SelectLabel>
                            <Input placeholder="search department" />
                          </SelectLabel>
                          {Object.keys(TasksPriorityOptions).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="order_ref">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-4">
                  <field.FormLabel>Order #</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
                        <SelectValue placeholder="e.g Todo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select order</SelectLabel>
                          <SelectLabel>
                            <Input placeholder="Search order" />
                          </SelectLabel>
                          {Object.keys(TasksPriorityOptions).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="shipment_ref">
              {(field) => (
                <field.FormItem className="flex flex-col gap-1.5 col-span-4">
                  <field.FormLabel>Shipment #</field.FormLabel>
                  <field.FormControl>
                    <Select>
                      <SelectTrigger
                        name={field.name}
                        value={field.state.value}
                        defaultValue={field.state.value}
                        className="w-full"
                      >
                        <SelectValue placeholder="e.g Todo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select shipment</SelectLabel>
                          <SelectLabel>
                            <Input placeholder="Search shipment" />
                          </SelectLabel>
                          {Object.keys(TasksPriorityOptions).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormDescription>
                    The description of the task
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <Button type="submit">Create task</Button>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  );
};

export default NewTask;
