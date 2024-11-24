'use client';

import { useEffect, useState } from 'react';
import { useModule } from '@/context/ModuleContext';

type Deployment = {
  project: string;
  status: string;
  timestamp: string;
  env: string;
};

type FetchError = {
  message: string;
};

// Accepting deployments as a prop
interface DeploymentsSectionProps {
  deployments: Deployment[];
}

const DeploymentsSection = ({ deployments }: DeploymentsSectionProps) => {
  const { selectedModule } = useModule();
  const [fetchedDeployments, setFetchedDeployments] = useState<Deployment[]>(deployments);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/${selectedModule}`);
        if (!response.ok) {
          const errorData: FetchError = await response.json();
          throw new Error(errorData.message || `Failed to fetch data for ${selectedModule}`);
        }
        const data: Deployment[] = await response.json();
        setFetchedDeployments(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedModule]);

  if (loading) return <p>Loading {selectedModule} data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (fetchedDeployments.length === 0) return <p>No data available for {selectedModule}</p>;

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">{selectedModule} - Data shall be fetched here</h2>
      {fetchedDeployments.map((item, index) => (
        <div key={index} className="border-b py-3">
          <h3>{item.project}</h3>
          <p>
            Status: {item.status} • {item.timestamp} • {item.env}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DeploymentsSection;
