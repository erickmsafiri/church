import { UsersIcon, CurrencyDollarIcon, CalendarIcon, CheckCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Stats {
  totalMembers: number;
  totalOfferings: number;
  upcomingEvents: number;
  attendanceToday: number;
  pendingPrayers: number;
}

export default function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    { label: 'Total Members', value: stats.totalMembers, icon: UsersIcon, color: 'blue' },
    { label: 'Today\'s Offerings', value: `TSh ${stats.totalOfferings.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'green' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: CalendarIcon, color: 'yellow' },
    { label: 'Attendance Today', value: stats.attendanceToday, icon: CheckCircleIcon, color: 'purple' },
    { label: 'Pending Prayers', value: stats.pendingPrayers, icon: ChatBubbleLeftRightIcon, color: 'red' },
  ];

  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className={`border rounded-lg p-4 ${colorClasses[card.color as keyof typeof colorClasses]}`}>
          <div className="flex items-center justify-between">
            <card.icon className="w-8 h-8" />
            <span className="text-2xl font-bold">{card.value}</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">{card.label}</p>
        </div>
      ))}
    </div>
  );
}