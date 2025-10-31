
import React, { useState } from 'react';
import { Calendar, Plus, Check, X } from 'lucide-react';
import { CurrentUser, LeaveRequest, LeaveStatus } from '../types';

interface LeaveManagementProps {
    currentUser: CurrentUser;
}

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
    { id: 'leave-1', employeeId: 'emp-004', startDate: '2024-08-05', endDate: '2024-08-10', reason: 'Vacances annuelles', status: LeaveStatus.Pending },
    { id: 'leave-2', employeeId: 'emp-006', startDate: '2024-07-29', endDate: '2024-07-29', reason: 'Rendez-vous médical', status: LeaveStatus.Approved },
    { id: 'leave-3', employeeId: 'emp-003', startDate: '2024-08-01', endDate: '2024-08-02', reason: 'Raison personnelle', status: LeaveStatus.Pending },
    { id: 'leave-4', employeeId: 'emp-002', startDate: '2024-07-25', endDate: '2024-07-26', reason: 'Formation', status: LeaveStatus.Rejected },
];

const getStatusClass = (status: LeaveStatus) => {
    switch (status) {
        case LeaveStatus.Approved: return 'bg-green-100 text-green-800';
        case LeaveStatus.Rejected: return 'bg-red-100 text-red-800';
        case LeaveStatus.Pending: return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

export default function LeaveManagement({ currentUser }: LeaveManagementProps) {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
    
    const isManagerOrAdmin = currentUser.role === 'Admin' || currentUser.role === 'Manager';

    const handleStatusChange = (id: string, newStatus: LeaveStatus) => {
        setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    };
    
    const visibleRequests = isManagerOrAdmin ? leaveRequests : leaveRequests.filter(req => req.employeeId === currentUser.employeeId);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Calendar className="mr-3" />Gestion des Congés</h1>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Plus size={20} className="mr-2" />
                    Nouvelle demande
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {isManagerOrAdmin ? "Demandes de congé à traiter" : "Mes demandes de congé"}
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {isManagerOrAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employé</th>}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                {isManagerOrAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {visibleRequests.map(req => (
                                <tr key={req.id}>
                                    {isManagerOrAdmin && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`Employé ${req.employeeId.split('-')[1]}`}</td>}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    {isManagerOrAdmin && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                            {req.status === LeaveStatus.Pending && (
                                                <>
                                                    <button onClick={() => handleStatusChange(req.id, LeaveStatus.Approved)} className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200" title="Approuver"><Check size={16}/></button>
                                                    <button onClick={() => handleStatusChange(req.id, LeaveStatus.Rejected)} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200" title="Rejeter"><X size={16}/></button>
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {visibleRequests.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                       {isManagerOrAdmin ? "Aucune demande de congé à traiter." : "Vous n'avez aucune demande de congé."}
                    </div>
                )}
            </div>
        </div>
    );
}
