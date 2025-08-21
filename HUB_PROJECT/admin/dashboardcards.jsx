export default function DashboardCards() {
  const cards = [
    {
      id: 'pending',
      title: 'Pending Profiles',
      count: '12',
      description: 'Awaiting review',
      icon: 'clock',
      color: 'gold',
      linkText: 'View pending profiles'
    },
    {
      id: 'approved',
      title: 'Approved Profiles',
      count: '48',
      description: 'Live on platform',
      icon: 'check',
      color: 'teal',
      linkText: 'View approved profiles'
    },
    // Other cards...
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map(card => (
          <div key={card.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="text-navy font-montserrat font-bold text-sm md:text-base">{card.title}</h3>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-${card.color} bg-opacity-20 flex items-center justify-center`}>
                <i className={`text-${card.color} fas fa-${card.icon}`} />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-montserrat font-bold text-navy">{card.count}</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">{card.description}</div>
            <div className="mt-3 md:mt-4">
              <button className="text-gold text-xs md:text-sm flex items-center">
                {card.linkText}
                <i className="ml-1 text-xs fas fa-arrow-right" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}