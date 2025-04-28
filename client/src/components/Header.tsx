import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-primary">Natali Secrets</h1>
      </div>
      <div className="flex items-center">
        <button className="text-dark p-2 rounded-full hover:bg-gray-100">
          <span className="material-icons">notifications</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
