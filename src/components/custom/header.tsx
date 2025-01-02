import { logo } from "@/assets";

const Header = () => {
  return (
    <header className="h-16 bg-zinc-800 flex items-center ">
      <div className="flex items-center justify-start px-3 py-2 gap-x-2">
        <img src={logo} className="w-10 h-10 rounded-md object-cover" />
        <span className="text-slate-200 text-center text-2xl font-bold font-nunito">
          Restly
        </span>
      </div>
    </header>
  );
};

export default Header;
