import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

function UserProfile({ onOpenMenu }: any | boolean) {
  return (
    <Link href="#" className="no-underline">
      <div className="flex flex-col justify-end items-center ml-4">
        <FaUserCircle onClick={onOpenMenu} className="rounded-full" />
        <span>Профиль</span>
      </div>
    </Link>
  );
}

export default UserProfile;
