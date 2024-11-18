import { NextResponse } from 'next/server';

type Project = {
  id: string;
  name: string;
  status: string;
  timestamp: string;
  env: string;
};

// Sample data
const projects: Project[] = [
  { id: '1', name: 'Project Alpha', status: 'Completed', timestamp: '2024-11-17', env: 'Production' },
  { id: '2', name: 'Project Beta', status: 'In Progress', timestamp: '2024-11-18', env: 'Staging' },
  { id: '3', name: 'Project Gamma', status: 'Pending', timestamp: '2024-11-19', env: 'Development' },
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(projects);
}

// Handle POST requests
export async function POST(request: Request) {
  const newProject: Project = await request.json();
  projects.push({ ...newProject, id: String(projects.length + 1) });
  return NextResponse.json({ message: 'Project added successfully', project: newProject }, { status: 201 });
}
