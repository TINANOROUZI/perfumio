export const translations = {
  en: {
    nav: { new: "New", bestsellers: "Bestsellers", account: "Account", bag: "Bag", search: "Search…" },
    gate: { welcome: "Welcome! Let’s personalize your experience", continue: "Accept & Continue" },
    product: { comingSoon: "Coming soon…", addToCart: "Add to cart", addedToBag: "Added to your bag" },
    home: { heroTitle: "Find your signature scent", heroSubtitle: "Luxury perfumes, curated for you" },
  },
  it: {
    nav: { new: "Novità", bestsellers: "Best seller", account: "Account", bag: "Borsa", search: "Cerca…" },
    gate: { welcome: "Benvenuto! Personalizziamo la tua esperienza", continue: "Accetta e continua" },
    product: { comingSoon: "In arrivo…", addToCart: "Aggiungi al carrello", addedToBag: "Aggiunto alla tua borsa" },
    home: { heroTitle: "Trova la tua fragranza", heroSubtitle: "Profumi di lusso selezionati per te" },
  },
  fr: {
    nav: { new: "Nouveautés", bestsellers: "Meilleures ventes", account: "Compte", bag: "Panier", search: "Rechercher…" },
    gate: { welcome: "Bienvenue ! Personnalisez votre expérience", continue: "Accepter et continuer" },
    product: { comingSoon: "Bientôt…", addToCart: "Ajouter au panier", addedToBag: "Ajouté à votre panier" },
    home: { heroTitle: "Trouvez votre parfum signature", heroSubtitle: "Parfums de luxe, sélectionnés pour vous" },
  },
  de: {
    nav: { new: "Neu", bestsellers: "Bestseller", account: "Konto", bag: "Tasche", search: "Suchen…" },
    gate: { welcome: "Willkommen! Lass uns dein Erlebnis personalisieren", continue: "Akzeptieren & fortfahren" },
    product: { comingSoon: "Bald verfügbar…", addToCart: "In den Warenkorb", addedToBag: "Zum Beutel hinzugefügt" },
    home: { heroTitle: "Finde deinen Signature-Duft", heroSubtitle: "Luxusparfums, kuratiert für dich" },
  },
  es: {
    nav: { new: "Novedades", bestsellers: "Más vendidos", account: "Cuenta", bag: "Bolsa", search: "Buscar…" },
    gate: { welcome: "¡Bienvenido! Personalicemos tu experiencia", continue: "Aceptar y continuar" },
    product: { comingSoon: "Próximamente…", addToCart: "Añadir a la bolsa", addedToBag: "Añadido a tu bolsa" },
    home: { heroTitle: "Encuentra tu fragancia ideal", heroSubtitle: "Perfumes de lujo, seleccionados para ti" },
  },
};
export type Lang = keyof typeof translations;
