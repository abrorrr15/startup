"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Header from "../../_adminUI/Header";
import SideBar from "../../_adminUI/SideBar";
import CreatePost from "../../_adminUI/CreatePost";
import Greet from "@/app/_adminUI/Greet";
import StoreSignup from "@/app/_adminUI/StoreSignup";

function Main({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  const toggleCreatePost = () => {
    setShowCreatePost((prev) => !prev);
  };

  // Determine if the current route should show Header and SideBar
  const showHeaderAndSideBar = pathname.startsWith(`/admin/${params.user_id}`);

  // Determine if Greet component should be shown
  const showGreet = !logged && pathname === `/admin/${params.user_id}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="flex flex-col h-screen">
      {showHeaderAndSideBar && (
        <>
          <Header
            logged={logged}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggleCreatePost={toggleCreatePost}
          />
          <div className="flex flex-1">
            <SideBar openMenu={openMenu} />
            <main className="w-full p-4">
              {showCreatePost && logged ? (
                <CreatePost setShowCreatePost={setShowCreatePost} />
              ) : (
                (showGreet && (
                  <Greet logged={logged} setLogged={setLogged} />
                )) ||
                (logged && !showCreatePost && (
                  <StoreSignup logged={logged} />
                )) ||
                children
              )}
            </main>
          </div>
        </>
      )}
      {!showHeaderAndSideBar && <main className="w-full p-4">{children}</main>}
    </div>
  );
}

export default Main;
