
import React from 'react';
import { Settings as SettingsIcon, Shield, Database, Bell } from 'lucide-react';

export default function Settings() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <SettingsIcon className="mr-3" /> Paramètres
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><Shield className="mr-2 text-blue-500" /> Sécurité et Accès</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gestion des rôles</label>
                            <p className="text-sm text-gray-500">Définir les permissions pour Admin, Manager, etc.</p>
                            <button className="mt-2 text-sm text-blue-600 hover:underline">Configurer les rôles</button>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Authentification à deux facteurs (2FA)</label>
                            <p className="text-sm text-gray-500">Renforcez la sécurité des comptes.</p>
                            <button className="mt-2 text-sm text-blue-600 hover:underline">Activer 2FA</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><Database className="mr-2 text-green-500" /> Données et Sauvegardes</h2>
                     <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sauvegarde automatique</label>
                            <p className="text-sm text-gray-500">Dernière sauvegarde: Aujourd'hui à 02:00.</p>
                             <button className="mt-2 text-sm text-blue-600 hover:underline">Lancer une sauvegarde manuelle</button>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Exporter les données</label>
                            <p className="text-sm text-gray-500">Exporter les données des employés au format CSV.</p>
                            <button className="mt-2 text-sm text-blue-600 hover:underline">Exporter</button>
                        </div>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><Bell className="mr-2 text-yellow-500" /> Notifications</h2>
                     <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notifications par e-mail</label>
                            <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-600">Activer pour les validations de congés</span>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Notifications in-app</label>
                             <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-600">Activer pour les nouvelles annonces</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
