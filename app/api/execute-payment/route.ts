import { NextRequest, NextResponse } from 'next/server';

// Interface for MyFatoorah Validation Error
interface ValidationError {
  Code: number;
  Message: string;
  VariableName?: string; // Optional, based on common API patterns
}

// Interface for MyFatoorah ExecutePayment response
interface ExecutePaymentResponse {
  IsSuccess: boolean;
  Message: string;
  ValidationErrors: null | ValidationError[];
  Data: {
    InvoiceId: number;
    IsDirectPayment: boolean;
    PaymentURL: string;
    CustomerReference: string;
    UserDefinedField: string | null;
    RecurringId: string;
  };
}

// Environment variables for MyFatoorah API
const baseURL = process.env.MYFATOORAH_API_URL;
const token = process.env.MYFATOORAH_TOKEN;

// GET /api/execute-payment (info endpoint)
export async function GET() {
  return NextResponse.json({
    message:
      'This endpoint requires a POST request with JSON body: { amount: number, customerName: string, customerEmail: string, paymentMethodId: number }',
    example:
      'curl -X POST http://localhost:3000/api/execute-payment -H \'Content-Type: application/json\' -d \'{"amount":10.00,"customerName":"Test User","customerEmail":"test@example.com","paymentMethodId":20}\'',
  });
}

// POST /api/execute-payment (main endpoint)
export async function POST(request: NextRequest) {
  if (!token) {
    return NextResponse.json(
      { error: 'Server configuration error: Token not set' },
      { status: 500 }
    );
  }

  if (!baseURL) {
    return NextResponse.json(
      { error: 'Server configuration error: MYFATOORAH_API_URL not set' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { amount, customerName, customerEmail, paymentMethodId } = body;

    if (!amount || !customerName || !customerEmail || !paymentMethodId) {
      return NextResponse.json(
        {
          error: 'Missing required fields: amount, customerName, customerEmail, paymentMethodId',
        },
        { status: 400 }
      );
    }

    console.log('Executing payment for:', {
      amount,
      customerName,
      customerEmail,
      paymentMethodId,
    });

    // Recurring payment settings - simple and easy to modify
    const recurringType = 'Daily'; // Options: 'daily', 'weekly', 'monthly', 'custom'
    const executedTimes = 2; // How many times to charge

    const retryCount = 3; // How many times to retry if payment fails

    const response = await fetch(`${baseURL}/v2/ExecutePayment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        InvoiceValue: amount,
        CustomerName: customerName,
        CustomerEmail: customerEmail,
        PaymentMethodId: paymentMethodId,
        CallBackUrl: process.env.NEXT_PUBLIC_SUCCESS_URL,
        ErrorUrl: process.env.NEXT_PUBLIC_ERROR_URL,
        Language: 'EN',
        RecurringModel: {
          PaymentType: recurringType,
          ExecutedTimes: executedTimes,
          RetryCount: retryCount,
        },
      }),
    });

    console.log('MyFatoorah API Response Status:', response.status);

    const rawBody = await response.text();
    const contentType = response.headers.get('content-type') || '';
    let parsedJson: ExecutePaymentResponse | null = null;

    if (contentType.includes('application/json')) {
      try {
        parsedJson = JSON.parse(rawBody);
      } catch (err) {
        console.error('Failed to parse JSON response:', err, rawBody);
      }
    }

    if (!response.ok) {
      const errorPayload = parsedJson ?? rawBody;
      console.error('MyFatoorah API Error Details:', errorPayload);
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${
          typeof errorPayload === 'string' ? errorPayload : JSON.stringify(errorPayload)
        }`
      );
    }

    if (!parsedJson) {
      console.error('Unexpected non-JSON success payload from MyFatoorah:', rawBody);
      throw new Error('Gateway returned non-JSON payload, check credentials/environment.');
    }

    const data: ExecutePaymentResponse = parsedJson;

    // FIXED: Check IsSuccess even on 2xx status
    if (!data.IsSuccess) {
      const errorMsg = data.Message || 'Payment execution failed';
      const validationErrors = data.ValidationErrors;
      if (validationErrors && validationErrors.length > 0) {
        console.error('Validation Errors:', validationErrors);
        // Append first error for brevity
        const firstError = validationErrors[0];
        throw new Error(`${errorMsg}. Validation: ${firstError.Message} (${firstError.VariableName || 'unknown'})`);
      }
      throw new Error(errorMsg);
    }

    console.log('Payment executed successfully:', { 
      isSuccess: data.IsSuccess, 
      invoiceId: data.Data.InvoiceId, 
      paymentUrl: data.Data.PaymentURL 
    });

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // TODO: Restrict to domain in prod
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return NextResponse.json(
      { paymentUrl: data.Data.PaymentURL, invoiceId: data.Data.InvoiceId },
      {
        // status: 200, // Implicit, can remove
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error('Full Error in /execute-payment:', error);
    return NextResponse.json(
      { error: 'Failed to execute payment', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // IMPROVED: Standard for preflight
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}