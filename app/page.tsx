'use client';

import {useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNavigation from '@/components/TopNavigation';
import DeploymentsSection from '@/components/DeploymentsSection';
import TabsNavigation from '@/components/TabsNavigation';
import '@/app/globals.css';

type Deployment = {
  project: string;
  status: string;
  timestamp: string;
  env: string;
};

export default function Dashboard() {
  const [deployments] = useState<Deployment[]>([
    { project: "Planetaria", status: "Deployed", timestamp: "3m ago", env: "Production" },
    { project: "Tailwind Labs", status: "Initiated", timestamp: "5m ago", env: "Preview" },
  ]);
 

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <TopNavigation />
        <TabsNavigation />
        <div className="flex justify-center mt-8">
          <div className="w-full lg:w-2/3">
            <DeploymentsSection deployments={deployments} />
          </div>
        </div>
      </div>
    </div>
  );
}
