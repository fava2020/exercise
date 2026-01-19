'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import type { User } from '~/types/user.interface';
import Link from "next/link";
import { ArrowBigLeftDash } from "lucide-react";

export default function DetailUser({ user }: { user: User }) {
  return (
    <>
        <Link
            href={`/`}
            className='flex flew-row py-4'
        >
            <ArrowBigLeftDash /> Go Back
        </Link>
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-6'>   
                <div className='grid grid-cols-1 gap-2'>
                    <Label>Name</Label>
                    <Label>{user?.name}</Label>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <Label>Username</Label>
                    <Label>{user?.username}</Label>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <Label>Email</Label>
                    <Label>{user?.email}</Label>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <Label>Phone</Label>
                    <Label>{user?.phone}</Label>
                </div>
                <div className='grid grid-cols-1     gap-2'>
                    <Label>Website</Label>
                    <Label>{user?.website}</Label>
                </div>
            
            <div className="grid grid-cols-1 gap-2">
                <Label>Address</Label>
                <div className="flex flex-col gap-6 pl-4">
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label>Street</Label>
                        <Label>{user?.address?.street}</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <Label>Suite</Label>
                        <Label>{user?.address?.suite}</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label>City</Label>
                        <Label>{user?.address?.city}</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-2"> 
                        <Label>Zipcode</Label>
                        <Label>{user?.address?.zipcode}</Label>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
                <Label>Company</Label>
                <div className="flex flex-col gap-6 pl-4"> 
                    <div className="grid grid-cols-1 gap-2">
                        <Label>Company</Label>
                        <Label>{user?.company?.name}</Label>
                    </div>    
                    <div className="grid grid-cols-1 gap-2">
                        <Label>CatchPhrase</Label>
                        <Label>{user?.company?.catchPhrase}</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor='bs'>BS</Label>
                        <Label>{user?.company?.bs}</Label>
                    </div>       
                </div>
            </div>
        </div>
      </CardContent>
    </Card></>
  );
}