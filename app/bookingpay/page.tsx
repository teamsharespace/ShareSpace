"use client"
import PaymentButton from '@/components/PaymentButton';

export default function CheckoutPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <PaymentButton amount={500} />
    </div>
  );
}