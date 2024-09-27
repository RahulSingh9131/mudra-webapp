import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UserAccountSkeleton = () => {
  return (
    <Card className="flex max-w-sm flex-col items-start p-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex flex-col gap-1 text-sm text-gray-500">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default UserAccountSkeleton;
