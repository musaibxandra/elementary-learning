import { NextRequest, NextResponse } from 'next/server';

// GET → returns list of payment methods
export async function GET() {
  const res = await fetch(`${process.env.MYFATOORAH_API_URL}/v2/InitiatePayment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MYFATOORAH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      InvoiceValue: 1,           // any small amount
      CurrencyIso: 'BHD'         // or your currency
    })
  });

  const data = await res.json();

  console.log('Full MyFatoorah Response:', JSON.stringify(data, null, 2));  // Log everything

  if (!data.IsSuccess) {
    console.error('API Error:', data.Message, data.ValidationErrors);
    return NextResponse.json({ error: data.Message || 'InitiatePayment failed', methods: [] }, { status: 400 });
    }

    return NextResponse.json(data.Data?.PaymentMethods || []);

}
