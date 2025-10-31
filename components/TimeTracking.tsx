
import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, CheckCircle } from 'lucide-react';
import { UserRole, CurrentUser, Employee } from '../types';

interface TimeTrackingProps {
    currentUser: CurrentUser;
    employees: Employee[];
    currentUserRole: UserRole;
}

const ClockInPanel = () => {
    const [time, setTime] = useState(new Date());
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [lastAction, setLastAction] = useState<{ type: string, time: string } | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockAction = () => {
        const currentTime = new Date().toLocaleTimeString();
        if(isClockedIn) {
            setLastAction({ type: 'Pointage de sortie', time: currentTime });
        } else {
            setLastAction({ type: 'Pointage d\'entrée', time: currentTime });
        }
        setIsClockedIn(!isClockedIn);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mon Pointage</h2>
            <div className="text-5xl font-bold text-gray-800 mb-2">
                {time.toLocaleTimeString()}
            </div>
            <div className="text-lg text-gray-500 mb-6">
                {time.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <button 
                onClick={handleClockAction}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold text-lg transition-colors ${
                    isClockedIn ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                {isClockedIn ? <LogOut className="mr-2" /> : <LogIn className="mr-2" />}
                {isClockedIn ? 'Pointer (Sortie)' : 'Pointer (Entrée)'}
            </button>
            {lastAction && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700 flex items-center">
                    <CheckCircle className="mr-2" />
                    Dernière action: {lastAction.type} à {lastAction.time}
                </div>
            )}
        </div>
    );
}

const ManagerTimesheetView = ({ employees }: { employees: Employee[] }) => {
    // Mock data for timesheets
    const timesheetData = employees.slice(0, 5).map(emp => ({
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        clockIn: '09:02',
        clockOut: '17:31',
        totalHours: 8.48,
        status: 'Présent'
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Feuilles de temps de l'équipe</h2>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrée</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sortie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heures totales</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {timesheetData.map(entry => (
                            <tr key={entry.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                                    <div className="text-sm text-gray-500">{entry.department}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.clockIn}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.clockOut}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{entry.totalHours.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {entry.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function TimeTracking({ currentUser, employees, currentUserRole }: TimeTrackingProps) {
    const isManagerOrAdmin = currentUserRole === UserRole.Admin || currentUserRole === UserRole.Manager;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center"><Clock className="mr-3" />Gestion du temps de travail</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ClockInPanel />
                </div>
                {isManagerOrAdmin && (
                    <div className="lg:col-span-2">
                        <ManagerTimesheetView employees={employees} />
                    </div>
                )}
            </div>
        </div>
    );
}
