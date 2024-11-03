import React from 'react';

export default function PopupModal ({ title, message, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <p className="text-lg mb-6">{message}</p>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};


