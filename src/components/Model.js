import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';

const Modal = ({ isOpen, closeModal, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <Description>{children}</Description>
          <div className="flex gap-4">
            <button onClick={closeModal} className="px-4 py-2 text-gray-500 border rounded hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={closeModal} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">
              Confirm
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
