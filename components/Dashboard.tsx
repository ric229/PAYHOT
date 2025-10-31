
import React from 'react';
import { Users, UserCheck, UserX, Building, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Employee, Department } from '../types';

interface DashboardProps {
    employees: Employee[];
    setActiveView: (view: string) => void;
}

const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default function Dashboard({ employees, setActiveView }: DashboardProps) {
    const totalEmployees = employees.length;
    const departmentsData = Object.values(Department).map(dept => ({
        name: dept,
        count: employees.filter(e => e.department === dept).length
    }));

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total des employés" value={totalEmployees} icon={<Users className="text-white" />} color="bg-blue-500" />
                <StatCard title="Présents aujourd'hui" value={`${Math.floor(totalEmployees * 0.9)}`} icon={<UserCheck className="text-white" />} color="bg-green-500" />
                <StatCard title="Absents" value={`${Math.ceil(totalEmployees * 0.1)}`} icon={<UserX className="text-white" />} color="bg-red-500" />
                <StatCard title="Départements" value={Object.keys(Department).length} icon={<Building className="text-white" />} color="bg-indigo-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <BarChart className="mr-2" /> Effectifs par département
                    </h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <RechartsBarChart data={departmentsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#3B82F6" name="Employés" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Annonces internes</h2>
                    <ul className="space-y-4">
                        <li className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-semibold text-blue-800">Réunion générale</p>
                            <p className="text-sm text-gray-600">Le 30 juillet à 10h. Présence obligatoire.</p>
                        </li>
                        <li className="p-4 bg-green-50 rounded-lg">
                            <p className="font-semibold text-green-800">Nouveau menu au restaurant du personnel</p>
                            <p className="text-sm text-gray-600">À partir du 1er août, découvrez les nouveautés.</p>
                        </li>
                        <li className="p-4 bg-yellow-50 rounded-lg">
                            <p className="font-semibold text-yellow-800">Rappel : Formations sécurité</p>
                            <p className="text-sm text-gray-600">Inscrivez-vous avant le 15 août.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
