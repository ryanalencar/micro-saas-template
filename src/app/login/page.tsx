import { handleAuth } from "@/actions/handle-auth";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h1>Login Page</h1>
      <form action={handleAuth}>
        <div className="flex gap-4 h-full">
          <button className="border rounded-sm p-2 cursor-pointer" type="submit">Signin with Google</button>
        </div>
      </form>
    </div>
  );
}
