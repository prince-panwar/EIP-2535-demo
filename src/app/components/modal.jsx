import React from 'react';

function Modal({ show, onClose, isTransactionPending, isTransactionError, isTransactionSuccess, hash }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 float-right"
        >
          X
        </button>
        <div className="mt-4">
          {isTransactionPending && (
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              <p className="mt-2 text-gray-700">Transaction is pending...</p>
            </div>
          )}
          {isTransactionSuccess && (
            <div className="flex flex-col items-center">
              <svg
                className="h-8 w-8 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="mt-2 text-gray-700">Transaction successful!</p>
              <a
                href={`https://testnet.bscscan.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-1"
              >
                View on binancescan
              </a>
            </div>
          )}
          {isTransactionError && (
            <div className="flex flex-col items-center">
              <svg
                className="h-8 w-8 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="mt-2 text-gray-700">Transaction failed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
