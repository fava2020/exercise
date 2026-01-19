import { LatestUsers } from "~/components/user";

export default function Users() {
  return (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <LatestUsers />
          </div>
        </div>
  );
}
