
import React from 'react';
import { Briefcase, Clock, Users, BarChart2, Calendar, Settings, CreditCard, Building2 } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  currentUserRole: UserRole;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
      isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

export default function Sidebar({ activeView, setActiveView, currentUserRole }: SidebarProps) {
  const navItems = [
    { view: 'Dashboard', label: 'Tableau de bord', icon: <Briefcase size={20} />, roles: [UserRole.Admin, UserRole.Manager, UserRole.Comptable] },
    { view: 'Employees', label: 'Employés', icon: <Users size={20} />, roles: [UserRole.Admin, UserRole.Manager] },
    { view: 'Time', label: 'Pointage', icon: <Clock size={20} />, roles: [UserRole.Admin, UserRole.Manager, UserRole.Employe] },
    { view: 'Payroll', label: 'Paie', icon: <CreditCard size={20} />, roles: [UserRole.Admin, UserRole.Comptable] },
    { view: 'Leave', label: 'Congés', icon: <Calendar size={20} />, roles: [UserRole.Admin, UserRole.Manager, UserRole.Employe] },
    { view: 'Reports', label: 'Rapports', icon: <BarChart2 size={20} />, roles: [UserRole.Admin, UserRole.Comptable] },
    { view: 'Settings', label: 'Paramètres', icon: <Settings size={20} />, roles: [UserRole.Admin] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(currentUserRole));

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col transition-all duration-300">
      <div className="flex items-center justify-center p-6 border-b">
        <Building2 className="text-blue-600" size={28} />
        <h1 className="ml-3 text-2xl font-bold text-gray-800">HotelHR</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {filteredNavItems.map(item => (
            <NavItem
              key={item.view}
              label={item.label}
              icon={item.icon}
              isActive={activeView === item.view}
              onClick={() => setActiveView(item.view)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-center text-gray-400">© 2024 HotelHR Inc.</p>
      </div>
    </div>
  );
}
