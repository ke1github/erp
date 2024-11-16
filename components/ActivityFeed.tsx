const ActivityFeed = () => {
    const activities = [
      { user: 'Cosetta Dusett', action: 'Pushed to ios-app', time: '30s' },
      { user: 'Pammi Kakani', action: 'Pushed to mobile-api', time: '3m' },
      { user: 'Kora Grisostomo', action: 'Pushed to ios-app', time: '4m' },
    ];
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index} className="mb-4">
              <p>
                <strong>{activity.user}</strong> {activity.action}
              </p>
              <span className="text-gray-500">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ActivityFeed;
  