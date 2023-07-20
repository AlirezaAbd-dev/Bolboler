import { useSession } from "next-auth/react";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import SidebarButton from "./ui/SidebarButton";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function SideNav() {
  const session = useSession();
  const user = session.data?.user;

  const navButtonsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.fromTo(
        ".nav-button",
        { opacity: 0, x: "-100" },
        { x: 0, opacity: 1, duration: 1, stagger: 0.4 }
      );
    }, navButtonsRef);
  }, []);

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
