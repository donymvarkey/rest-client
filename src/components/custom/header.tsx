import { Braces } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-zinc-800 flex items-center ">
      <div className="flex items-center justify-start px-3 py-2 gap-x-2">
        <Braces size={30} className="text-blue-400" />
        <span className="text-slate-200 text-center text-2xl font-bold font-nunito">
          EZRest
        </span>
      </div>
    </header>
  );
};

export default Header;
