import { LatestUsers } from "~/app/_components/user";

export default async function Users() {
  return (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            User <span className="text-[hsl(280,100%,70%)]">Dashboard</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <LatestUsers />
          </div>
        </div>
  );
}
