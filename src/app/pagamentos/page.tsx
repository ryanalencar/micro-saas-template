"use client";

import { useStripe } from "@/hooks/use-stripe";

export default function Pagamentos() {
  const {
    createPaymentStripeCheckout,
    createSubscritionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe();

  return (
    <div>
      <h1>pagamentos</h1>
      <button
        className="border rounded-sm p-2 cursor-pointer"
        onClick={() => createPaymentStripeCheckout({ testeId: "123" })}
      >
        Criar pagamento Stripe
      </button>
      <button
        className="border rounded-sm p-2 cursor-pointer"
        onClick={() => createSubscritionStripeCheckout({ testeId: "123" })}
      >
        Criar assinatura Stripe
      </button>
      <button
        className="border rounded-sm p-2 cursor-pointer"
        onClick={handleCreateStripePortal}
      >
        Criar portal de pagamentos
      </button>
    </div>
  );
}
