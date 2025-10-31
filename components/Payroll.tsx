
import React, { useState } from 'react';
import { Employee } from '../types';
import { DollarSign, FileText, Send, X } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface PayrollProps {
    employees: Employee[];
}

interface PayrollEntry {
    employeeId: string;
    baseSalary: number;
    overtimeHours: number;
    bonuses: number;
    deductions: number;
    netSalary: number;
}

const PayslipModal = ({ employee, payrollEntry, onClose }: { employee: Employee, payrollEntry: PayrollEntry, onClose: () => void }) => {

    const exportToPDF = () => {
        const doc = new jsPDF();
        const period = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

        doc.setFontSize(18);
        doc.text(`Bulletin de Paie - ${period}`, 14, 22);
        doc.setFontSize(12);
        doc.text(`Employé: ${employee.firstName} ${employee.lastName}`, 14, 32);
        doc.text(`Poste: ${employee.position}`, 14, 38);
        doc.text(`Département: ${employee.department}`, 14, 44);

        (doc as any).autoTable({
            startY: 55,
            head: [['Description', 'Montant (€)']],
            body: [
                ['Salaire de base', `${payrollEntry.baseSalary.toFixed(2)}`],
                ['Heures supplémentaires (' + payrollEntry.overtimeHours + 'h)', `+ ${ (payrollEntry.baseSalary / 151.67 * 1.25 * payrollEntry.overtimeHours).toFixed(2) }`],
                ['Primes', `+ ${payrollEntry.bonuses.toFixed(2)}`],
                ['Déductions', `- ${payrollEntry.deductions.toFixed(2)}`],
            ],
            foot: [['Salaire Net à Payer', `${payrollEntry.netSalary.toFixed(2)}`]],
            theme: 'striped',
            headStyles: { fillColor: [22, 160, 133] },
            footStyles: { fillColor: [44, 62, 80], fontStyle: 'bold' }
        });

        doc.save(`bulletin_paie_${employee.lastName}_${period}.pdf`);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Bulletin de Paie</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Employé</p>
                        <p className="font-semibold">{employee.firstName} {employee.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Période</p>
                        <p className="font-semibold">{new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
                <table className="w-full mb-6">
                    <tbody>
                        <tr className="border-b"><td className="py-2">Salaire de base</td><td className="text-right">{payrollEntry.baseSalary.toFixed(2)} €</td></tr>
                        <tr className="border-b"><td className="py-2">Heures supplémentaires ({payrollEntry.overtimeHours}h)</td><td className="text-right text-green-600">+ {(payrollEntry.baseSalary / 151.67 * 1.25 * payrollEntry.overtimeHours).toFixed(2)} €</td></tr>
                        <tr className="border-b"><td className="py-2">Primes</td><td className="text-right text-green-600">+ {payrollEntry.bonuses.toFixed(2)} €</td></tr>
                        <tr className="border-b"><td className="py-2">Déductions</td><td className="text-right text-red-600">- {payrollEntry.deductions.toFixed(2)} €</td></tr>
                        <tr className="font-bold bg-gray-100"><td className="py-3 px-2 rounded-l-md">Salaire Net à Payer</td><td className="text-right px-2 rounded-r-md">{payrollEntry.netSalary.toFixed(2)} €</td></tr>
                    </tbody>
                </table>
                <div className="flex justify-end space-x-4">
                    <button onClick={exportToPDF} className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        <FileText size={20} className="mr-2" />
                        Exporter en PDF
                    </button>
                    <button onClick={onClose} className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Payroll({ employees }: PayrollProps) {
    const [payrollData, setPayrollData] = useState<Record<string, PayrollEntry>>({});
    const [selectedPayslip, setSelectedPayslip] = useState<{ employee: Employee, payrollEntry: PayrollEntry } | null>(null);

    const handleInputChange = (employeeId: string, field: keyof PayrollEntry, value: number) => {
        const employee = employees.find(e => e.id === employeeId);
        if (!employee) return;

        const currentEntry = payrollData[employeeId] || {
            employeeId,
            baseSalary: employee.salary,
            overtimeHours: 0,
            bonuses: 0,
            deductions: 0,
            netSalary: employee.salary,
        };

        const updatedEntry = { ...currentEntry, [field]: value };
        const overtimePay = (updatedEntry.baseSalary / 151.67) * 1.25 * updatedEntry.overtimeHours;
        updatedEntry.netSalary = updatedEntry.baseSalary + overtimePay + updatedEntry.bonuses - updatedEntry.deductions;

        setPayrollData({ ...payrollData, [employeeId]: updatedEntry });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {selectedPayslip && <PayslipModal employee={selectedPayslip.employee} payrollEntry={selectedPayslip.payrollEntry} onClose={() => setSelectedPayslip(null)} />}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><DollarSign className="mr-3" />Gestion de la Paie</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employé</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salaire Base</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heures Sup.</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Primes</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Déductions</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salaire Net</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => {
                            // FIX: Added missing employeeId to the default payroll entry object.
                            const entry = payrollData[employee.id] || {
                                employeeId: employee.id,
                                baseSalary: employee.salary,
                                overtimeHours: 0,
                                bonuses: 0,
                                deductions: 0,
                                netSalary: employee.salary,
                            };
                            return (
                                <tr key={employee.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm">{entry.baseSalary.toFixed(2)} €</td>
                                    <td className="px-4 py-4"><input type="number" value={entry.overtimeHours} onChange={e => handleInputChange(employee.id, 'overtimeHours', parseFloat(e.target.value))} className="w-20 p-1 border rounded" /></td>
                                    <td className="px-4 py-4"><input type="number" value={entry.bonuses} onChange={e => handleInputChange(employee.id, 'bonuses', parseFloat(e.target.value))} className="w-20 p-1 border rounded" /></td>
                                    <td className="px-4 py-4"><input type="number" value={entry.deductions} onChange={e => handleInputChange(employee.id, 'deductions', parseFloat(e.target.value))} className="w-20 p-1 border rounded" /></td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{entry.netSalary.toFixed(2)} €</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                                        <button onClick={() => setSelectedPayslip({ employee, payrollEntry: entry })} className="text-blue-600 hover:text-blue-800" title="Générer bulletin">
                                            <FileText size={20} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
             <div className="mt-6 flex justify-end">
                <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                    <Send size={20} className="mr-2" />
                    Valider et Payer
                </button>
            </div>
        </div>
    );
}
