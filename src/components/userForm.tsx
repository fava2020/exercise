'use client';
import { useState } from 'react';
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
import type { User } from '~/types/user.interface';
import { useUser } from '~/context/UserProvider';
import Link from 'next/link';
import { ArrowBigLeftDash } from 'lucide-react';

export default function UserForm({ userData }: { userData: User }) {
  const [user, setUserForm] = useState<User>(userData);
  const isEditing = !!userData?.id;
  const { create, update, isLoading } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (['street', 'suite', 'city', 'zipcode'].includes(name)) {
      setUserForm(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else if (['companyName', 'catchPhrase', 'bs'].includes(name)) {
      const field = name === 'companyName' ? 'name' : name;
      setUserForm(prev => ({ ...prev, company: { ...prev.company, [field]: value } }));
    } else {
      setUserForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDataUser = {
      ...user, 
      company: { 
        ...user.company, 
        name: user.company.name, 
        bs: user.company.bs, 
        catchPhrase: user.company.catchPhrase
      }, 
      address: { 
        ...user.address, 
        street: user.address.street, 
        suite: user.address.suite, 
        city: user.address.city, 
        zipcode: user.address.zipcode
      }
    };

    if (isEditing) {
      update(newDataUser).catch(error => console.info(error));
    } else {
      create(newDataUser).catch(error => console.info(error));
    }
  };

  return (
    <>
        <Link
            href={`/`}
            className='flex flew-row py-4'
        >
            <ArrowBigLeftDash /> Go Back
        </Link>
      <Card className="w-400 max-w-sm">
      <CardHeader>
        <CardTitle>{isEditing ? 'Update User' : 'Create User'}</CardTitle>
        <CardDescription>
            {isEditing ? 'Modify user information.' : 'Fill in the details to add a new user.'}
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
                        <Input type='text' value={user?.company?.name} onChange={handleChange} name="companyName" />
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
        <Button onClick={(e) => onHandleSubmit(e)}  variant="outline" className='w-full rounded bg-gray-300 px-4 py-2 font-semibold text-black hover:bg-gray-200 pr-2 mr-2' type="submit" disabled={isLoading}>
            {isEditing ? 'Update User' : 'Create User'}
      </Button>
      </CardFooter>
    </Card>
    </>
  );
}