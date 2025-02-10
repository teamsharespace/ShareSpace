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

  const validateMobileNumber = (number: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
        }),
      }).then((t) => t.json());

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Company Name',
        description: 'Transaction Description',
        order_id: data.id,
        handler: async function (response: any) {
          const verificationData = await fetch('/api/bookings/verifyOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
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
        prefill: {
          name: 'Customer Name',
          email: 'customer@email.com',
          contact: mobileNumber,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong with the payment');
    }
  };

  return (
    <div className="space-y-4">
      {!showMobileInput ? (
        <button
          onClick={() => setShowMobileInput(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pay ₹{amount}
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={10}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-2">
            <button
              onClick={handleMobileSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Proceed to Pay
            </button>
            <button
              onClick={() => {
                setShowMobileInput(false);
                setError('');
                setMobileNumber('');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}