import { useSession } from "next-auth/react";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import SidebarButton from "./ui/SidebarButton";
import useNavButtonsAnimation from "~/hooks/useNavButtonsAnimation";

export function SideNav() {
  const session = useSession();
  const user = session.data?.user;

  const navButtonsRef = useNavButtonsAnimation();

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul
        ref={navButtonsRef}
        className="flex flex-col items-start gap-2 whitespace-nowrap"
      >
        <SidebarButton href="/" Icon={VscHome}>
          Home
        </SidebarButton>
        {user != null && (
          <SidebarButton href={`/profiles/${user.id}`} Icon={VscAccount}>
            Profile
          </SidebarButton>
        )}
        {user == null ? (
          <SidebarButton mode="login" Icon={VscSignIn}>
            Log In
          </SidebarButton>
        ) : (
          <SidebarButton mode="logout" Icon={VscSignOut}>
            Log Out
          </SidebarButton>
        )}
      </ul>
    </nav>
  );
}
