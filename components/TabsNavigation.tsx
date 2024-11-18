'use client';

import { useState } from 'react';

type Tab = {
  name: string;
  href: string;
};

const tabs: Tab[] = [
  { name: 'My Account', href: '#account' },
  { name: 'Company', href: '#company' },
  { name: 'Team Members', href: '#team' },
  { name: 'Billing', href: '#billing' },
];

// Utility function to conditionally apply classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TabsNavigation() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="p-4">
      {/* Mobile Dropdown for Tabs */}
      <div className="sm:hidden mb-6">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          value={selectedTab}
          onChange={(e) => handleTabClick(e.target.value)}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex divide-x divide-gray-200 rounded-lg shadow">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              aria-current={selectedTab === tab.name ? 'page' : undefined}
              className={classNames(
                selectedTab === tab.name ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  selectedTab === tab.name ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Dynamic Content Based on Selected Tab */}
      <div className="mt-6 p-4 bg-white shadow rounded">
        {selectedTab === 'My Account' && <div>Account Content</div>}
        {selectedTab === 'Company' && <div>Company Content</div>}
        {selectedTab === 'Team Members' && <div>Team Members Content</div>}
        {selectedTab === 'Billing' && <div>Billing Content</div>}
      </div>
    </div>
  );
}
