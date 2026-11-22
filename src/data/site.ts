// Datos del negocio en un único sitio.
// Todo lo marcado como PENDIENTE debe confirmarse antes de publicar la web.

export const site = {
  name: 'AirisPOS',
  tagline: 'TPV para hostelería que sigue cobrando aunque se caiga internet',
  description:
    'AirisPOS es el TPV para bares, restaurantes y hoteles que funciona sin internet, cobra en 2 toques y cumple Veri*factu. Desde 39 €/mes, sin permanencia ni comisiones. Pruébalo 14 días gratis.',
  // Solo se usa dentro de los enlaces de WhatsApp; no se muestra escrito en la web.
  whatsappNumber: '34619738298',
  whatsappDefaultMessage: 'Hola, me interesa AirisPOS para mi local. ¿Me podéis dar más información?',
  // Si se rellena (p. ej. un endpoint de Formspree, Getform o una API propia), el formulario
  // envía los datos por POST a esta URL. Si se deja vacío, abre WhatsApp con los datos ya escritos.
  formEndpoint: '',
} as const;

export const whatsappUrl = (message: string = site.whatsappDefaultMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export type BusinessType = 'bar' | 'restaurante' | 'delivery';

export const businessTypes: { id: BusinessType; label: string; short: string }[] = [
  { id: 'bar', label: 'Bar o cafetería', short: 'Bares y cafeterías' },
  { id: 'restaurante', label: 'Restaurante o terraza', short: 'Restaurantes y terrazas' },
  { id: 'delivery', label: 'Comida rápida o delivery', short: 'Comida rápida y delivery' },
];

// Opciones del formulario de contacto (incluye hoteles, que tienen su propio plan).
export const contactBusinessTypes = [
  ...businessTypes.map(({ id, label }) => ({ id, label })),
  { id: 'hotel', label: 'Hotel o grupo de restauración' },
];

// ---------- Precios (suscripción mensual) ----------
// Fuente: «Estructura de Precios AIRISPOS» (PDF). Todos los importes son sin IVA.

export type PlanId = 'esencial' | 'pro' | 'hotel';

export interface Plan {
  id: PlanId;
  tier: string;
  name: string;
  idealFor: string;
  featured?: boolean;
  monthly: { price: number | null; prefix?: string; note: string };
  annual: { price: number | null; note: string; total?: number };
  features: { label: string; value: string }[];
  cta: string;
}

export const pricing = {
  currency: 'EUR',
  trialDays: 14,
  annualDiscount: 20,
  plans: [
    {
      id: 'esencial',
      tier: 'Esencial',
      name: 'Plan Restaurante',
      idealFor: 'Cafeterías, bares y restaurantes independientes',
      monthly: { price: 49, note: '+ IVA · Sin permanencia' },
      annual: { price: 39, total: 468, note: 'Facturado anualmente (468 € + IVA)' },
      features: [
        { label: 'Dispositivos incluidos', value: '1 TPV principal + 2 comanderos móviles' },
        { label: 'Sala y mesas', value: 'Mapa de mesas visual, división de cuentas y cobros' },
        { label: 'Cocina y comandas', value: 'Envío de comandas a impresoras de cocina y barra' },
        { label: 'Stock y escandallos', value: 'Control básico de inventario' },
        { label: 'Normativa y conexiones', value: 'Adaptado a VERI*FACTU y exportación contable' },
        { label: 'Informes y control', value: 'Cierre de caja Z y resumen diario de ventas' },
        { label: 'Soporte técnico', value: 'Chat y correo en horario comercial' },
      ],
      cta: 'Probar 14 días gratis',
    },
    {
      id: 'pro',
      tier: 'Más elegido',
      name: 'Plan Pro',
      featured: true,
      idealFor: 'Restaurantes con cocina activa, pases y delivery',
      monthly: { price: 89, note: '+ IVA · Sin permanencia' },
      annual: { price: 71, total: 852, note: 'Facturado anualmente (852 € + IVA)' },
      features: [
        { label: 'Dispositivos incluidos', value: '2 TPV principales + comanderos móviles ilimitados' },
        { label: 'Sala y mesas', value: 'Mapa multinivel, reservas y control de rotación' },
        { label: 'Cocina y comandas', value: 'Pantalla de cocina (KDS) y control de tiempos' },
        { label: 'Stock y escandallos', value: 'Escandallos, mermas y alertas de reposición' },
        { label: 'Normativa y conexiones', value: 'Adaptado a VERI*FACTU, delivery y contabilidad' },
        { label: 'Informes y control', value: 'Rentabilidad por plato y rendimiento por turno' },
        { label: 'Soporte técnico', value: 'Soporte prioritario por teléfono y WhatsApp' },
      ],
      cta: 'Empezar prueba Pro',
    },
    {
      id: 'hotel',
      tier: 'Enterprise',
      name: 'Plan Hotel & Grupos',
      idealFor: 'Hoteles, resorts y grupos de restauración',
      monthly: { price: 169, prefix: 'Desde', note: '+ IVA · O tarifa a medida' },
      annual: { price: null, note: 'Condiciones según número de centros' },
      features: [
        { label: 'Dispositivos incluidos', value: 'Terminales y puntos de venta ilimitados' },
        { label: 'Sala y mesas', value: 'Multi-ambiente (restaurante, bar, terraza, piscina)' },
        { label: 'Cocina y comandas', value: 'Enrutamiento inteligente entre varias cocinas' },
        { label: 'Stock y escandallos', value: 'Almacén centralizado y traspasos multi-centro' },
        { label: 'Normativa y conexiones', value: 'Conexión PMS hotelero, cargos a habitación y VERI*FACTU' },
        { label: 'Informes y control', value: 'Panel ejecutivo consolidado para hoteles y grupos' },
        { label: 'Soporte técnico', value: 'Gestor de cuenta dedicado y soporte ampliado' },
      ],
      cta: 'Solicitar Demo Hotel',
    },
  ] satisfies Plan[],
  addons: [
    {
      name: 'Alta y puesta en marcha',
      price: '149 € + IVA, pago único',
      description:
        'Subida completa de la carta, configuración de impresoras y sesión inicial de formación. Gratis al contratar la suscripción anual.',
    },
    {
      name: 'Terminal TPV o pantalla extra',
      price: '+15 €/mes + IVA',
      description: 'Ampliación por dispositivo adicional en los planes base: TPV fijo, tablet o pantalla de cocina (KDS).',
    },
  ],
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(value);

export const lowestMonthlyPrice = Math.min(
  ...pricing.plans.flatMap((plan) => [plan.monthly.price, plan.annual.price]).filter((p): p is number => p !== null),
);

export const navLinks = [
  { href: '#funcionalidades', label: 'Funcionalidades' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#precios', label: 'Precios' },
  { href: '#compatibilidad', label: 'Compatibilidad' },
  { href: '#faq', label: 'FAQ' },
];

// Se usan tanto en el acordeón como en el JSON-LD de FAQPage, así nunca se desincronizan.
export const faqs: { question: string; answer: string }[] = [
  {
    question: '¿Qué pasa si se va internet en pleno servicio?',
    answer:
      'Nada grave: sigues cobrando, abriendo mesas y mandando comandas a cocina y barra como siempre, porque AirisPOS trabaja dentro del propio local. Cuando vuelve la conexión, se sincroniza todo solo, incluidos los registros fiscales.',
  },
  {
    question: '¿Hay permanencia o comisiones sobre mis ventas?',
    answer: `No. Pagas una cuota mensual fija, sin permanencia: puedes darte de baja cuando quieras. Tampoco cobramos ninguna comisión sobre lo que vendes. Si eliges el pago anual, ahorras un ${pricing.annualDiscount} % y la puesta en marcha te sale gratis.`,
  },
  {
    question: '¿Cómo funciona la prueba gratis?',
    answer: `Tienes ${pricing.trialDays} días para probar AirisPOS en tu local, sin compromiso. Si te convence, eliges el plan que mejor encaje; si no, no tienes que hacer nada más.`,
  },
  {
    question: '¿Puedo usar mi ordenador, terminal o impresora actual?',
    answer:
      'En la mayoría de casos, sí. Funciona en terminales táctiles y tablets Android habituales, y aprovecha tus impresoras térmicas de tickets y cocina y tu cajón portamonedas. Antes de contratar, dinos qué equipos tienes y te confirmamos cuáles puedes reutilizar.',
  },
  {
    question: '¿Qué soporte tengo?',
    answer:
      'Todo el soporte es en español y depende de tu plan. En el Plan Restaurante te atendemos por chat y correo en horario comercial. En el Plan Pro tienes soporte prioritario por teléfono y WhatsApp. Y en el Plan Hotel & Grupos, un gestor de cuenta dedicado y soporte ampliado.',
  },
  {
    question: '¿Cumple con Veri*factu y TicketBai?',
    answer:
      'Sí. AirisPOS genera los registros de facturación que exige la Ley Antifraude (Veri*factu) y, si tu local está en el País Vasco, emite los tickets según TicketBai. También puedes exportar los datos a tu contabilidad. Cuando cambia la normativa, lo actualizamos nosotros sin coste adicional.',
  },
  {
    question: '¿Cuánto se tarda en tenerlo funcionando?',
    answer:
      'Con el servicio de alta y puesta en marcha subimos tu carta completa, configuramos tus impresoras y damos una sesión de formación a tu equipo. Cuesta 149 € + IVA una sola vez, y es gratis si contratas la suscripción anual.',
  },
];
