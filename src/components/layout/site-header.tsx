import { auth } from "@/auth";
import { signOutAction } from "@/app/actions/auth";
import { NavBar } from "@/components/layout/nav-bar";

export async function SiteHeader() {
  const session = await auth();
  return (
    <NavBar
      isLoggedIn={Boolean(session?.user)}
      isAdmin={session?.user?.role === "ADMIN"}
      signOutAction={signOutAction}
    />
  );
}
