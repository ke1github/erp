'use client';

import { useState } from 'react';
import Requisitions from './Requisitions';

export default function ProcurementDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Requisitions', 'Vendors', 'Purchase Orders', 'Approvals'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <div>Procurement overview and analytics.</div>;
      case 'Requisitions':
        return <div> <Requisitions/></div>;
      case 'Vendors':
        return <div>Vendor management table and form.</div>;
      case 'Purchase Orders':
        return <div>Purchase order details and creation form.</div>;
      case 'Approvals':
        return <div>Approval requests and decision panel.</div>;
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Procurement Module</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow p-6 rounded-lg">{renderContent()}</div>
    </div>
  );
}
