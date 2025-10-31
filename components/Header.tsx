
import React from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';
import { UserRole, CurrentUser } from '../types';

interface HeaderProps {
  currentUser: CurrentUser;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
}

export default function Header({ currentUser, currentUserRole, setCurrentUserRole }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Bonjour, {currentUser.name.split(' ')[0]}</h2>
        <span className="ml-3 bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{currentUser.role}</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <select
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
            className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            aria-label="Changer de rôle"
          >
            {Object.values(UserRole).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={18} />
          </div>
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell size={24} />
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
