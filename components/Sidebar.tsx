import { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineDashboard, AiOutlineFileText } from 'react-icons/ai';
import { FaProjectDiagram, FaUsers, FaClipboardList, FaWarehouse } from 'react-icons/fa';
import { useModule } from '@/context/ModuleContext';

function Sidebar() {
  const { setSelectedModule, selectedModule } = useModule();

  // Set "dashboard" as the default selected module on initial load
  useEffect(() => {
    if (!selectedModule) {
      setSelectedModule('dashboard');
    }
  }, [selectedModule, setSelectedModule]);

  const handleModuleChange = (module: string) => {
    setSelectedModule(module);
  };

  return (
    <aside className="bg-gray-900 text-white w-64 p-6 min-h-screen flex flex-col">
       {/* Brand Logo - Now Clickable */}
      <Link href="/" onClick={() => handleModuleChange('home')}>
        <h2 className="text-2xl font-bold mb-10 cursor-pointer hover:text-blue-400">SolarPanti</h2>
      </Link>

            {/* Navigation Links */}
      <nav className="space-y-6 flex-1">
        <Link href="#" onClick={() => handleModuleChange('dashboard')}>
          <div className={`flex items-center p-3 ${selectedModule === 'dashboard' ? 'bg-gray-800' : ''}`}>
            <AiOutlineDashboard className="mr-3" /> Dashboard
          </div>
        </Link>
        <Link href="#" onClick={() => handleModuleChange('projects')}>
          <div className={`flex items-center p-3 ${selectedModule === 'projects' ? 'bg-gray-800' : ''}`}>
            <FaProjectDiagram className="mr-3" /> Projects
          </div>
        </Link>
        <Link href="#" onClick={() => handleModuleChange('procurement')}>
          <div className={`flex items-center p-3 ${selectedModule === 'procurement' ? 'bg-gray-800' : ''}`}>
            <FaClipboardList className="mr-3" /> Procurement
          </div>
        </Link>
        <Link href="#" onClick={() => handleModuleChange('inventory')}>
          <div className={`flex items-center p-3 ${selectedModule === 'inventory' ? 'bg-gray-800' : ''}`}>
            <FaWarehouse className="mr-3" /> Inventory
          </div>
        </Link>
        <Link href="#" onClick={() => handleModuleChange('users')}>
          <div className={`flex items-center p-3 ${selectedModule === 'users' ? 'bg-gray-800' : ''}`}>
            <FaUsers className="mr-3" /> Users
          </div>
        </Link>
        <Link href="#" onClick={() => handleModuleChange('reports')}>
          <div className={`flex items-center p-3 ${selectedModule === 'reports' ? 'bg-gray-800' : ''}`}>
            <AiOutlineFileText className="mr-3" /> Reports
          </div>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
