import { Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <header className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm py-4 px-6 md:px-8 flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">Natali Secrets</h1>
        </div>
        <div className="flex items-center">
          <button className="text-dark p-2 rounded-full hover:bg-gray-100/60">
            <span className="material-icons">notifications</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
