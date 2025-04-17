import { handleAuth } from "@/actions/handle-auth";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {session && (
        <form action={handleAuth}>
          <button
            type="submit"
            className="border rounded-sm p-2 cursor-pointer"
          >
            logout
          </button>
        </form>
      )}
      <Link href="/pagamentos">
        <button className="border rounded-sm p-2 cursor-pointer">
          Pagamentos
        </button>
      </Link>
    </div>
  );
}
