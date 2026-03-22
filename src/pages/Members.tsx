import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Member {
  id: number;
  member_number: string;
  first_name: string;
  last_name: string;
  phone: string;
  join_date: string;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    join_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchMembers();
  }, [search]);

  const fetchMembers = async () => {
    setLoading(true);
    let query = supabase.from('members').select('*').order('created_at', { ascending: false });
    
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,member_number.ilike.%${search}%`);
    }
    
    const { data } = await query;
    setMembers(data || []);
    setLoading(false);
  };

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const year = new Date().getFullYear().toString().slice(-2);
    const { data: existing } = await supabase.from('members').select('member_number').like('member_number', `EM${year}%`);
    const count = (existing?.length || 0) + 1;
    const member_number = `EM${year}${String(count).padStart(4, '0')}`;
    
    const { error } = await supabase.from('members').insert({
      ...formData,
      member_number,
    });
    
    if (!error) {
      setShowForm(false);
      setFormData({ first_name: '', last_name: '', phone: '', join_date: new Date().toISOString().split('T')[0] });
      fetchMembers();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Members</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
        >
          <PlusIcon className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or member number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0a0c10] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Members Table */}
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1a1c22] border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Member #</th>
              <th className="text-left p-4 text-gray-400 font-medium">Name</th>
              <th className="text-left p-4 text-gray-400 font-medium">Phone</th>
              <th className="text-left p-4 text-gray-400 font-medium">Join Date</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center p-8 text-gray-500">Loading...</td></tr>
            ) : members.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-8 text-gray-500">No members found</td></tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-gray-300">{member.member_number}</td>
                  <td className="p-4 text-white">{member.first_name} {member.last_name}</td>
                  <td className="p-4 text-gray-300">{member.phone || '-'}</td>
                  <td className="p-4 text-gray-300">{new Date(member.join_date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button className="text-green-500 hover:text-green-400">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0c10] border border-white/10 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Add New Member</h2>
            <form onSubmit={addMember}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="date"
                  value={formData.join_date}
                  onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}