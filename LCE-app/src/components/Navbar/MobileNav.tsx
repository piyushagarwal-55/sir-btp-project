import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { data } from "./constants";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "/LCE.svg";

const MobileNav = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  return (
    <div className="flex items-center justify-between w-full">
      <img
        src={Logo}
        alt="LCE Logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
        className="flex w-[50vw] h-[21vh]"
      />
      <Sheet>
        <SheetTrigger asChild>
          <img
            src="hamburger.svg"
            alt="hamburger icon"
            className="mr-4 cursor-pointer bg-black h-[5%] w-[10%]"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-blue bg-white">
          <img
            src={Logo}
            alt="LCE Logo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            className={"mt-4 w-[50vw] h-[21vh]"}
          />
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 items-center w-[60vw]">
                {data.map((item) => {
                  const isActive = pathname === item.route;
                  console.log(pathname);
                  return (
                    <SheetClose asChild key={item.route}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`${item.route}`);
                        }}
                        className={cn(
                          "p-4 rounded-lg w-full text-blue font-bold",
                          {
                            "bg-orange-500": isActive,
                          }
                        )}
                      >
                        {item.title}
                      </div>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
