import { HydrateClient } from "~/trpc/server";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <Sidebar />
      <div
        className="flex-1 transition-all  duration-300 ease-in-out ml-0 lg:ml-[290px]"
      >
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center text-black">
            {children}
        </main>
      </div>
    </HydrateClient>
  );
}
