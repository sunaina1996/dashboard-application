import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { NavItem } from '../types';
import { Heading } from '@sunaina-dev/ui-library';

interface SidebarProps {
  navItems: NavItem[];
}

export const Sidebar = ({ navItems }: SidebarProps) => {
  const { sidebarOpen } = useAppSelector((state) => state.layout);

  return (
    <aside
      className={`bg-slate-900 text-white h-screen transition-all duration-300 ${
        sidebarOpen ? 'w-52' : 'w-20'
      }`}
    >
      <div className="p-4 border-b border-slate-700 h-16 flex items-center">
        {sidebarOpen ? (
          <Heading 
            level={3} 
            title="Sunaina"
            align='center'
            className="[&>h3]:text-white font-bold flex-1"
          />
        ) : ''
        // (
        //   <Heading 
        //     level={3} 
        //     title="S" 
        //     className="[&>h3]:text-white font-bold mx-auto flex-1"
        //   />
        // )
        }
      </div>
      <nav className="mt-6 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 mb-1 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className={`text-xl ${!sidebarOpen ? 'mx-auto' : ''}`}>{item.icon}</span>
            {sidebarOpen && (
              <span className="font-medium text-sm">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};