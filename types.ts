
export enum Department {
  Reception = 'Réception',
  Cuisine = 'Cuisine',
  Entretien = 'Entretien',
  Securite = 'Sécurité',
  Administration = 'Administration',
  Bar = 'Bar',
}

export enum ContractType {
  CDI = 'CDI',
  CDD = 'CDD',
  Stage = 'Stage',
}

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Comptable = 'Comptable',
  Employe = 'Employé',
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  position: string;
  department: Department;
  hireDate: string;
  contractType: ContractType;
  email: string;
  phone: string;
  salary: number; // Salaire de base mensuel
  iban: string;
  history: EmployeeHistory[];
}

export interface EmployeeHistory {
  date: string;
  event: string;
  details: string;
}

export interface TimeEntry {
  employeeId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number;
}

export enum LeaveStatus {
  Pending = 'En attente',
  Approved = 'Approuvé',
  Rejected = 'Rejeté',
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface Payslip {
  id: string;
  employeeId: string;
  period: string; // e.g., "Juillet 2024"
  baseSalary: number;
  overtimeHours: number;
  overtimePay: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
}

export interface CurrentUser {
    name: string;
    role: UserRole;
    employeeId: string;
}
