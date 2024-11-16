interface DeploymentCardProps {
    project: string;
    status: string;
    timestamp: string;
  }
  
  const DeploymentCard = ({ project, status, timestamp }: DeploymentCardProps) => {
    return (
      <div className="bg-white shadow p-4 rounded mb-4">
        <h3 className="font-bold">{project}</h3>
        <p>{timestamp}</p>
        <span className={`text-sm ${status === 'Production' ? 'text-green-500' : 'text-gray-500'}`}>
          {status}
        </span>
      </div>
    );
  };
  
  export default DeploymentCard;
  