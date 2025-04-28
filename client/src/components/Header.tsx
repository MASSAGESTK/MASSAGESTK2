import { Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <header className="bg-card/80 text-card-foreground backdrop-blur-md rounded-2xl shadow-sm dark:shadow-white/5 py-4 px-6 md:px-8 flex items-center justify-between max-w-screen-lg mx-auto transition-colors duration-200">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">Natali Secrets</h1>
        </div>
        <div className="flex items-center">
          <button className="text-foreground p-2 rounded-full hover:bg-muted/60 transition-colors duration-200">
            <span className="material-icons">notifications</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
