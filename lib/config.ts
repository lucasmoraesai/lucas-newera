/**
 * Ponto único de edição. Troque aqui e o site inteiro acompanha.
 */
export const SITE_NAME = "Lucas Moraes";
export const EMAIL = "contato@lucasmoraes.ai";
export const INSTAGRAM = "https://www.instagram.com/lucasmoraes.ai/";
export const INSTAGRAM_HANDLE = "@lucasmoraes.ai";
export const INSTAGRAM_POST = "https://www.instagram.com/p/DTnbC5_DVCr/";
export const LINKEDIN = "https://www.linkedin.com/in/lucasmoraesai/";
export const PHOTO_PROFILE = "/photos/perfil.jpg";
export const PHOTO_PORTRAIT = "/photos/retrato.jpg";

export const WHATSAPP = "5511983507618";
export const WHATSAPP_DISPLAY = "+55 11 98350-7618";

/** Link do formulário ou agenda. Vazio cai no e-mail. */
export const CALENDAR = "";

export const AUDIENCE = "24,7 mil";

/**
 * Chaves de RECEBER do Nubank (nunca seed / senha / private key).
 */
export const PAYMENT = {
  pixKey: "cead9a0f-04b2-42f7-a80b-be7674ec8671",
  pixName: "Lucas Moraes",
  pixCity: "SAO PAULO",
  btcAddress: "bc1q98zg40swsnhvrgalwezswzrfj88qtgjq7km0c6",
  ethAddress: "0x7F8379cb62fB9C6DB9dCBc0716D4976665e80628",
};

export type OfferGroup = "continuo" | "evento";

export type Offer = {
  id: string;
  group: OfferGroup;
  name: string;
  who: string;
  body: string;
  includes: string[];
  /** Texto curto ao lado do preço (ex.: /mês). */
  cadence: string;
  amount: number;
  /** Preço alternativo (Workshop dia inteiro). */
  amountAlt?: number;
  cadenceAlt?: string;
  altLabel?: string;
  featured?: boolean;
  seats?: { taken: number; total: number };
};

export const OFFERS: Offer[] = [
  {
    id: "mentoria-whatsapp",
    group: "continuo",
    name: "Mentoria 1x1 WhatsApp",
    who: "Founder e líder de produto",
    body: "Assíncrono, direto no problema da semana. Você manda; eu respondo na fila do dia. Uma demanda ativa por vez.",
    includes: [
      "Fila diária no WhatsApp",
      "1 demanda ativa por vez",
      "Revisão de escopo e arquitetura",
      "Priorização do que vai a produção",
    ],
    cadence: "/mês",
    amount: 2500,
  },
  {
    id: "mentoria-call",
    group: "continuo",
    name: "Mentoria 1x1 Call",
    who: "Quem precisa de decisão ao vivo",
    body: "Duas calls de 60 minutos por mês, mais WhatsApp leve entre elas. Para quem está desenhando produto, stack ou go-to-market de IA.",
    includes: [
      "2 calls de 60 min / mês",
      "WhatsApp leve entre sessões",
      "Revisão de roadmap de 90 dias",
      "Arquitetura e escopo sob demanda",
    ],
    cadence: "/mês",
    amount: 4000,
  },
  {
    id: "mentoria-incompany",
    group: "continuo",
    name: "Mentoria In Company",
    who: "Times de produto, tech e vendas",
    body: "Formação no contexto real da empresa. O time sai do piloto com dono, prazo e o próximo passo em produção.",
    includes: [
      "Diagnóstico de maturidade em IA",
      "Trilhas para produto, tech e vendas",
      "Workshops de agentes e automação",
      "Plano de implantação com dono e prazo",
      "Fechamento mínimo de 2 meses",
    ],
    cadence: "/mês · mín. 2 meses",
    amount: 25000,
  },
  {
    id: "conselheiro",
    group: "continuo",
    name: "Conselheiro de IA",
    who: "Conselho e C-level",
    body: "Assento consultivo na estratégia de IA. Participo da decisão com responsabilidade sobre o resultado — não com slide.",
    includes: [
      "Reunião mensal de conselho",
      "Construir, comprar ou integrar",
      "Avaliação de arquitetura e risco",
      "Governança e uso responsável",
      "Disponibilidade para o C-level",
      "Contrato anual",
    ],
    cadence: "/mês · anual",
    amount: 15000,
    featured: true,
    seats: { taken: 1, total: 3 },
  },
  {
    id: "palestra",
    group: "evento",
    name: "Palestra de IA",
    who: "Evento, convenção, summit",
    body: "Keynote de quem construiu agentes e automação em produção — iFood, Bradesco, Itaú e mais de 3.000 empresas.",
    includes: [
      "40–50 minutos",
      "Tema alinhado à audiência",
      "Presencial ou virtual",
      "Perguntas ao vivo",
      "Briefing com o organizador",
    ],
    cadence: "/evento",
    amount: 12000,
  },
  {
    id: "workshop",
    group: "evento",
    name: "Workshop de IA",
    who: "Time que precisa sair fazendo",
    body: "Mão na massa: agentes, automação e o desenho do que vai para produção. O time sai com próximo passo, não com PDF.",
    includes: [
      "Turma de até 30 pessoas",
      "Exercício no problema real",
      "Agentes e automação na prática",
      "Plano de 30 dias depois do workshop",
    ],
    cadence: "/meio período",
    amount: 18000,
    amountAlt: 26000,
    cadenceAlt: "/dia inteiro",
    altLabel: "Dia inteiro",
  },
];

