import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  CalendarIcon, 
  HeartIcon, 
  CheckCircleIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { path: '/', icon: HomeIcon, label: 'Dashboard' },
  { path: '/members', icon: UsersIcon, label: 'Members' },
  { path: '/events', icon: CalendarIcon, label: 'Events' },
  { path: '/offerings', icon: HeartIcon, label: 'Offerings' },
  { path: '/attendance', icon: CheckCircleIcon, label: 'Attendance' },
  { path: '/prayers', icon: ChatBubbleLeftRightIcon, label: 'Prayers' },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-[#0a0c10] border-r border-white/10 transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          {!collapsed && <span className="font-semibold text-white">Olorieni Church</span>}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-[#1f2937] border border-white/20 rounded-full p-1.5 hover:bg-gray-700"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-green-600/20 text-green-500 border-l-2 border-green-500' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 text-xs text-gray-500 ${collapsed ? 'text-center' : ''}`}>
        {!collapsed && (
          <>
            <p>Developer: Erick Juma</p>
            <p>Tel: 0741681933</p>
          </>
        )}
        {collapsed && <p>EJ</p>}
      </div>
    </div>
  );
}