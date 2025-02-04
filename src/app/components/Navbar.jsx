import Link from "next/link";
import "../../app/globals.css"

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/tasks" className="hover:underline">Tasks</Link></li>
          <li><Link href="/about" className="hover:underline">About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
