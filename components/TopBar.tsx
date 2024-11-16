const TopBar = () => {
    return (
      <div className="flex justify-between items-center bg-white shadow p-4">
        <input
          type="text"
          placeholder="Search projects..."
          className="border p-2 rounded w-1/3"
        />
        <div className="flex gap-6">
          <a href="#">Documentation</a>
          <a href="#">Community</a>
          <a href="#">Support</a>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded">+ New Project</button>
      </div>
    );
  };
  
  export default TopBar;
  