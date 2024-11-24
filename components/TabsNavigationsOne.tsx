import { useState } from 'react';

// Define the valid card names as a union type
type CardName =
  | 'Project List'
  | 'Add Project'
  | 'Edit Project'
  | 'Project Report'
  | 'Finance Report'
  | 'Inventory Report';

// Define the structure of card details
type CardDetails = {
  title: string;
  description: string;
  icon: string;
};

// Define the card details for each card
const cardDetails: Record<CardName, CardDetails> = {
  'Project List': { title: 'Project List', description: 'View all projects.', icon: '📋' },
  'Add Project': { title: 'Add Project', description: 'Add a new project to the system.', icon: '➕' },
  'Edit Project': { title: 'Edit Project', description: 'Modify existing projects.', icon: '✏️' },
  'Project Report': { title: 'Project Report', description: 'Detailed reports on projects.', icon: '📊' },
  'Finance Report': { title: 'Finance Report', description: 'Overview of financial.', icon: '💰' },
  'Inventory Report': { title: 'Inventory Report', description: 'Track inventory status.', icon: '📦' },
};

export default function TabsNavigationOne() {
  // The tabs that users can select
  const tabs: CardName[] = ['Project List', 'Add Project', 'Edit Project', 'Project Report', 'Finance Report', 'Inventory Report'];

  // State for the selected tab and card
  const [selectedCard, setSelectedCard] = useState<CardName | null>(null);

  return (
    <div className="p-6">
      {/* Tabs Navigation */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tabs.map((cardName) => {
          const card = cardDetails[cardName];
          return (
            <div
              key={cardName}
              onClick={() => setSelectedCard(cardName)}
              className={`cursor-pointer rounded-lg border p-4 shadow-sm hover:bg-gray-100 ${
                selectedCard === cardName ? 'bg-indigo-50 border-indigo-500' : 'bg-white'
              }`}
            >
              <div className="text-2xl">{card.icon}</div>
              <h3 className="mt-2 text-base font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Details Section */}
      {selectedCard && (
        <div className="mt-6 p-4 rounded-lg border bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Details for {cardDetails[selectedCard].title}
          </h2>
          <p className="mt-2 text-gray-700">
            This section displays detailed information or actions related to **{cardDetails[selectedCard].title}**. Customize this content as per your requirements.
          </p>
        </div>
      )}
    </div>
  );
}
