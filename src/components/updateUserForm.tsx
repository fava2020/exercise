'use client';
import { useState } from 'react';
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input} from "~/components/ui/input";
import { Button} from "~/components/ui/button";
import { toast } from "sonner";
import type { User } from '~/types/user.interface';

export default function UpdateUserForm({ userData }: { userData: User }) {
  const [user, setUserForm] = useState<User>(userData);

  const updateUserMutation = api.user.update.useMutation({
    onSuccess: (data) => {
      console.log('User updated:', data);
      toast("User Updated Successfully!");
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
      toast(`Error: ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...user, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({ ...user, company: {
      ...user.company,
    }, address: {
      ...user.address,
    }});
  };

  return (
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>
            Update the information of the user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-6'>   
                <div className='grid grid-cols-1 gap-2'>
                    <Label htmlFor="name">Name</Label>
                    <Input type='text' value={user?.name} onChange={handleChange} name="name" />
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <Label htmlFor="username">Username</Label>
                    <Input type='text' value={user?.username} onChange={handleChange} name="username" />
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <Label htmlFor="email">Email</Label>
                    <Input type='email' value={user?.email} onChange={handleChange} name="email" />
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <Label htmlFor="phone">Phone</Label>
                    <Input type='text' value={user?.phone} onChange={handleChange} name="phone" />
                </div>
                <div className='grid grid-cols-1     gap-2'>
                    <Label htmlFor="website">Website</Label>
                    <Input type='text' value={user?.website} onChange={handleChange} name="website" />
                </div>
            
            <div className="grid grid-cols-1 gap-2">
                <Label>Address</Label>
                <div className="flex flex-col gap-6 pl-4">
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label htmlFor='street'>Street</Label>
                        <Input type='text' value={user?.address?.street} onChange={handleChange} name="street" />
                    </div>
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label htmlFor='suite'>Suite</Label>
                        <Input type='text' value={user?.address?.suite} onChange={handleChange} name="suite" />
                    </div>
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label htmlFor='city'>City</Label>
                        <Input type='text' value={user?.address?.city} onChange={handleChange} name="city" />
                    </div>
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label htmlFor='zipcode'>Zipcode</Label>
                        <Input type='text' value={user?.address?.zipcode} onChange={handleChange} name="zipcode" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
                <Label>Company</Label>
                <div className="flex flex-col gap-6 pl-4"> 
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor='company'>Company</Label>
                        <Input type='text' value={user?.company?.name} onChange={handleChange} name="company" />
                    </div>    
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor='catchPhrase'>CatchPhrase</Label>
                        <Input type='text' value={user?.company?.catchPhrase} onChange={handleChange} name="catchPhrase" />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor='bs'>BS</Label>
                        <Input type='text' value={user?.company?.bs} onChange={handleChange} name="bs" />
                    </div>       
                </div>
            </div>
        </div>
      </CardContent>
        <CardFooter className="flex-col gap-2">
        <Button onClick={(e) => onHandleSubmit(e)}  variant="outline"className='w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 pr-2 mr-2' type="submit" disabled={updateUserMutation?.isPending}>
            {updateUserMutation?.isPending ? 'Updating...' : 'Update User'}
      </Button>
      </CardFooter>
    </Card>
  );
}