import type { Metadata } from "next";
import { Suspense } from "react";
import { StartCheckout } from "@/components/start-checkout";

export const metadata: Metadata = {
  title: "Iniciar checkout",
  description:
    "Revise a oferta escolhida e contrate agora, gere uma proposta em PDF ou agende uma reunião.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StartCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1080px] px-6 py-24 text-sm text-muted">
          Carregando…
        </div>
      }
    >
      <StartCheckout />
    </Suspense>
  );
}
