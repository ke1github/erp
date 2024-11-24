'use client';

import { useState } from 'react';

type Requisition = {
  id: string;
  description: string;
  requestedBy: string;
  department: string;
  status: string;
  date: string;
};

const mockRequisitions: Requisition[] = [
  { id: 'REQ-001', description: 'Office Supplies', requestedBy: 'Alice', department: 'Admin', status: 'Pending', date: '2024-11-01' },
  { id: 'REQ-002', description: 'Project Tools', requestedBy: 'Bob', department: 'Engineering', status: 'Approved', date: '2024-11-02' },
];

export default function Requisitions() {
  const [requisitions, setRequisitions] = useState(mockRequisitions);
  const [showForm, setShowForm] = useState(false);

  // Handlers for form submission (placeholder for now)
  const handleAddRequisition = () => {
    setShowForm(false);
  };

  console.log(setRequisitions);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Requisitions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Add Requisition
        </button>
      </div>

      {/* Table for Requisitions */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requisition ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requisitions.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4">{req.id}</td>
                <td className="px-6 py-4">{req.description}</td>
                <td className="px-6 py-4">{req.requestedBy}</td>
                <td className="px-6 py-4">{req.department}</td>
                <td className="px-6 py-4">{req.status}</td>
                <td className="px-6 py-4">{req.date}</td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Requisition Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add New Requisition</h2>
            <form onSubmit={handleAddRequisition}>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="department"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option>Admin</option>
                  <option>Engineering</option>
                  <option>HR</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
