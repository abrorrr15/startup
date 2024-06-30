import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
import { LuHeart, LuShoppingBasket } from "react-icons/lu";

export default function MenuHeader() {
  return (
    <div className="flex space-x-4">
      <Link href="/shoppingcart" className="flex flex-col justify-center items-center no-underline text-black">
        <LuShoppingBasket />
        <span>Корзинка</span>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <LuHeart />
        <span>Избранное</span>
      </div>
      <div className="flex flex-col justify-center items-center">
      <AiOutlineMessage />
      <span>Чаты</span>
      </div>
    </div>
  );
}
