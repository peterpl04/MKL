export function formatCurrency(value?: string | number) {
  if (value === undefined || value === null || value === "") {
    return "Preço sob consulta";
  }

  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return "Preço sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(amount);
}

export function buildWhatsAppUrl(phone?: string, businessName?: string) {
  if (!phone) {
    return "#";
  }

  const cleanPhone = phone.replace(/\D/g, "");
  const text = encodeURIComponent(`Olá! Encontrei sua Vitrine Digital e quero saber mais sobre ${businessName || "sua empresa"}.`);
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

export function buildGoogleMapsUrl(query?: string, address?: string) {
  const target = query || address;
  if (!target) {
    return "#";
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target)}`;
}
