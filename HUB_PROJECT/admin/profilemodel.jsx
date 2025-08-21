import { useState } from 'react';
import ActionModals from './ActionModals';

export default function ProfileModal({ profile, onClose }) {
  const [activeModal, setActiveModal] = useState(null);

  const openActionModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeActionModal = () => {
    setActiveModal(null);
  };

  const handleAction = (actionType) => {
    // Handle approve/reject/edit request logic
    onClose();
    closeActionModal();
  };

  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Modal content... */}
        
        <div className="p-4 md:p-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex space-x-2">
            <button 
              onClick={() => openActionModal('requestEdits')}
              className="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm"
            >
              Request Edits
            </button>
            <button 
              onClick={() => openActionModal('reject')}
              className="px-3 py-1 md:px-4 md:py-2 bg-danger text-white rounded-lg text-xs md:text-sm"
            >
              Reject
            </button>
          </div>
          <button 
            onClick={() => openActionModal('approve')}
            className="px-4 py-2 bg-teal text-white rounded-lg text-sm w-full md:w-auto"
          >
            Approve Profile
          </button>
        </div>
      </div>

      {activeModal && (
        <ActionModals 
          type={activeModal} 
          onClose={closeActionModal} 
          onAction={handleAction} 
          profileName={profile.name}
        />
      )}
    </div>
  );
}