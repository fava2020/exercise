import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export default async function UserById({ params }: { params: { id: number } }) {
  const ctx = await createTRPCContext({
    headers: new Headers({ "x-trpc-source": "server" }),
  });

  const caller = createCaller(ctx);
  const { id } = params;
  
  try {
    const user = await caller.user.getById({ id: Number(id) });
    return <><Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>
            Detailed information about the user.
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="email">Name</Label>
                <Label htmlFor="email">{user?.name}</Label>
                <Label htmlFor="email">Username</Label>
                <Label htmlFor="email">{user?.username}</Label>
                <Label htmlFor="email">Email</Label>
                <Label htmlFor="email">{user?.email}</Label>
                <Label htmlFor="email">Phone</Label>
                <Label htmlFor="email">{user?.phone}</Label>
                <Label htmlFor="email">Website</Label>
                <Label htmlFor="email">{user?.website}</Label>
                <Label htmlFor="email">Address</Label>
                <Label htmlFor="email">{`${user?.address?.street}, ${user?.address?.suite}, ${user?.address?.city}, ${user?.address?.zipcode}`}</Label>
                <Label htmlFor="email">Company</Label>
                <Label htmlFor="email">{`${user?.company?.name}, ${user?.company?.catchPhrase}, ${user?.company?.bs}`}</Label>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
      </CardFooter>
    </Card></>;
  } catch (cause) {
    // Handle errors (like unauthorized)
    console.error(cause);
  }
}