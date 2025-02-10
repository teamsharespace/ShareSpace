import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    
    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('RAZORPAY_KEY_SECRET is not defined');
    }

    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return NextResponse.json({ message: 'Payment verified successfully' });
    } else {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}