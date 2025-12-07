'use client';
// app/success/page.tsx (or pages/success.tsx if Pages Router)
import { useSearchParams } from 'next/navigation'; // For query params
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('invoiceId'); // MyFatoorah appends params like ?invoiceId=123

  // TODO: Verify payment status via MyFatoorah API (e.g., ExecutePayment or GetPaymentStatus)
  // Use invoiceId to fetch details and update your DB (e.g., mark registration paid)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full overflow-x-hidden">
      <div className="max-w-2xl w-full min-w-0 text-center">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          </div>
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-gray-700">Thank you for registering for World HR Summit & Expo – Global 2025.</p>
            <p className="text-xs sm:text-sm text-gray-600">Invoice ID: <span className="font-semibold">{invoiceId || 'N/A'}</span></p>
            <p className="text-sm sm:text-base text-gray-700 font-medium">Thank you!</p>
          </div>
          {/* <Link href="get_tickets">
            <Button className='cursor-pointer text-sm sm:text-base px-6 py-3'>Back to Tickets</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full overflow-x-hidden">
        <div className="max-w-2xl w-full min-w-0 text-center">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
            <p className="text-sm sm:text-base text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
