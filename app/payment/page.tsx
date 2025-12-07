'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface PaymentMethod {
  PaymentMethodId: number;
  PaymentMethodEn: string;
  PaymentMethodAr?: string;
  IsDirectPayment: boolean;
  ImageUrl?: string;
}

const Payout = () => {
  const customerName = 'mohammed maqdoom';
  const customerEmail = 'maqdoom114@gmail.com';
  const paymentAmount = 1.000;
  const [walletBalance, setWalletBalance] = useState(150.000);

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
  const [loadingMethods, setLoadingMethods] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load payment methods
  useEffect(() => {
    fetch('/api/create_payment') // Fixed: was /api/create_payment
      .then((r) => r.json())
      .then((data) => {
        // Safety: ensure it's always an array
        const methodList = Array.isArray(data) ? data : [];
        setMethods(methodList);
        setLoadingMethods(false);

        // Auto-select first method if available
        if (methodList.length > 0) {
          setSelectedMethodId(methodList[0].PaymentMethodId);
        }
      })
      .catch((err) => {
        console.error('Failed to load payment methods:', err);
        setMethods([]);
        setLoadingMethods(false);
      });
  }, []);

  // Handle payment callback (success/failure)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    if (paymentId) {
      verifyPayment(paymentId);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const verifyPayment = async (paymentId: string) => {
    try {
      const res = await fetch('/api/verify_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      });
      const data = await res.json();

      if (data.success && data.verified) {
        setWalletBalance((prev) => Math.max(0, prev - paymentAmount));
        alert('Payment successful! Wallet updated.');
      } else {
        alert('Payment failed or not verified.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      alert('Error verifying payment.');
    }
  };

  const handleSubmit = async () => {
    if (walletBalance < paymentAmount) return alert('Insufficient balance');
    if (!selectedMethodId) return alert('Please select a payment method');

    setIsProcessing(true);

    try {
      const res = await fetch('/api/execute-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: paymentAmount,
          customerName,
          customerEmail,
          paymentMethodId: selectedMethodId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentUrl) {
        throw new Error(data.error || 'Payment initiation failed');
      }

      const win = window.open(data.paymentUrl, '_blank');
      if (!win) window.location.href = data.paymentUrl;
    } catch (err: any) {
      alert('Payment Error: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50/30 min-h-screen overflow-x-hidden">
      <div className="max-w-2xl mx-auto w-full min-w-0">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-primary">Check Out</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
          {/* Payment Methods */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-center">Select Payment Method</p>

            {loadingMethods ? (
              <p className="text-center text-gray-500 py-8 sm:py-12 text-sm sm:text-base">Loading payment methods...</p>
            ) : !Array.isArray(methods) || methods.length === 0 ? (
              <p className="text-center text-red-600 py-8 sm:py-12 text-sm sm:text-base">
                No payment methods available. Please contact support.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {methods.map((method) => (
                  <label
                    key={method.PaymentMethodId}
                    className={`flex flex-col items-center p-4 sm:p-5 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                      selectedMethodId === method.PaymentMethodId
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.PaymentMethodId}
                      checked={selectedMethodId === method.PaymentMethodId}
                      onChange={() => setSelectedMethodId(method.PaymentMethodId)}
                      className="sr-only"
                    />
                    {method.ImageUrl ? (
                      <img
                        src={method.ImageUrl}
                        alt={method.PaymentMethodEn}
                        className="w-16 h-10 sm:w-20 sm:h-12 mb-2 sm:mb-3 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-10 sm:w-20 sm:h-12 bg-gray-200 border-2 border-dashed rounded mb-2 sm:mb-3" />
                    )}
                    <span className="text-xs sm:text-sm font-medium text-center break-words">{method.PaymentMethodEn}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="mb-6 sm:mb-8 lg:mb-10 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg sm:rounded-xl border border-green-200 text-center">
            <p className="text-sm sm:text-base text-gray-600 mb-2">Amount to Pay</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">BHD {paymentAmount.toFixed(3)}</p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isProcessing || !selectedMethodId || loadingMethods}
            className="w-full py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payout;