import { useState } from "react";
import HamBurgerMenu from "../Components/HamBurgerMenu";
import { BiExit, BiSearch } from "react-icons/bi";
function SideBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { isSignedIn: false }
  );

  const handleSignOut = () => {
    setUser({ isSignedIn: false });
    localStorage.removeItem("user");
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-[#f9f9f9] h-[100vh] flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-end p-5">
          <HamBurgerMenu open={open} setOpen={setOpen} />
        </div>
        <div className="p-5">
          {open ? (
            <p className="text-[2rem] text-center font-poppins font-semibold">
              Chat AI
            </p>
          ) : (
            <p className="text-[2rem] text-center font-poppins font-semibold">
              CA
            </p>
          )}
        </div>
        <div>
          {open ? (
            user?.email ? (
              <p className="text-[1rem] text-center font-poppins font-semibold">
                Welcome {user?.email}
              </p>
            ) : (
              <p className="text-center font-poppins font-semibold">
                Please sign in... <a href="/login">Sign in</a>
              </p>
            )
          ) : (
            <>
              <p className="text-center">Welcome</p>
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <BiSearch />
          {open && <p className="font-[1.5rem] font-poppins">Chat</p>}{" "}
        </div>
      </div>
      <div className="p-5 mb-10">
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={handleSignOut}
        >
          <BiExit />
          {open && <p className="font-[1.5rem] font-poppins">Sign out</p>}{" "}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
