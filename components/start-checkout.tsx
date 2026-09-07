"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Caveat } from "next/font/google";
import { getOffer, SITE_NAME } from "@/lib/config";
import { formatBRL, whatsappHref } from "@/lib/whatsapp";
import { Container } from "./container";

const signature = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});

export function StartCheckout() {
  const search = useSearchParams();
  const offerId = search.get("offer");
  const variant = search.get("variant");
  const offer = getOffer(offerId);

  const fullDay = offer?.id === "workshop" && variant === "full";
  const amount = offer
    ? fullDay && offer.amountAlt
      ? offer.amountAlt
      : offer.amount
    : 0;
  const cadence = offer
    ? fullDay && offer.cadenceAlt
      ? offer.cadenceAlt
      : offer.cadence
    : "";

  const [company, setCompany] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkoutHref = useMemo(() => {
    if (!offer) return "/checkout/";
    const params = new URLSearchParams({ offer: offer.id });
    if (offer.id === "workshop" && fullDay) params.set("variant", "full");
    return `/checkout/?${params.toString()}`;
  }, [offer, fullDay]);

  const meetingText = `Olá! Quero agendar uma reunião sobre ${offer ? offer.name : "uma oferta"} (${formatBRL(amount)}${cadence}).`;

  const proposalNumber = useMemo(() => {
    const stamp = new Date();
    const y = stamp.getFullYear();
    const m = String(stamp.getMonth() + 1).padStart(2, "0");
    const d = String(stamp.getDate()).padStart(2, "0");
    return `NH-${y}${m}${d}-01`;
  }, []);

  if (!offer) {
    return (
      <Container className="py-24">
        <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
          Start checkout
        </p>
        <h1 className="tracking-tighter-display mt-3 text-3xl font-semibold sm:text-4xl">
          Escolha uma oferta.
        </h1>
        <p className="mt-4 text-muted">O cardápio de presença está na home.</p>
        <a
          href="/#contratar"
          className="mt-8 inline-flex rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Ver cardápio
        </a>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-16 sm:py-24">
        <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
          Start checkout
        </p>
        <h1 className="tracking-tighter-display mt-3 text-3xl font-semibold sm:text-4xl">
          Revisão da sua oferta.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Confira a oferta escolhida e decida: contratar agora, gerar uma
          proposta em PDF ou agendar uma reunião.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Revisão da oferta */}
          <section className="rounded-xl border border-border p-6">
            <h2 className="text-sm font-medium tracking-tight">Oferta</h2>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {offer.name}
            </p>
            <p className="mt-1 text-sm text-subtle">{offer.who}</p>
            <p className="mt-4 text-lg">
              {formatBRL(amount)}
              <span className="text-sm text-subtle">{cadence}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {offer.body}
            </p>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {offer.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-subtle">
              Total:{" "}
              <span className="font-semibold text-foreground">
                {formatBRL(amount)}
              </span>{" "}
              <span className="text-subtle">{cadence}</span>
            </p>
            <a
              href="/#contratar"
              className="mt-4 inline-block text-sm text-subtle transition-opacity hover:opacity-80"
            >
              Ver outras ofertas
            </a>
          </section>

          {/* Opções */}
          <aside className="rounded-xl border border-border-strong bg-surface p-6 lg:sticky lg:top-20 lg:self-start">
            <h2 className="text-sm font-medium tracking-tight">Como quer seguir?</h2>
            <p className="mt-2 text-sm text-muted">
              {offer.name} · {formatBRL(amount)}
              {cadence}
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={checkoutHref}
                className="flex w-full items-center justify-center rounded-md bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Contratar agora
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex w-full items-center justify-center rounded-md border border-border-strong px-4 py-3 text-sm font-medium transition-colors hover:bg-surface-hover"
              >
                Gerar proposta (PDF)
              </button>
              <a
                href={whatsappHref(meetingText)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-md border border-border-strong px-4 py-3 text-sm font-medium transition-colors hover:bg-surface-hover"
              >
                Agendar reunião
              </a>
            </div>
            <label
              className="mt-6 block text-sm text-muted"
              htmlFor="proposal-company"
            >
              Empresa (opcional — aparece no PDF)
            </label>
            <input
              id="proposal-company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Nome da empresa"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-subtle focus:border-border-strong"
            />
            <p className="mt-6 text-xs leading-relaxed text-subtle">
              Pagamento via PIX, Bitcoin ou Ethereum. Depois do pagamento, avisa
              no WhatsApp para confirmar e marcar o kickoff.
            </p>
          </aside>
        </div>
      </Container>

      {/* Proposta comercial — só na impressão (PDF, uma página) */}
      {mounted &&
        createPortal(
          <div className="print-only">
            <div className="proposal-sheet w-full bg-white text-neutral-900">
              <div className="px-10 py-8">
                {/* Header */}
                <header className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`${signature.className} text-4xl leading-none text-neutral-900`}
                      aria-hidden
                    >
                      LM
                    </span>
                    <div>
                      <p className="text-xl font-bold leading-none tracking-tight">
                        {SITE_NAME}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Conselheiro de IA — IA em produção
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold">Proposta comercial</p>
                    <p className="mt-0.5 font-mono text-xs text-neutral-500">
                      {proposalNumber}
                    </p>
                  </div>
                </header>

                {/* Meta */}
                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                      Data
                    </dt>
                    <dd className="mt-1 font-medium">
                      {new Date().toLocaleDateString("pt-BR")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                      Validade
                    </dt>
                    <dd className="mt-1 font-medium">15 dias</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                      Empresa
                    </dt>
                    <dd className="mt-1 font-medium">
                      {company.trim() || "A definir"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                      Emitido por
                    </dt>
                    <dd className="mt-1 font-medium">{SITE_NAME}</dd>
                  </div>
                </dl>

                {/* Título */}
                <h2 className="mt-8 text-xl font-bold tracking-tight">
                  {offer.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {offer.who} · {cadence}
                </p>

                {/* Tabela estilo invoice */}
                <table className="mt-6 w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-900 text-[10px] uppercase tracking-widest text-neutral-400">
                      <th className="pb-2 pr-4 font-semibold">Item</th>
                      <th className="pb-2 pr-4 font-semibold">Descrição</th>
                      <th className="pb-2 text-right font-semibold">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200">
                      <td className="py-3 pr-4 font-medium">{offer.name}</td>
                      <td className="py-3 pr-4 text-neutral-500">
                        {offer.who} · {cadence}
                      </td>
                      <td className="py-3 text-right font-semibold">
                        {formatBRL(amount)}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200 text-neutral-500">
                      <td className="py-3 pr-4">Briefing / Alinhamento</td>
                      <td className="py-3 pr-4">Gratuito</td>
                      <td className="py-3 text-right font-medium">Gratuito</td>
                    </tr>
                  </tbody>
                </table>

                {/* Total */}
                <p className="mt-6 flex items-baseline justify-end gap-3 text-sm">
                  <span className="text-neutral-500">Total</span>
                  <span className="text-xl font-bold">
                    {formatBRL(amount)}
                    <span className="ml-1 text-sm font-medium text-neutral-500">
                      {cadence}
                    </span>
                  </span>
                </p>

                {/* O que está incluído */}
                <p className="mt-8 text-[10px] uppercase tracking-widest text-neutral-400">
                  O que está incluído
                </p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-900" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Condições */}
                <p className="mt-8 text-[10px] uppercase tracking-widest text-neutral-400">
                  Condições
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-600">
                  <li>Pagamento via PIX, Bitcoin ou Ethereum.</li>
                  <li>Validade desta proposta: 15 dias.</li>
                </ul>

                {/* Footer */}
                <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 pt-4 text-[11px] text-neutral-400">
                  <span>Lucas Moraes · lucasmoraes.tech</span>
                  <span>contato@lucasmoraes.ai · +55 11 98350-7618</span>
                </footer>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
