import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, type Endorsement, type Volunteer } from '@/lib/supabase';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'endorsements' | 'volunteers'>('endorsements');
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  
  const [volLoading, setVolLoading] = useState(false);
  const [showAddEndorsement, setShowAddEndorsement] = useState(false);
  const [newEndorsement, setNewEndorsement] = useState({
    name: '',
    title: '',
    location: '',
    content: '',
    email: ''
  });

  const exportVolunteersToCSV = () => {
    if (volunteers.length === 0) {
      alert('No volunteer data to export.');
      return;
    }

    // CSV headers
    const headers = ['Name', 'Email', 'Phone', 'State', 'LGA', 'Message', 'Submitted Date'];
    
    // CSV rows
    const rows = volunteers.map(vol => [
      vol.name,
      vol.email,
      vol.phone,
      vol.state,
      vol.lga,
      `"${vol.message.replace(/"/g, '""')}"`, // Escape quotes in message
      vol.created_at ? new Date(vol.created_at).toLocaleString() : 'N/A'
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `volunteers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportVolunteersToJSON = () => {
    if (volunteers.length === 0) {
      alert('No volunteer data to export.');
      return;
    }

    const jsonContent = JSON.stringify(volunteers, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `volunteers_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      navigate('/admin/login');
      return;
    }

    // Load data only if authenticated
    if (user) {
      loadEndorsements();
      loadVolunteers();
      
      // Auto-refresh every 30 seconds
      const interval = setInterval(() => {
        loadEndorsements();
        loadVolunteers();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user, loading, navigate]);

  const loadEndorsements = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const { data, error } = await supabase
        .from('endorsements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedData = data.map(item => ({
          ...item,
          submittedAt: item.created_at || ''
        }));
        setEndorsements(formattedData as Endorsement[]);
      }
    } catch (err: any) {
      console.error('Error loading endorsements:', err);
      setLoadError(err.message || 'Failed to load endorsements. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadVolunteers = async () => {
    setVolLoading(true);
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) setVolunteers(data as Volunteer[]);
    } catch (err: any) {
      console.error('Error loading volunteers:', err);
      // don't surface to main load error box
    } finally {
      setVolLoading(false);
    }
  };

  const handleDeleteVolunteer = async (vol: Volunteer) => {
    if (!confirm(`Delete volunteer entry from ${vol.name}? This action cannot be undone.`)) return;
    try {
      const { error } = await supabase.from('volunteers').delete().eq('id', vol.id);
      if (error) throw error;
      setVolunteers(prev => prev.filter(v => v.id !== vol.id));
      setSuccessMessage(`Volunteer ${vol.name} removed.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Failed to delete volunteer:', err);
      alert('Failed to delete volunteer. Please try again.');
    }
  };
 

  const handleApprove = async (endorsement: Endorsement) => {
    try {
      const { error } = await supabase
        .from('endorsements')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', endorsement.id);

      if (error) throw error;

      setSuccessMessage(`✅ Endorsement from ${endorsement.name} has been approved! It will now appear in the testimonials section.`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
      await loadEndorsements();
    } catch (err) {
      console.error('Error approving endorsement:', err);
      alert('Failed to approve endorsement. Please try again.');
    }
  };

  const handleReject = async (endorsement: Endorsement) => {
    try {
      const { error } = await supabase
        .from('endorsements')
        .update({ status: 'rejected', updated_at: new Date().toISOString() })
        .eq('id', endorsement.id);

      if (error) throw error;

      setSuccessMessage(`❌ Endorsement from ${endorsement.name} has been rejected.`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
      await loadEndorsements();
    } catch (err) {
      console.error('Error rejecting endorsement:', err);
      alert('Failed to reject endorsement. Please try again.');
    }
  };

  const handleDeleteEndorsement = async (endorsement: Endorsement) => {
    if (!confirm(`Delete endorsement from ${endorsement.name}? This action cannot be undone.`)) return;
    try {
      const { error } = await supabase
        .from('endorsements')
        .delete()
        .eq('id', endorsement.id);

      if (error) throw error;

      setSuccessMessage(`🗑️ Endorsement from ${endorsement.name} has been deleted.`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
      await loadEndorsements();
    } catch (err) {
      console.error('Error deleting endorsement:', err);
      alert('Failed to delete endorsement. Please try again.');
    }
  };

  const handleAddEndorsement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('endorsements')
        .insert([{
          ...newEndorsement,
          status: 'approved' // Directly approve admin-added endorsements
        }]);

      if (error) throw error;

      setSuccessMessage(`✅ Endorsement from ${newEndorsement.name} has been added and approved!`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
      setNewEndorsement({ name: '', title: '', location: '', content: '', email: '' });
      setShowAddEndorsement(false);
      await loadEndorsements();
    } catch (err) {
      console.error('Error adding endorsement:', err);
      alert('Failed to add endorsement. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const filteredEndorsements = endorsements.filter(e => 
    filter === 'all' ? true : e.status === filter
  );

  const stats = {
    pending: endorsements.filter(e => e.status === 'pending').length,
    approved: endorsements.filter(e => e.status === 'approved').length,
    rejected: endorsements.filter(e => e.status === 'rejected').length,
    volunteers: volunteers.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo .png" alt="Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-3xl font-serif font-bold text-blue-900">Admin Dashboard</h1>
                {user && <p className="text-sm text-gray-600">{user.email}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                ← Back to Website
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        ) : !user ? null : (
          <div>
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 animate-pulse">
            <p className="text-green-800 font-medium text-center">{successMessage}</p>
          </div>
  )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="text-yellow-600 text-3xl font-bold">{stats.pending}</div>
            <div className="text-yellow-800 font-medium">Pending Review</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="text-green-600 text-3xl font-bold">{stats.approved}</div>
            <div className="text-green-800 font-medium">Approved</div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <div className="text-red-600 text-3xl font-bold">{stats.rejected}</div>
            <div className="text-red-800 font-medium">Rejected</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="text-blue-600 text-3xl font-bold">{stats.volunteers}</div>
            <div className="text-blue-800 font-medium">Volunteers</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('endorsements')}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === 'endorsements'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Endorsements
            </button>
            <button
              onClick={() => setActiveTab('volunteers')}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === 'volunteers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Join the Movement
            </button>
          </div>
        </div>

        {/* Endorsements Tab */}
        {activeTab === 'endorsements' && (
          <>
        {/* Filter Tabs with Refresh and Add Button */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    filter === f
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddEndorsement(!showAddEndorsement)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Endorsement</span>
              </button>
              <button
                onClick={loadEndorsements}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Endorsement Form */}
        {showAddEndorsement && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Endorsement</h3>
            <form onSubmit={handleAddEndorsement} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newEndorsement.name}
                    onChange={(e) => setNewEndorsement({...newEndorsement, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Title/Position *</label>
                  <input
                    type="text"
                    required
                    value={newEndorsement.title}
                    onChange={(e) => setNewEndorsement({...newEndorsement, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Title or position"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={newEndorsement.location}
                    onChange={(e) => setNewEndorsement({...newEndorsement, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Location"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={newEndorsement.email}
                    onChange={(e) => setNewEndorsement({...newEndorsement, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Endorsement Content *</label>
                <textarea
                  required
                  rows={4}
                  value={newEndorsement.content}
                  onChange={(e) => setNewEndorsement({...newEndorsement, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Endorsement message..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
                >
                  Add & Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddEndorsement(false);
                    setNewEndorsement({ name: '', title: '', location: '', content: '', email: '' });
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Load Error */}
        {loadError && (
          <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-xl p-4">
            <p className="text-red-800 font-medium">{loadError}</p>
          </div>
        )}

        {/* Endorsements List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredEndorsements.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No endorsements found in this category.
            </div>
          ) : (
            <div className="divide-y">
              {filteredEndorsements.map((endorsement) => (
                <div key={endorsement.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{endorsement.name}</h3>
                      <p className="text-gray-600">{endorsement.title} • {endorsement.location}</p>
                      <p className="text-sm text-gray-500">{endorsement.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        endorsement.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : endorsement.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {endorsement.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{endorsement.content}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Submitted: {endorsement.created_at ? new Date(endorsement.created_at).toLocaleString() : 'N/A'}
                    </span>
                    
                    <div className="space-x-3">
                      {endorsement.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(endorsement)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(endorsement)}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteEndorsement(endorsement)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
              <div className="text-lg font-semibold">Join the Movement Submissions</div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={exportVolunteersToCSV}
                  disabled={volunteers.length === 0}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={exportVolunteersToJSON}
                  disabled={volunteers.length === 0}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={loadVolunteers}
                  disabled={volLoading}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  <svg className={`w-5 h-5 ${volLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{volLoading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {volunteers.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No volunteer submissions yet.</div>
              ) : (
                <div className="divide-y">
                  {volunteers.map((vol) => (
                    <div key={vol.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{vol.name}</h3>
                          <p className="text-gray-600">{vol.state} • {vol.lga}</p>
                          <p className="text-sm text-gray-500">{vol.phone} • {vol.email}</p>
                        </div>
                        <div className="space-x-3">
                          <a href={`mailto:${vol.email}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Email</a>
                          <button onClick={() => handleDeleteVolunteer(vol)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Delete</button>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{vol.message}</p>
                      <div className="text-sm text-gray-500">Submitted: {vol.created_at ? new Date(vol.created_at).toLocaleString() : 'N/A'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
