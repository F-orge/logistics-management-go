import { Avatar, AvatarImage } from '@marahuyo/react-ui/ui/avatar';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { Input } from '@marahuyo/react-ui/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Minus, Plus } from 'lucide-react';
import { ClientResponseError } from 'pocketbase';
import React from 'react';
import { toast } from 'sonner';
import { Route } from '.';
import { pb } from '../../../../lib/pocketbase';
import { getTask, useMutateUpdateTask } from '../../../queries/tasks';

const AssignTask = () => {
  const { id, assignTaskDialog } = Route.useSearch();

  const task = useQuery(getTask(id || ''));

  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [unselectedUsers, setUnselectedUsers] = React.useState<string[]>([]);

  const mutation = useMutateUpdateTask();

  // Initialize selectedUsers when task data is loaded
  React.useEffect(() => {
    if (task.data?.assignees) {
      setSelectedUsers(task.data.assignees);
    }
  }, [task.data?.assignees]);

  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => pb.collection('users').getFullList(),
  });

  const navigate = useNavigate({ from: Route.fullPath });

  // Filter for search functionality
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = React.useMemo(() => {
    if (!users.data) return [];
    return users.data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users.data, searchTerm]);

  const handleAssign = async () => {
    try {
      console.log(
        'unselected users',
        unselectedUsers,
        'selected users',
        selectedUsers,
      );

      if (unselectedUsers.length !== 0) {
        await mutation.mutateAsync({
          id: id || '',
          payload: { 'assignees-': unselectedUsers },
        });
      }

      if (selectedUsers.length !== 0) {
        await mutation.mutateAsync({
          id: id || '',
          payload: { 'assignees+': selectedUsers },
        });
      }

      toast('Employee/s updated sucessfully');
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error(e.data);
      }
    }

    navigate({
      search: (prev) => ({
        ...prev,
        id: undefined,
        assignTaskDialog: undefined,
      }),
    });
  };

  return (
    <Dialog open={!!id && assignTaskDialog}>
      <DialogContent
        className="!max-w-1/2 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(el) => {
          const closeBtn = el?.querySelector(
            'button > span.sr-only',
          )?.parentElement;
          closeBtn?.addEventListener('click', () =>
            navigate({
              search: (prev) => ({
                ...prev,
                id: undefined,
                assignTaskDialog: undefined,
              }),
            }),
          );
        }}
      >
        <DialogHeader>
          <DialogTitle>{task.data?.title}</DialogTitle>
          <DialogDescription>Assign employee/s to</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-5">
          <Input
            placeholder="Search user"
            className="col-span-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="w-fit justify-self-end" onClick={handleAssign}>
            Assign
          </Button>
        </div>

        {/* Selected users section */}
        <div className="grid grid-cols-2 gap-2.5 items-center border-b pb-4">
          {filteredUsers
            ?.filter((user) => selectedUsers.includes(user.id))
            ?.filter((user) => !unselectedUsers.includes(user.id))
            .map((user) => (
              <React.Fragment key={user.id}>
                <div className="flex items-center gap-2.5">
                  <Avatar className="col-span-1">
                    <AvatarImage
                      src={`/api/files/_pb_${user.collectionName}_auth_/${user.id}/${user.avatar}`}
                    />
                  </Avatar>
                  <span className="col-span-1">{user.name}</span>
                </div>
                <Button
                  onClick={() => {
                    setUnselectedUsers((prev) => [...prev, user.id]);
                    setSelectedUsers((prev) =>
                      prev.filter((id) => id !== user.id),
                    );
                  }}
                  variant={'outline'}
                  className="w-fit justify-self-end"
                >
                  <Minus />
                </Button>
              </React.Fragment>
            ))}
        </div>

        {/* Available users section */}
        <div className="grid grid-cols-2 gap-2.5 items-center">
          {filteredUsers
            ?.filter((user) => !unselectedUsers.includes(user.id))
            ?.filter((user) => !selectedUsers.includes(user.id))
            .map((user) => (
              <React.Fragment key={user.id}>
                <div className="flex items-center gap-2.5">
                  <Avatar className="col-span-1">
                    <AvatarImage
                      src={`/api/files/_pb_${user.collectionName}_auth_/${user.id}/${user.avatar}`}
                    />
                  </Avatar>
                  <span className="col-span-1">{user.name}</span>
                </div>
                <Button
                  onClick={() => {
                    setSelectedUsers((prev) => [...prev, user.id]);
                    setUnselectedUsers((prev) =>
                      prev.filter((id) => id !== user.id),
                    );
                  }}
                  variant={'outline'}
                  className="w-fit justify-self-end"
                >
                  <Plus />
                </Button>
              </React.Fragment>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTask;
