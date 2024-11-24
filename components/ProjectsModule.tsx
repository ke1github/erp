'use client';

const projects = [
  { 
    nitNo: 'NIT-001', 
    workOrderNo: 'WO-1234', 
    workOrderDate: '2024-01-10', 
    projectAuthority: 'Green Energy Corp', 
    projectAddress: '123 Solar Street, Sector 21', 
    city: 'Solar City', 
    latitude: '28.6139', 
    longitude: '77.2090', 
    description: 'Installation of 5MW solar panels', 
    remarks: 'In progress', 
    status: 'In Progress', 
  },
  { 
    nitNo: 'NIT-002', 
    workOrderNo: 'WO-12345', 
    workOrderDate: '2024-01-10', 
    projectAuthority: 'Green Energy Corp', 
    projectAddress: '123 Solar Street, Sector 21', 
    city: 'Solar City', 
    latitude: '28.6139', 
    longitude: '77.2090', 
    description: 'Installation of 5MW solar panels', 
    remarks: 'In progress', 
    status: 'In Progress', 
  },
  { 
    nitNo: 'NIT-003', 
    workOrderNo: 'WO-1234', 
    workOrderDate: '2024-01-10', 
    projectAuthority: 'Green Energy Corp', 
    projectAddress: '123 Solar Street, Sector 21', 
    city: 'Solar City', 
    latitude: '28.6139', 
    longitude: '77.2090', 
    description: 'Installation of 5MW solar panels', 
    remarks: 'In progress', 
    status: 'In Progress', 
  },
  // Add more projects as needed...
];

export default function ProjectsTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all ongoing projects, including their details such as NIT number, work order information, location, and more.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Project
          </button>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">NIT No</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Work Order No.</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Work Order Date</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Project Authority</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Project Address</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Latitude</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Longitude</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Remarks</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {projects.map((project) => (
              <tr key={project.nitNo}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{project.nitNo}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.workOrderNo}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.workOrderDate}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.projectAuthority}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.projectAddress}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.city}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.latitude}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.longitude}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.description}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.remarks}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.status}</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {project.nitNo}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
