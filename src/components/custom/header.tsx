import { Braces } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-zinc-800 flex items-center ">
      <div className="flex items-center justify-start px-3 py-2 gap-x-2">
        <Braces size={30} className="text-blue-400" />
        <span className="text-blue-200 text-center text-xl font-semibold font-mono">
          Rest Client
        </span>
      </div>
    </header>
  );
};

export default Header;
