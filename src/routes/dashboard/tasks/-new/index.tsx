import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { NewTaskForm } from './form';
import { Route } from '..';
import { useNavigate } from '@tanstack/react-router';

const NewTask = () => {
  const { newTask } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <div>
      <Dialog open={newTask}>
        <DialogContent
          ref={(el) => {
            const closeBtn = el?.querySelector(
              'button > span.sr-only',
            )?.parentElement;
            closeBtn?.addEventListener('click', () => {
              navigate({ search: (prev) => ({ ...prev, newTask: undefined }) });
            });
          }}
          className="max-h-3/4 !max-w-3/4 overflow-y-auto no-scrollbar"
        >
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Create a new task</DialogDescription>
          </DialogHeader>
          <NewTaskForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTask;
