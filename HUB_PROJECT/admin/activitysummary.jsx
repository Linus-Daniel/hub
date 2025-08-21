export default function ActivitySummary() {
  const recentApprovals = [
    {
      name: 'Sarah Johnson',
      role: 'UX Designer',
      university: 'Stanford University',
      date: 'Today',
      avatar: 'avatar-5.jpg'
    },
    // Other approvals...
  ];

  const recentRejections = [
    {
      name: 'Alex Thompson',
      role: 'Product Manager',
      reason: 'Incomplete profile',
      date: 'Yesterday',
      avatar: 'avatar-8.jpg'
    },
    // Other rejections...
  ];

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h2 className="text-navy font-montserrat font-bold text-lg mb-4">Activity Summary</h2>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-navy font-medium text-sm md:text-base">Recent Approvals</h3>
              <span className="text-xs text-gray-500">Last 7 days</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {recentApprovals.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img 
                    src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${item.avatar}`} 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full" 
                    alt="Profile" 
                  />
                  <div className="ml-2 md:ml-3">
                    <div className="font-medium text-navy text-sm md:text-base">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.role} • {item.university}</div>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            {/* Rejections section... */}
          </div>
        </div>
      </div>
    </section>
  );
}