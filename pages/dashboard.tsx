import '@/app/globals.css'; // Make sure this import is present at the top of your dashboard page

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import DeploymentCard from '@/components/DeploymentCard';
import ActivityFeed from '@/components/ActivityFeed';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <TopBar />
        <section className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Deployments</h2>
            <DeploymentCard project="Planetaria / ios-app" status="Production" timestamp="Deployed 3m ago" />
            <DeploymentCard project="Tailwind Labs / tailwindcss.com" status="Preview" timestamp="Initiated 5m ago" />
          </div>
          <ActivityFeed />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
