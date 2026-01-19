"use client";
export const dynamic = 'force-dynamic';

import { use, useEffect, useState } from "react";
import UserForm from "~/components/userForm";
import UserSkeleton from "~/components/userSkeleton";
import { useUser } from "~/context/UserProvider";
import type { User } from "~/types/user.interface";

export default function UserById({ params }: { params: Promise<{ id: number }> }) {
  const { getById } = useUser();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);
  const getUserById = getById({id: id});

  useEffect(() => {
    getUserById.then((response: User) => {
      setLoading(true);
      setUser(response);
    }).catch((error) => console.warn(error)).finally(() => setLoading(false));
  }, [getUserById]);

  if (loading) {
    return <UserSkeleton />;
  }

  return <UserForm userData={user!} />;
}