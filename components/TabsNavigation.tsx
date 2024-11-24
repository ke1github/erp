'use client';

import { useState } from 'react';

// Define Tab type and data
type Tab = {
  name: string;
  href: string;
  content: React.ReactNode;
};

const tabs: Tab[] = [
  { name: 'JREDA', href: '#jreda', content: <div>JREDA Content</div> },
  { name: 'Highmast', href: '#highmast', content: <div>Highmast Content</div> },
  { name: 'Street Light', href: '#street-light', content: <div>Street Light Content</div> },
  { name: 'Rooftop', href: '#Rooftop', content: <div>Rooftop Content</div> },
  { name: 'Team Members', href: '#team-members', content: <div>Team Members Content</div> },
  { name: 'Mega Projects', href: '#mega-projects', content: <div>Mega Projects Content</div> },
    { name: 'NON-JREDA', href: '#NON-JREDA', content: <div>NON-JREDA Content</div> },

];

// Utility function for conditional class application
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TabsNavigation() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  // Find the currently selected tab's content
  const activeTab = tabs.find((tab) => tab.name === selectedTab);

  return (
    <div className="p-4">
      {/* Mobile Dropdown for Tabs */}
      <div className="sm:hidden mb-6">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
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
              aria-selected={selectedTab === tab.name}
              className={classNames(
                selectedTab === tab.name
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700',
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
        {activeTab?.content || <div>No content available</div>}
      </div>
    </div>
  );
}
