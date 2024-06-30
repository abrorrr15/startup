import { useState } from "react";

function ContentButton() {
  const [active, setActive] = useState(true);
  return (
    <div className="mt-8 w-full flex justify-around">
      <div className={`border p-2 px-4 rounded-lg bg-white hover:bg-gray-200 outline-none cursor-pointer transition-all duration-300 ${active && 'bg-green-300 hover:bg-green-300'}`}>
        Рекомендации
      </div>
      <div className="border p-2 px-4 rounded-lg bg-white hover:bg-gray-200 outline-none cursor-pointer transition-all duration-300">
        Хит продаж
      </div>
      <div className="border p-2 px-4 rounded-lg bg-white hover:bg-gray-200 outline-none cursor-pointer transition-all duration-300">
        Супер Акции
      </div>
      <div className="border p-2 px-4 rounded-lg bg-white hover:bg-gray-200 outline-none cursor-pointer transition-all duration-300">
        Избранные
      </div>
    </div>
  );
}

export default ContentButton;
