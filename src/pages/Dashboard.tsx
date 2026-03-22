import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import StatsCards from '../components/Dashboard/StatsCards';
import Charts from '../components/Dashboard/Charts';

interface Stats {
  totalMembers: number;
  totalOfferings: number;
  upcomingEvents: number;
  attendanceToday: number;
  pendingPrayers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalMembers: 0,
    totalOfferings: 0,
    upcomingEvents: 0,
    attendanceToday: 0,
    pendingPrayers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      
      const [{ count: members }, { count: offerings }, { count: events }, { count: attendance }, { count: prayers }] = await Promise.all([
        supabase.from('members').select('*', { count: 'exact', head: true }),
        supabase.from('offerings').select('amount').eq('offering_date', new Date().toISOString().split('T')[0]),
        supabase.from('events').select('*', { count: 'exact', head: true }).gte('start_date', new Date().toISOString().split('T')[0]),
        supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('service_date', new Date().toISOString().split('T')[0]),
        supabase.from('prayer_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);
      
      const totalOfferings = offerings.data?.reduce((sum, o) => sum + (o.amount || 0), 0) || 0;
      
      setStats({
        totalMembers: members || 0,
        totalOfferings,
        upcomingEvents: events || 0,
        attendanceToday: attendance || 0,
        pendingPrayers: prayers || 0,
      });
      
      setLoading(false);
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <StatsCards stats={stats} />
      <Charts stats={stats} />
    </div>
  );
}