import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, type Endorsement } from '@/lib/supabase';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      navigate('/admin/login');
      return;
    }

    // Load endorsements only if authenticated
    if (user) {
      loadEndorsements();
    }
  }, [user, loading, navigate]);

  const loadEndorsements = async () => {
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
    } catch (err) {
      console.error('Error loading endorsements:', err);
    }
  };

  const handleApprove = async (endorsement: Endorsement) => {
    try {
      const { error } = await supabase
        .from('endorsements')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', endorsement.id);

      if (error) throw error;

      await loadEndorsements();
      setSelectedEndorsement(null);
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

      await loadEndorsements();
      setSelectedEndorsement(null);
    } catch (err) {
      console.error('Error rejecting endorsement:', err);
      alert('Failed to reject endorsement. Please try again.');
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
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo .png" alt="Logo" className="h-10 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                {user && <p className="text-sm text-gray-600">{user.email}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
          <>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
        </div>

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
                    
                    {endorsement.status === 'pending' && (
                      <div className="space-x-3">
                        <button
                          onClick={() => handleApprove(endorsement)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(endorsement)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
