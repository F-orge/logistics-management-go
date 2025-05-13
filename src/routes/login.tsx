import { Button } from '@marahuyo/react-ui/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/login"!
      <Button onClick={() => toast('Hello from sonner')}>
        Click to show sonner
      </Button>
    </div>
  );
}
