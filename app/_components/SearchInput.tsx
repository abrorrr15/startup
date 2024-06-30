import { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    const addFocusClass = () => {
      if (inputElement) {
        inputElement.style.border = "2px solid #38b2ac"; // Changed to teal
        document.body.classList.add("focus-body");
      }
    };

    const removeFocusClass = () => {
      if (inputElement) {
        inputElement.style.border = "2px solid #e2e8f0"; // Initial border color

        document.body.classList.remove("focus-body");
      }
    };

    if (inputElement) {
      inputElement.addEventListener("focus", addFocusClass);
      inputElement.addEventListener("blur", removeFocusClass);
    }

    // Cleanup function to remove event listeners and class on unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", addFocusClass);
        inputElement.removeEventListener("blur", removeFocusClass);
        inputElement.style.border = "2px solid #e2e8f0"; // Initial border color

        document.body.classList.remove("focus-body");
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center rounded-xl overflow-hidden shadow-sm">
      <input
        type="text"
        placeholder="Найти товар..."
        ref={inputRef}
        className="border-2 border-gray-300 rounded-l-xl pl-4 outline-none py-2 w-[400px]"
      />
      <button className="py-[8.5px] px-4 bg-teal-600 text-white rounded-r-xl border-1 border-l-0 border-gray-300 ">
        <CiSearch size={25} />
      </button>
    </div>
  );
};

export default SearchInput;
