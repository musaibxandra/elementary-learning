'use client';
// app/error/page.tsx
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId') || searchParams.get('Id'); // MyFatoorah appends these

  // TODO: Optionally verify status via MyFatoorah's GetPaymentStatus API using paymentId
  // Fetch from /api/get-payment-status?paymentId=... (implement if needed)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-red-50 w-full overflow-x-hidden">
      <div className="max-w-2xl w-full min-w-0 text-center">
        <div className="bg-white border-2 border-red-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
          </div>
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-gray-700">
              Your payment could not be processed. Please try again or contact support.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Payment ID: <span className="font-semibold">{paymentId || 'N/A'}</span> (for reference)
            </p>
          </div>
          <a
            href="/payment"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base font-medium"
          >
            Retry Payment
          </a>
        </div>
      </div>
    </div>
  );
}
