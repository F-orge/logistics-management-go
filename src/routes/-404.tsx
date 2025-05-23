import { Button } from '@marahuyo/react-ui/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-2.5 text-center items-center">
        <span className="text-6xl font-semibold">404</span>
        <span className="">Page not found</span>
        <p className="text-sm text-muted-foreground">
          Sorry, the page you're looking for cannot be found.
        </p>
        <Button className="w-fit" size={'sm'}>
          <ArrowLeftIcon className="size-3" />
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
