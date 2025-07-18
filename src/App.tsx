import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import './App.css';

// Placeholder page components
const Dashboard = () => <div className="p-6">Dashboard Page</div>;
const Clients = () => <div className="p-6">Clients Page</div>;
const Files = () => <div className="p-6">Files Page</div>;
const Policies = () => <div className="p-6">Policies Page</div>;
const Claims = () => <div className="p-6">Claims Page</div>;
const Agents = () => <div className="p-6">Agents Page</div>;
const Settings = () => <div className="p-6">Settings Page</div>;

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col">
          <div className="h-16 flex items-center justify-center font-bold text-xl border-b">NaamanDesk</div>
          <nav className="flex-1 p-4 space-y-2">
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/dashboard">Dashboard</Link>
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/clients">Clients</Link>
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/files">Files</Link>
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/policies">Policies</Link>
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/claims">Claims</Link>
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/agents">Agents</Link>
            <Link className="block px-4 py-2 rounded hover:bg-gray-100" to="/settings">Settings</Link>
          </nav>
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
            <div className="font-semibold text-lg">Welcome to NaamanDesk</div>
            <div className="flex items-center space-x-4">
              {/* Placeholder for search, notifications, user profile */}
              <input className="border rounded px-2 py-1" placeholder="Search..." />
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </header>
          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/files" element={<Files />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
