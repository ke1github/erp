import { useState } from 'react';
import { FaProjectDiagram, FaServer, FaStream, FaCogs, FaHome, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  const [active, setActive] = useState('Deployments');

  const menuItems = [
    { name: 'Projects', icon: FaProjectDiagram },
    { name: 'Deployments', icon: FaServer },
    { name: 'Activity', icon: FaStream },
    { name: 'Domains', icon: FaHome },
    { name: 'Usage', icon: FaCogs },
    { name: 'Settings', icon: FaCogs },
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Navigation</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-4 p-3 rounded cursor-pointer ${active === item.name ? 'bg-gray-700' : ''}`}
            onClick={() => setActive(item.name)}
          >
            <item.icon />
            {item.name}
          </li>
        ))}
      </ul>
      <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2">
        <FaPlus /> New Project
      </button>
    </aside>
  );
};

export default Sidebar;
