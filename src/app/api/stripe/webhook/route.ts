import { stripe } from "@/lib/stripe";
import { handleStripeCancelSubscription } from "@/server/stripe/handle-cancel";
import { handleStripePayment } from "@/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature || !secret) {
      return NextResponse.json(
        { error: "no signature or secret" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        const metadata = event.data.object.metadata;
        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripePayment(event);
        }
        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(event);
        }
        break;
      case "customer.subscription.deleted":
        await handleStripeCancelSubscription(event);
        break;
    }
  } catch (error) {
    return NextResponse.error();
  }
}
