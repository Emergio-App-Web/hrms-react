import { Construction, HardHat } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

// Define a type for your Redux state if you haven't already
interface RootState {
  auth: {
    user: 'admin' | 'employee' | null;
  };
}

export function UnderDevelopmentPage() {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  // Determine the correct dashboard path based on user role
  const dashboardPath = user === 'admin' ? '/dashboard' : '/dashboard';
  const featureName = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'This page';

  return (
    <div className="flex h-[70vh] w-full items-center justify-center bg-background p-4">
      <div className="text-center">
        <HardHat
          className="mx-auto h-20 w-20 text-[#ddff8f]"
          strokeWidth={1.5}
        />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Feature In Progress <Construction className="inline-block ml-2 size-10" />
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The{' '}
          <span className="font-semibold capitalize text-foreground">
            {featureName}
          </span>{' '}
          section is currently under development.
        </p>
        <p className="text-md text-muted-foreground">
          We're working hard to bring it to you soon. Please check back later!
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link to={dashboardPath}>Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}