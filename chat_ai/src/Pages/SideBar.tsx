import { useState } from "react";
import HamBurgerMenu from "../Components/HamBurgerMenu";
import { BiSearch } from "react-icons/bi";
function SideBar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={`${open ? "w-72" : "w-20"} bg-[#f9f9f9] h-[100vh]`}>
      <div className="flex justify-end p-5">
        <HamBurgerMenu open={open} setOpen={setOpen} />
      </div>
      <div className="w-full flex items-center justify-center">
        <BiSearch />
        {open && <p className="font-[1.5rem] font-poppins">Chat</p>}{" "}
      </div>
    </div>
  );
}

export default SideBar;