export function getOffer(id: string | null | undefined) {
  if (!id) return undefined;
  return OFFERS.find((offer) => offer.id === id);
}

export function offerCheckoutHref(id: string, fullDay = false) {
  const params = new URLSearchParams({ offer: id });
  if (id === "workshop" && fullDay) params.set("variant", "full");
  return `/start-checkout/?${params.toString()}`;
}

export const TALK_THEMES = [
  "Por que o piloto de IA funciona e a versão em produção não",
  "Agente vertical: o que ele resolve que um chatbot não resolve",
  "Construir, comprar ou integrar — como decidir sem refazer em um ano",
  "O que segurança e jurídico perguntam antes de aprovar IA na empresa",
  "IA dentro de produto SaaS: onde vira receita e onde vira custo",
  "Do slide ao contrato: o que empresa grande exige para colocar IA no ar",
] as const;

export type Milestone = {
  period: string;
  title: string;
  body: string;
};

export const MILESTONES: Milestone[] = [
  {
    period: "2014",
    title: "Nasce a Edulabzz",
    body: "Um jogo de educação financeira desenvolvido em 54 horas no primeiro Startup Weekend Fintech da América Latina. Venceu a competição e virou empresa.",
  },
  {
    period: "2015–2016",
    title: "Aceleração Samsung e Bradesco",
    body: "Selecionada para os programas de aceleração de startups da Samsung e do Bradesco — os primeiros grandes ensinando o que é vender para corporação.",
  },
  {
    period: "2017",
    title: "Top 100 da América Latina",
    body: "Reconhecida pelo Inovativa Brasil como uma das 100 startups mais inovadoras da América Latina.",
  },
  {
    period: "2018",
    title: "O pivot que virou produto",
    body: "Saímos dos games customizados e construímos do zero uma plataforma de EAD/LMS. R$1 milhão de receita nos primeiros 12 meses do produto.",
  },
  {
    period: "2019",
    title: "O aporte que acelerou 5 anos em 5 meses",
    body: "Captação de R$ 10 milhões com Janguiê Diniz, o bilionário fundador do Grupo Ser Educacional. Infraestrutura de nuvem, governança corporativa e crescimento de 410%.",
  },
  {
    period: "2020",
    title: "A pandemia e a Toolzz",
    body: "Grandes grupos de educação e empresas passaram a operar 100% online na plataforma: Ser Educacional, J.Piaget, CPFL e o Instituto Êxito, entre outros.",
  },
  {
    period: "2021–2025",
    title: "Escala",
    body: "De R$ 1,8 milhão para R$ 8,6 milhões por ano. Receita acumulada de R$ 31,6 milhões em cinco anos.",
  },
  {
    period: "Hoje",
    title: "Sete produtos, IA em produção",
    body: "LMS, LXP, agentes verticais, copilot, chat e automação rodando dentro de iFood, Bradesco, Itaú e mais de três mil empresas.",
  },
];

export const STAGE_PHOTOS = [
  {
    src: "/photos/palco-1.jpg",
    alt: "Lucas Moraes apresentando no palco",
  },
  {
    src: "/photos/palco-2.jpg",
    alt: "Lucas Moraes em conversa",
  },
  {
    src: "/photos/palco-3.jpg",
    alt: "Lucas Moraes em podcast",
  },
] as const;

export const HISTORY_PHOTOS = [
  { src: "/photos/foto-1.jpg", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-2.jpg", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-3.jpg", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-4.jpg", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-5.jpg", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-6.jpg", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-7.png", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-8.png", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-9.png", alt: "Lucas Moraes — trajetória" },
  { src: "/photos/foto-10.png", alt: "Lucas Moraes — trajetória" },
] as const;
