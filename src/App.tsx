import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';

function App() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [todayOfferings, setTodayOfferings] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const { count: membersCount } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true });
        setTotalMembers(membersCount || 0);
        
        const today = new Date().toISOString().split('T')[0];
        const { data: offerings } = await supabase
          .from('offerings')
          .select('amount')
          .eq('offering_date', today);
        const total = offerings?.reduce((sum, o) => sum + (o.amount || 0), 0) || 0;
        setTodayOfferings(total);
        
        const { count: eventsCount } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true })
          .gte('start_date', today);
        setUpcomingEvents(eventsCount || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTopColor: '#059669', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Loading Olorieni Church System...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#059669', marginBottom: '1rem' }}>
            Olorieni Church Management System
          </h1>
          <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
            Welcome to Olorieni Lutheran Church - Arusha, Tanzania
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#6b7280' }}>Total Members</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{totalMembers}</div>
            </div>
            
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#6b7280' }}>Today's Offerings</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>TSh {todayOfferings.toLocaleString()}</div>
            </div>
            
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#6b7280' }}>Upcoming Events</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{upcomingEvents}</div>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Developer: Erick Juma | 0741681933 | Arusha, Tanzania
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
