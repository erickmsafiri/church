import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Church Management System</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-white/5">
            <BellIcon className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5">
            <UserCircleIcon className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-300 hidden md:block">Erick Juma</span>
          </button>
        </div>
      </div>
    </header>
  );
}