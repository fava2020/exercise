export const dynamic = 'force-dynamic';

import UserForm from "~/components/userForm";

const emptyUser = {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: { street: '', suite: '', city: '', zipcode: '' },
    company: { name: '', catchPhrase: '', bs: '' }
};

export default function Create() {
  return (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <UserForm userData={emptyUser} />
          </div>
        </div>
  );
}