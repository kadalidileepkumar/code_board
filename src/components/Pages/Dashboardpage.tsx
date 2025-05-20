// src/components/DashboardPage.tsx
import { Link } from '@tanstack/react-router';

export function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex gap-3">
          <Link to="/users/add-user" className="btn btn-primary">Add New User</Link>
          {/* Date range picker, etc. */}
        </div>
      </div>
      {/* Commits Overtime Chart */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        {/* Chart component here */}
        <div className="h-48 flex items-center justify-center text-gray-400">[Commits Over Time Chart]</div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-700 text-white rounded-lg p-4">
          <div className="text-lg font-bold">1244</div>
          <div>Total Commits</div>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-4">
          <div className="text-lg font-bold">24</div>
          <div>Total Users</div>
        </div>
        <div className="bg-orange-500 text-white rounded-lg p-4">
          <div className="text-lg font-bold">6</div>
          <div>Projects</div>
        </div>
        <div className="bg-purple-500 text-white rounded-lg p-4">
          <div className="text-lg font-bold">6</div>
          <div>Active Repositories</div>
        </div>
      </div>
      {/* Commit Frequency Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="font-bold">1244</div>
          <div>Per Day</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="font-bold">1244</div>
          <div>Per Week</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="font-bold">1244</div>
          <div>Per Month</div>
        </div>
      </div>
      {/* Commits Table */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="mb-2 flex items-center gap-3">
          {/* Filters, search, and Add Commit button */}
          <input className="border px-2 py-1 rounded" placeholder="Search..." />
          <button className="btn btn-primary ml-auto">+ Add Commit</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2">Project Name</th>
              <th>Month</th>
              <th>Date</th>
              <th>Time</th>
              <th>Line Of Codes</th>
              <th>Project Name</th>
              <th>Commit Links</th>
              <th>Commit Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample row */}
            <tr>
              <td>NYAYTECH</td>
              <td>01/04/2025</td>
              <td>21-Apr-2025</td>
              <td>12:16:00</td>
              <td>200</td>
              <td>admin.nyayatech.org</td>
              <td>
                <a href="#" className="text-blue-600 underline">Open Link</a>
              </td>
              <td>Update position of upload placeholder</td>
              <td>Actions</td>
            </tr>
            {/* ...more rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
