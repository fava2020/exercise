import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import type { User } from "~/types/user.interface";
import DetailUser from "~/components/detailUser";

export default async function UserById({ params }: { params: Promise<{ id: number }> }) {
  const ctx = await createTRPCContext({
    headers: new Headers({ "x-trpc-source": "server" }),
  });

  const caller = createCaller(ctx);
  const { id } = await params;
  
  try {
    const user: User = await caller.user.getById({ id: Number(id) });
    return <DetailUser user={user} />;
  } catch (cause) {
    console.error(cause);
  }
}