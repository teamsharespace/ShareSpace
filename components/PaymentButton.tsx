import { useState } from 'react';

interface PaymentButtonProps {
  amount: number;
}

export default function PaymentButton({ amount }: PaymentButtonProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [error, setError] = useState('');

  const initializeRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const validateMobileNumber = (number: string) => /^[0-9]{10}$/.test(number);

  const handleMobileSubmit = async () => {
    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    await makePayment();
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    try {
      const data = await fetch('/api/bookings/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      }).then((t) => t.json());

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: 'SpaceShere',
        description: 'Transaction Description',
        order_id: data.id,
        handler: async function (response: any) {
          const verificationData = await fetch('/api/bookings/verifyOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }).then((t) => t.json());

          if (verificationData.message === 'Payment verified successfully') {
            alert('Payment successful');
            setShowMobileInput(false);
          }
        },
        prefill: { name: 'Customer Name', email: 'customer@email.com', contact: mobileNumber },
        theme: { color: '#2563EB' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong with the payment');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!showMobileInput ? (
        <button
          onClick={() => setShowMobileInput(true)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          Pay ₹{amount}
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Enter Mobile Number</h2>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="10-digit mobile number"
            className="mt-3 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={10}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleMobileSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 transition duration-300"
            >
              Proceed to Pay
            </button>
            <button
              onClick={() => {
                setShowMobileInput(false);
                setError('');
                setMobileNumber('');
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
