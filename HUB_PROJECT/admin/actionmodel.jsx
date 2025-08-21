export default function ActionModals({ type, onClose, onAction, profileName }) {
  const modalConfigs = {
    approve: {
      icon: 'check',
      color: 'teal',
      title: 'Approve Profile',
      description: `Are you sure you want to approve ${profileName}'s profile? This will make the profile visible on the talent platform.`,
      actionText: 'Confirm Approval'
    },
    reject: {
      icon: 'xmark',
      color: 'danger',
      title: 'Reject Profile',
      description: `Please provide a reason for rejecting ${profileName}'s profile. This feedback will be shared with the applicant.`,
      actionText: 'Confirm Rejection',
      hasTextarea: true
    },
    requestEdits: {
      icon: 'pen',
      color: 'gold',
      title: 'Request Profile Edits',
      description: 'Specify what changes are needed before this profile can be approved.',
      actionText: 'Send Request',
      hasCheckboxes: true,
      hasTextarea: true
    }
  };

  const config = modalConfigs[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 md:p-6 mx-4">
        <div className="text-center mb-4 md:mb-6">
          <div className={`w-12 h-12 md:w-16 md:h-16 bg-${config.color} bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
            <i className={`text-xl md:text-2xl text-${config.color} fas fa-${config.icon}`} />
          </div>
          <h3 className="text-navy font-montserrat font-bold text-lg md:text-xl">{config.title}</h3>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">{config.description}</p>
        </div>

        {config.hasTextarea && (
          <div className="mb-3 md:mb-4">
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-gold h-24 md:h-32 text-sm md:text-base"
              placeholder={type === 'reject' ? 'Reason for rejection...' : 'Additional details about requested changes...'}
            />
          </div>
        )}

        {config.hasCheckboxes && (
          <div className="mb-3 md:mb-4 space-y-2">
            <label className="flex items-center text-sm md:text-base">
              <input type="checkbox" className="mr-2" />
              <span>Portfolio samples (need more examples)</span>
            </label>
            {/* Other checkboxes... */}
          </div>
        )}

        <div className="flex justify-center space-x-2 md:space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-1 md:px-6 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={() => onAction(type)}
            className={`px-4 py-1 md:px-6 md:py-2 bg-${config.color} text-white rounded-lg text-xs md:text-sm`}
          >
            {config.actionText}
          </button>
        </div>
      </div>
    </div>
  );
}