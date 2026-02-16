import { LogOut, AlertTriangle } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] animate-in fade-in duration-200" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[130] animate-in zoom-in-95 fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-description"
      >
        <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] border border-red-500/30 rounded-2xl shadow-2xl p-8 mx-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-8 h-8 text-red-400" />
          </div>

          {/* Content */}
          <h2 id="logout-title" className="text-2xl font-bold text-white text-center mb-3">
            Confirm Logout
          </h2>
          <p id="logout-description" className="text-gray-400 text-center mb-8">
            Are you sure you want to log out of your SENTRIA dashboard? You will need to sign in again to access your account.
          </p>

          {/* Warning */}
          <div className="p-4 bg-red-500/10 rounded-xl border border-red-400/20 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300">
                  Any unsaved changes will be lost. Make sure to save your work before logging out.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl transition-all border border-blue-400/20"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}