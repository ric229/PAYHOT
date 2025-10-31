
import React, { useState, useMemo } from 'react';
import { UserRole, Employee } from './types';
import { MOCK_EMPLOYEES } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import TimeTracking from './components/TimeTracking';
import Payroll from './components/Payroll';
import LeaveManagement from './components/LeaveManagement';
import Reports from './components/Reports';
import Settings from './components/Settings';

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Admin);
  const [activeView, setActiveView] = useState('Dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const currentUser = useMemo(() => {
    const userMap = {
      [UserRole.Admin]: { name: 'Admin User', role: UserRole.Admin, employeeId: 'admin' },
      [UserRole.Manager]: { name: 'Manager User', role: UserRole.Manager, employeeId: 'emp-002' },
      [UserRole.Comptable]: { name: 'Accountant User', role: UserRole.Comptable, employeeId: 'emp-005' },
      [UserRole.Employe]: { name: 'Employee User', role: UserRole.Employe, employeeId: 'emp-003' },
    };
    return userMap[currentUserRole];
  }, [currentUserRole]);
  
  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveView('EmployeeDetail');
  };
  
  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    setSelectedEmployee(updatedEmployee);
  };
  
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
    setActiveView('Employees');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard employees={employees} setActiveView={setActiveView} />;
      case 'Employees':
        return <EmployeeList employees={employees} onSelectEmployee={handleSelectEmployee} onAddEmployee={handleAddEmployee} currentUserRole={currentUserRole}/>;
      case 'Time':
        return <TimeTracking currentUser={currentUser} employees={employees} currentUserRole={currentUserRole} />;
      case 'Payroll':
        return <Payroll employees={employees} />;
      case 'Leave':
        return <LeaveManagement currentUser={currentUser} />;
      case 'Reports':
        return <Reports employees={employees} />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard employees={employees} setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} currentUserRole={currentUserRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUser={currentUser} currentUserRole={currentUserRole} setCurrentUserRole={setCurrentUserRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
