
import React from 'react';
import { BarChart, PieChart, Users, FileBarChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart } from 'recharts';
import { Employee, ContractType, Department } from '../types';

interface ReportsProps {
    employees: Employee[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

export default function Reports({ employees }: ReportsProps) {
    const contractData = Object.values(ContractType).map(type => ({
        name: type,
        value: employees.filter(e => e.contractType === type).length,
    }));

    const departmentData = Object.values(Department).map(dept => ({
        name: dept,
        count: employees.filter(e => e.department === dept).length
    }));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FileBarChart className="mr-3" /> Rapports & Statistiques
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <PieChart className="mr-2" /> Répartition par type de contrat
                    </h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <RechartsPieChart>
                                <Pie data={contractData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                    {contractData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <BarChart className="mr-2" /> Employés par département
                    </h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <RechartsBarChart data={departmentData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#82ca9d" name="Nombre d'employés" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Users className="mr-2" /> Statistiques de la main-d'œuvre
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{employees.length}</p>
                            <p className="text-sm text-gray-600">Total Employés</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">27.5 ans</p>
                            <p className="text-sm text-gray-600">Âge moyen</p>
                        </div>
                         <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-indigo-600">1.8 ans</p>
                            <p className="text-sm text-gray-600">Ancienneté moyenne</p>
                        </div>
                         <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">5%</p>
                            <p className="text-sm text-gray-600">Taux de rotation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
