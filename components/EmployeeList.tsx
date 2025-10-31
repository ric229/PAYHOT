
import React, { useState } from 'react';
import { Department, Employee, UserRole } from '../types';
import { Search, PlusCircle, MoreVertical } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  onAddEmployee: (employee: Employee) => void;
  currentUserRole: UserRole;
}

const EmployeeRow = ({ employee, onSelect }: { employee: Employee; onSelect: () => void; }) => (
    <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full object-cover" src={employee.photoUrl} alt={`${employee.firstName} ${employee.lastName}`} />
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{employee.position}</div>
            <div className="text-sm text-gray-500">{employee.department}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                employee.contractType === 'CDI' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
                {employee.contractType}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(employee.hireDate).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button onClick={onSelect} className="text-indigo-600 hover:text-indigo-900 mr-4">Détails</button>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
        </td>
    </tr>
);


export default function EmployeeList({ employees, onSelectEmployee, onAddEmployee, currentUserRole }: EmployeeListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState<Department | 'All'>('All');

    const filteredEmployees = employees.filter(emp => {
        const nameMatch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
        const departmentMatch = departmentFilter === 'All' || emp.department === departmentFilter;
        return nameMatch && departmentMatch;
    });
    
    const canAddEmployee = currentUserRole === UserRole.Admin;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Liste des employés</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher un employé..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={departmentFilter}
                        onChange={e => setDepartmentFilter(e.target.value as Department | 'All')}
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">Tous les départements</option>
                        {Object.values(Department).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                    {canAddEmployee && (
                        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusCircle size={20} className="mr-2" />
                            Ajouter un employé
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrat</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'embauche</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map(employee => (
                            <EmployeeRow key={employee.id} employee={employee} onSelect={() => onSelectEmployee(employee)} />
                        ))}
                    </tbody>
                </table>
            </div>
             {filteredEmployees.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    Aucun employé trouvé.
                </div>
            )}
        </div>
    );
}
