'use client';
import { use, useEffect, useState } from "react";
import DetailUser from "~/components/detailUser";
import UserSkeleton from "~/components/userSkeleton";
import { useUser } from "~/context/UserProvider";
import type { User } from "~/types/user.interface";

export default function UserById({ params }: { params: Promise<{ id: number }> }) {
  const { getById } = useUser();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);

  useEffect(() => {
    getById({id: id}).then((response: User) => {
      setLoading(true);
      setUser(response);
    }).catch((error) => console.warn(error)).finally(() => setLoading(false));
  }, [getById, id]);

  if (loading) {
    return <UserSkeleton />;
  }

  return <DetailUser user={user!} />;
}