// data/menu.js — All menu items served by the API
module.exports = [
  // ─── Imperial Signature ───────────────────────────────────────────────────
  {
    id: 'wood-fired-peking-duck',
    category: 'Imperial Signature',
    name: 'Wood-Fired Peking Duck',
    badge: "Chef's Heritage",
    badgeType: 'secondary',
    description: 'A 48-hour process. Crispy lacquered skin served with handmade pancakes, julienned cucumber, and fermented bean sauce.',
    price: 98,
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByd7ZsHhF48crTv42jhxHLVg8Zcxg0BfGVa5VdpIXd2Jogb5l8Isg__MZHTepxambTgnglDaZkdXvHApQzC-Gj1FsxLmIyk25ZmYbRbK90qShNx9pABN2rJi2XT1Jsm8YUQjp87ODTRP3XktAmgZaE-xMC38yAUazSSJnz2h3pYdO7_n0uXW9A4NCkS0GMxDrdYeajRknj0yOvbX0cDFdCPLg8QMjAjuyOGzZXK4MsSdRM1HgtCOng2WPMLlAiNJbv8GktxN52tvw',
    prepTime: '48 Hours',
    spiceLevel: 1,
    chefNote: '"True Peking Duck requires patience. We lacquer the skin seven times before roasting over cherry wood. No shortcuts."',
    story: 'Our Peking Duck is cured for 48 hours with a proprietary blend of maltose and five-spice before being hung to dry in our cold room. It is then roasted over a wood fire until the skin blisters into the crispiest lacquer you have ever tasted. Served with handmade pancakes, julienned cucumber, and our 30-year-aged hoisin sauce.',
    reviews: [
      { author: 'Isabella R.', date: 'Nov 02, 2023', rating: 5, text: '"The skin shattered like fine porcelain. I have eaten Peking Duck in Beijing, and this rivals the best I have had. Absolutely sublime."', badge: 'Legendary Status' },
      { author: 'David C.', date: 'Oct 18, 2023', rating: 5, text: '"Worth every single penny of the $98. The pancakes are made fresh, the cucumber is perfectly crisp. Order this."', badge: 'Verified Dining Experience' },
      { author: 'Priya M.', date: 'Oct 05, 2023', rating: 4, text: '"The duck itself is flawless. I dropped one star only because I wish they served more pancakes. The sauce is outstanding."', badge: 'Verified Dining Experience' }
    ]
  },
  {
    id: 'szechuan-lobster-mapo',
    category: 'Imperial Signature',
    name: 'Szechuan Lobster Mapo',
    badge: 'Imperial Special',
    badgeType: 'primary',
    description: 'Canadian lobster tail, soft silken tofu, and aged doubanjiang chili paste. Finished with toasted Sichuan peppercorn oil.',
    price: 72,
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy2QrUe-n-eh4U8t41R9IASpsGqmk0DkGu62jdB8DXli_YEfiRKBSo3ESTc_3n-EL-VD7mG1mxkKKQguglaTwDAYNMCqFN1qEeHHJAfMQbYV156Ly-kGtS66e15Djn5hJtCSQQoQgJol1j3-QJ-0fFqY_yzil8Uq2GUHC_NQkrKEWmVN_Y92jk2owchMPmzC0NHEahK_1Rasc-Ub2k-nraiu1wBTHy_kyAw-pXFbHVBXsAEFjY7BTu3qqRL9Svd4ExWjCeCwdJSg8',
    prepTime: '25 Minutes',
    spiceLevel: 3,
    chefNote: '"The Sichuan peppercorn is not just heat; it is a numbing that opens the palate. Used correctly, it transforms the lobster completely."',
    story: 'We take a whole Canadian lobster tail and braise it in our signature doubanjiang paste — fermented for a minimum of three years. Silken tofu absorbs the spiced broth. The entire dish is finished tableside with a drizzle of freshly toasted Sichuan peppercorn oil for an aromatic theatre of the senses.',
    reviews: [
      { author: 'Thomas W.', date: 'Nov 10, 2023', rating: 5, text: '"The Sichuan numbness paired with the sweetness of the lobster is a revelation. I dreamed about this dish."', badge: 'Legendary Status' },
      { author: 'Mei L.', date: 'Oct 22, 2023', rating: 5, text: '"As someone from Chengdu, I can verify this is an authentic and elevated mapo. The lobster was a genius addition."', badge: 'Heritage Verified' },
      { author: 'Andrew B.', date: 'Sep 30, 2023', rating: 4, text: '"Intensely flavourful. Very spicy — be warned. But if you can handle the heat, it is absolutely worth it."', badge: 'Verified Dining Experience' }
    ]
  },
  // ─── Appetizers ──────────────────────────────────────────────────────────
  {
    id: 'wagyu-truffle-gyoza',
    category: 'Appetizers',
    name: 'Wagyu Truffle Gyoza',
    description: 'A5 Kagoshima wagyu, black truffle essence, pan-seared.',
    price: 24,
    available: true,
    prepTime: '15 Minutes',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  {
    id: 'golden-jade-rolls',
    category: 'Appetizers',
    name: 'Golden Jade Rolls',
    description: 'Hand-rolled spring vegetables with a mint-infused soy glaze.',
    price: 18,
    available: false,
    prepTime: '10 Minutes',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  {
    id: 'crispy-calamari',
    category: 'Appetizers',
    name: 'Crispy Calamari',
    description: 'Seven-spice salt, fried garlic, and pickled heirloom peppers.',
    price: 22,
    available: true,
    prepTime: '12 Minutes',
    spiceLevel: 1,
    image: null,
    reviews: []
  },
  {
    id: 'smashed-cucumber',
    category: 'Appetizers',
    name: 'Smashed Cucumber',
    description: 'Garlic-infused black vinegar, chili oil, toasted sesame.',
    price: 14,
    available: true,
    prepTime: '8 Minutes',
    spiceLevel: 2,
    image: null,
    reviews: []
  },
  // ─── Meat Specialties ────────────────────────────────────────────────────
  {
    id: 'honey-glazed-char-siu',
    category: 'Meat Specialties',
    name: 'Honey Glazed Char Siu',
    description: 'Heritage pork neck, slow-roasted with maltose honey and five-spice marinade.',
    price: 36,
    available: true,
    prepTime: '30 Minutes',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  {
    id: 'cinnabar-pepper-beef',
    category: 'Meat Specialties',
    name: 'Cinnabar Pepper Beef',
    description: 'Wok-seared prime tenderloin, caramelized onions, and cracked black pepper jus.',
    price: 42,
    available: true,
    prepTime: '20 Minutes',
    spiceLevel: 2,
    image: null,
    reviews: []
  },
  {
    id: 'ginger-scallion-lamb',
    category: 'Meat Specialties',
    name: 'Ginger-Scallion Lamb',
    description: 'Sliced Mongolian lamb, flash-fried with young ginger and sweet scallions.',
    price: 38,
    available: true,
    prepTime: '18 Minutes',
    spiceLevel: 1,
    image: null,
    reviews: []
  },
  // ─── Seafood ─────────────────────────────────────────────────────────────
  {
    id: 'steamed-sea-bass',
    category: 'Seafood',
    name: 'Steamed Sea Bass',
    description: 'Superior soy sauce, ginger silvers, fresh cilantro.',
    price: 48,
    available: true,
    prepTime: '20 Minutes',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  {
    id: 'salt-pepper-prawns',
    category: 'Seafood',
    name: 'Salt & Pepper Prawns',
    description: 'Wild-caught jumbo prawns, toasted garlic, crispy chili.',
    price: 44,
    available: true,
    prepTime: '15 Minutes',
    spiceLevel: 2,
    image: null,
    reviews: []
  },
  {
    id: 'drunken-crab',
    category: 'Seafood',
    name: 'Drunken Crab',
    description: 'Marinated in 20-year aged Shaoxing wine.',
    price: null,
    available: false,
    prepTime: '24 Hours',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  // ─── Soups ───────────────────────────────────────────────────────────────
  {
    id: 'hot-sour-consomme',
    category: 'Soups',
    name: 'Hot & Sour Consommé',
    description: 'Wood ear mushrooms, bamboo shoots, aged vinegar.',
    price: 16,
    available: true,
    prepTime: '15 Minutes',
    spiceLevel: 2,
    image: null,
    reviews: []
  },
  {
    id: 'wonton-of-the-sea',
    category: 'Soups',
    name: 'Wonton of the Sea',
    description: 'Shrimp and scallop filling in a clear duck broth.',
    price: 18,
    available: true,
    prepTime: '12 Minutes',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  {
    id: 'abalone-double-boiled',
    category: 'Soups',
    name: 'Abalone Double-Boiled',
    description: 'Braised for 12 hours with goji berries and ginseng.',
    price: 32,
    available: true,
    prepTime: '12 Hours',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  // ─── Desserts ────────────────────────────────────────────────────────────
  {
    id: 'black-sesame-souffle',
    category: 'Desserts',
    name: 'Black Sesame Soufflé',
    description: 'Toasted sesame cream, ginger ice cream, charcoal tuile.',
    price: 16,
    available: true,
    prepTime: '20 Minutes',
    spiceLevel: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr_Sz3zDliV4M705VLpkzuFvT9o1zEqDZSaDHaJedfW2BcSMGFmYKv9BnTBMV3RPwd_CXLRS0tbfGMMcv_mijskRFhgmMoIGTHfLVtxIqU1L-w_dK5XR49sV5zEoJmIcg5Vk0WIDF5Krvvltbe3U9o5gC4dAMVLKq1FX0letS04mKKbRRT1JzjeCLwgQir3rvUJu8FUMtiAlfnTzN-tRzIR6mVdgincjz5P1v3cf-WFK1iGpenNR9EttdKabiqa5LbZ087Kb39vpw',
    reviews: []
  },
  {
    id: 'red-bean-osmanthus-cake',
    category: 'Desserts',
    name: 'Red Bean Osmanthus Cake',
    description: 'Chilled layer cake with fragrant osmanthus blossoms.',
    price: 14,
    available: true,
    prepTime: '10 Minutes',
    spiceLevel: 0,
    image: null,
    reviews: []
  },
  // ─── Slow-Braised Red Dynasty Beef (Dish Detail Example) ─────────────────
  {
    id: 'red-dynasty-beef',
    category: 'Meat Specialties',
    name: 'Slow-Braised Red Dynasty Beef',
    badge: 'Signature Main',
    badgeType: 'secondary',
    description: 'Wagyu braised 48 hours in 12-spice reduction. Silk-thread noodles, flash-seared bok choy.',
    price: 48,
    available: false,
    availabilityNote: 'Seasonal Ingredient Depletion',
    prepTime: '48 Hours',
    spiceLevel: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIPrkwChR5YF6IXMbzKzlPWymZUWdhWk0Q9ABGd4opLdyniRBE1CIjhdE_q3bi1ug81zcYi01rdyjGcK7WlRF9Yl86Q-1m6Rje_hF60mMnhUWvn3YRyX4ASpJj2Pa-npoQy-YDoWBFegFUGsjH5tankaEYElpezWiDcBDxVhqyjVtkPmouPFQ0AYrRSTRHL4L45B9Ga6YfRW8bz6NWnPz3oQpkbt0ZXSsUrBWgEMnH6djJHfTwxVcQyftno3xxQHbIp0Lp8upVTs0',
    chefNote: '"The essence of the Dynasty beef lies in the 48-hour patience. We source our Wagyu from a specific high-altitude ranch, ensuring the marble melts perfectly into the 12-spice reduction."',
    story: 'A masterclass in slow-cooking. Our chefs utilize a traditional clay-pot method, sealing the vessels with lotus leaves to lock in the aromatic steam of star anise, cinnamon, and 30-year aged rice wine. Served with a side of silk-thread noodles and flash-seared bok choy.',
    reviews: [
      { author: 'Eleanor V.', date: 'October 14, 2023', rating: 5, text: '"The tenderness is actually unbelievable. You don\'t even need a knife. The rich, deep red sauce has layers of flavor that I\'ve never experienced outside of Beijing."', badge: 'Verified Dining Experience' },
      { author: 'Marcus Chen', date: 'September 28, 2023', rating: 5, text: '"This isn\'t just a meal; it\'s cultural storytelling. UNCLE has managed to elevate a humble classic into high art. Worth every penny of the $48."', badge: 'Legendary Status' },
      { author: 'Julian S.', date: 'September 05, 2023', rating: 4, text: '"The spice level is perfectly balanced. It builds slowly but never overpowers the quality of the beef. A masterpiece of Imperial cuisine."', badge: 'Verified Dining Experience' }
    ]
  }
];
