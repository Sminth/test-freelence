import UsersTable from "@/components/users/UsersTable";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className=" md:w-[60%] shadow-2xl z-10 overflow-x-auto">
        <UsersTable />

      </div>
      {/* <div className="absolute right-[-20%] top-[-30%] w-[30%] h-[200%] bg-[blue] transform rotate-[150deg]"></div> */}
    </main>
  );
}
