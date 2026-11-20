// Datos del negocio en un único sitio.
// Todo lo marcado como PENDIENTE debe confirmarse antes de publicar la web.

export const site = {
  name: 'AirisPOS',
  tagline: 'TPV para hostelería que sigue cobrando aunque se caiga internet',
  description:
    'AirisPOS es el TPV para bares, cafeterías y restaurantes que funciona sin internet, cobra en 2 toques y cumple Veri*factu y TicketBai. Pago único, sin cuotas mensuales. Pide tu demo gratis.',
  phoneDisplay: '+34 619 73 82 98',
  phoneE164: '+34619738298',
  whatsappNumber: '34619738298',
  whatsappDefaultMessage: 'Hola, me interesa AirisPOS para mi local. ¿Me podéis dar más información?',
  // PENDIENTE: horario real del soporte técnico.
  supportHours: 'todos los días de 9:00 a 1:00, también fines de semana y festivos',
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

// PENDIENTE: los precios todavía no están definidos. Estos importes son de ejemplo
// para que la calculadora funcione; cámbialos aquí y se actualiza toda la web
// (calculadora, textos y datos estructurados para Google).
export const pricing = {
  currency: 'EUR',
  vatIncluded: false,
  // Licencia base por tipo de local. Incluye la primera caja (TPV principal).
  base: { bar: 590, restaurante: 690, delivery: 640 } satisfies Record<BusinessType, number>,
  extraTerminal: 290, // cada caja/TPV adicional
  waiterDevice: 90, // cada comandero móvil o tablet
  limits: { terminals: { min: 1, max: 10 }, waiterDevices: { min: 0, max: 30 } },
  includes: [
    'Licencia perpetua: es tuya para siempre',
    'Configuración inicial y carga de tu carta',
    'Formación para ti y tu equipo',
    '1 año de soporte y actualizaciones',
  ],
};

export const calculatePrice = (type: BusinessType, terminals: number, waiterDevices: number) =>
  pricing.base[type] +
  Math.max(0, terminals - 1) * pricing.extraTerminal +
  Math.max(0, waiterDevices) * pricing.waiterDevice;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(value);

export const navLinks = [
  { href: '#funcionalidades', label: 'Funcionalidades' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#licencias', label: 'Licencias' },
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
    question: '¿Tengo que pagar todos los meses?',
    answer:
      'No. AirisPOS se compra con un pago único y la licencia es tuya para siempre. El primer año de soporte y actualizaciones va incluido. Después puedes renovarlo si quieres, pero el programa sigue funcionando aunque no lo hagas.',
  },
  {
    question: '¿Puedo usar mi ordenador, terminal o impresora actual?',
    answer:
      'En la mayoría de casos, sí. Funciona en terminales táctiles y tablets Android habituales, y aprovecha tus impresoras térmicas de tickets y cocina y tu cajón portamonedas. Antes de comprar nada, dinos qué equipos tienes y te confirmamos cuáles puedes reutilizar.',
  },
  {
    question: '¿Cómo funciona el soporte en fin de semana?',
    answer: `Sabemos que los problemas llegan el sábado por la noche, no el martes por la mañana. Nuestro soporte técnico está disponible ${site.supportHours}, por teléfono y WhatsApp, y te atiende una persona del equipo.`,
  },
  {
    question: '¿Cumple con Veri*factu y TicketBai?',
    answer:
      'Sí. AirisPOS genera los registros de facturación que exige la Ley Antifraude (Veri*factu) y, si tu local está en el País Vasco, emite los tickets según TicketBai. Cuando cambia la normativa, lo actualizamos nosotros.',
  },
  {
    question: '¿Cuánto se tarda en tenerlo funcionando?',
    answer:
      'Nos encargamos de la instalación y de cargar tu carta, con precios, familias y alérgenos. Después damos una formación corta a tu equipo: en un turno ya cobran con soltura.',
  },
];
