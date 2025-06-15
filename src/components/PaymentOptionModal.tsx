import React from "react";

type Props = {
  onDummyBooking: () => void;
  onRazorpay: () => void;
  onCancel: () => void;
};

const PaymentOptionModal: React.FC<Props> = ({ onDummyBooking, onRazorpay, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Choose Payment Option</h2>
        <p className="text-gray-600 mb-4">
          If you have money, go ahead and pay 💸.<br />
          Otherwise, confirm a dummy booking 😉.
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={onRazorpay}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Pay via Razorpay
          </button>
          <button
            onClick={onDummyBooking}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Confirm Dummy Booking
          </button>
          <button
            onClick={onCancel}
            className="text-red-500 text-sm underline mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionModal;
