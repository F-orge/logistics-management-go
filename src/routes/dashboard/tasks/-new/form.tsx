import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@marahuyo/react-ui/ui/form';
import { Input } from '@marahuyo/react-ui/ui/input';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@marahuyo/react-ui/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@marahuyo/react-ui/ui/select';
import { Textarea } from '@marahuyo/react-ui/ui/textarea';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { serverAction } from './action';
import { formSchema } from './schema';

import { cn } from '@marahuyo/react-ui/lib/utils';
import { Avatar, AvatarImage } from '@marahuyo/react-ui/ui/avatar';
import { Calendar } from '@marahuyo/react-ui/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@marahuyo/react-ui/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
// IMPORTANT: multi-select is not a shadcn component, so you need to copy it from the souce code and install dependencies. GitHub: https://github.com/Ali-Hussein-dev/indie-ui/blob/main/src/components/ui/multi-select.tsx
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';
import { pb } from '../../../../../lib/pocketbase';
import {
  TasksPriorityOptions,
  TasksStatusOptions,
  TasksTagsOptions,
} from '../../../../../lib/pocketbase.gen';

const initialState = {
  success: false,
  message: '',
};

export function NewTaskForm() {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => pb.collection('users').getFullList(),
  });

  const departments = useQuery({
    queryKey: ['departments'],
    queryFn: () => pb.collection('departments').getFullList(),
  });

  const shipments = useQuery({
    queryKey: ['shipments'],
    queryFn: () => pb.collection('shipments').getFullList(),
  });

  const orders = useQuery({
    queryKey: ['orders'],
    queryFn: () => pb.collection('orders').getFullList(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [_, action, isPending] = React.useActionState(
    serverAction,
    initialState,
  );

  return (
    <div>
      <Form {...form}>
        <form action={action} className="flex flex-col w-full mx-auto gap-2.5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Task #"
                    type={'text'}
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Title of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Your message here..."
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>Describe what you want to do</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 w-full gap-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                const options = Object.keys(TasksStatusOptions).map(
                  (option) => ({ label: option, value: option }),
                );
                return (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger defaultValue={TasksStatusOptions.todo}>
                          <SelectValue placeholder="e.g: todo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select what status is this task. default to: `Todo`
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="assignees"
              render={({ field }) => {
                const options =
                  users.data?.map((user) => ({
                    label: (
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-5">
                          <AvatarImage
                            src={`/api/files/_pb_${user.collectionName}_auth_/${user.id}/${user.avatar}`}
                          />
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    ),
                    value: user.email,
                  })) || [];
                return (
                  <FormItem className="w-full">
                    <FormLabel>Assignees</FormLabel>
                    <MultiSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <MultiSelectTrigger>
                          <MultiSelectValue
                            placeholder={'e.g: john doe, jane doe'}
                          />
                        </MultiSelectTrigger>
                      </FormControl>
                      <MultiSelectContent>
                        <MultiSelectList>
                          {options.map(({ label, value }) => (
                            <MultiSelectItem key={value} value={value}>
                              {label}
                            </MultiSelectItem>
                          ))}
                        </MultiSelectList>
                      </MultiSelectContent>
                    </MultiSelect>
                    <FormDescription>
                      Assign a employee/s to this task
                    </FormDescription>
                    <FormMessage />
                    <Input hidden {...field} />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => {
              const options =
                departments.data?.map((department) => ({
                  label: department.name,
                  value: department.id,
                })) || [];
              return (
                <FormItem>
                  <FormLabel>Department *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Finance Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select what department will this task be at
                  </FormDescription>
                  <FormMessage />
                  <Input hidden {...field} />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => {
              const options = Object.keys(TasksPriorityOptions).map(
                (option) => ({ label: option, value: option }),
              );
              return (
                <FormItem>
                  <FormLabel>Priority *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="e.g: urgent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select what priority will this task be
                  </FormDescription>
                  <FormMessage />
                  <Input hidden {...field} />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Choose Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-start font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>How long should the task be</FormDescription>
                <FormMessage />
                <Input
                  hidden
                  name={field.name}
                  value={field.value?.toString()}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => {
              const options = Object.keys(TasksTagsOptions).map((option) => ({
                label: option,
                value: option,
              }));
              return (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="e.g: dispatch, warehouse, ..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Add tags to task to better categorize it.
                  </FormDescription>
                  <FormMessage />
                  <Input hidden {...field} />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="related_shipment"
            render={({ field }) => {
              const options =
                shipments.data?.map((shipment) => ({
                  label: shipment.tracking_number,
                  value: shipment.id,
                })) || [];
              return (
                <FormItem>
                  <FormLabel>Related Shipment #</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="#TRK_12345" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select what shipment does this task belong to
                  </FormDescription>
                  <FormMessage />
                  <Input hidden {...field} />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="related_order"
            render={({ field }) => {
              const options =
                orders.data?.map((order) => ({
                  label: order.order_id_custom,
                  value: order.id,
                })) || [];
              return (
                <FormItem>
                  <FormLabel>Related Order #</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="#ORD_12345" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select what order does this task belong to
                  </FormDescription>
                  <FormMessage />
                  <Input hidden {...field} />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-end items-center w-full pt-3">
            <Button type="submit" className="rounded-lg" size="sm">
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
