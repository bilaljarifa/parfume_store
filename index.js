import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Menu, Sparkles, Droplet, Leaf, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Oud Mystique',
    family: 'Boisé',
    description: 'Un parfum riche aux notes de bois, cuir et encens.',
    notes: ['Oud', 'Cèdre', 'Ambre'],
    price: { '50ml': 85, '100ml': 120 },
    img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Rose Sauvage',
    family: 'Floral',
    description: 'Une rose veloutée mêlée à des pétales frais et une touche musquée.',
    notes: ['Rose', 'Jasmin', 'Musc'],
    price: { '50ml': 70, '100ml': 95 },
    img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Ambre Gris',
    family: 'Oriental',
    description: 'Fumée et caressante, avec une chaleur sensuelle durable.',
    notes: ['Ambre', 'Vanille', 'Patchouli'],
    price: { '50ml': 105, '100ml': 145 },
    img: 'https://images.unsplash.com/photo-1557170334-a7c3a4e248d8?auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Nuit Étoilée',
    family: 'Frais',
    description: 'Une brise marine vivifiante avec des accents d\'agrumes piquants.',
    notes: ['Bergamote', 'Sel de mer', 'Vétiver'],
    price: { '50ml': 75, '100ml': 110 },
    img: 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Fleur d\'Oranger',
    family: 'Floral',
    description: 'Un bouquet solaire et radieux, évoquant la douceur méditerranéenne.',
    notes: ['Fleur d\'oranger', 'Néroli', 'Miel'],
    price: { '50ml': 80, '100ml': 115 },
    img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Cuir Royal',
    family: 'Boisé',
    description: 'Un accord intense et puissant de cuir adouci par la chaleur du safran.',
    notes: ['Cuir', 'Safran', 'Bois de santal'],
    price: { '50ml': 120, '100ml': 175 },
    img: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80',
  },
];

const ingredients = [
  {
    icon: Sparkles,
    title: 'Accords Cristallins',
    description: 'Notes lumineuses et aériennes pour une signature pure.',
  },
  {
    icon: Droplet,
    title: 'Essences Pures',
    description: 'Extraits nobles de jasmin, vétiver et oud.',
  },
  {
    icon: Leaf,
    title: 'Finesse Cuir',
    description: 'Une profondeur velours pour un sillage indélébile.',
  },
];

const PerfumeStore = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState('100ml');
  const [cartOpen, setCartOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const selectedPrice = selectedProduct.price[selectedSize];

  const handleAddToCart = () => {
    setCartOpen(true);
    setCartItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.productId === selectedProduct.id && item.size === selectedSize
      );
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...current,
        {
          productId: selectedProduct.id,
          name: selectedProduct.name,
          size: selectedSize,
          price: selectedPrice,
          quantity: 1,
          img: selectedProduct.img,
        },
      ];
    });
  };

  const changeCartQuantity = (index, delta) => {
    setCartItems((current) => {
      const next = [...current];
      next[index].quantity += delta;
      if (next[index].quantity <= 0) {
        next.splice(index, 1);
      }
      return next;
    });
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const suggestions = products.filter(
    (product) => product.family === selectedProduct.family && product.id !== selectedProduct.id
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-serif antialiased">
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
          navScrolled ? 'bg-white/75 backdrop-blur-md border-b border-black/5 shadow-sm' : 'bg-transparent'
        }`}
      >
        <Menu size={20} className="cursor-pointer" />
        <div className="text-lg tracking-[0.35em] font-light uppercase">TwinScent</div>
        <div className="flex items-center gap-5">
          <Search size={20} className="cursor-pointer" />
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm uppercase tracking-[0.25em] transition hover:shadow-lg"
          >
            <ShoppingBag size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="pt-24">
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1543451906-081213830ecb?auto=format&fit=crop&q=80"
              alt="Luxury perfume bottle"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white">
            <span className="mb-4 text-sm uppercase tracking-[0.5em] text-white/80">Nouvelle Collection</span>
            <h1 className="max-w-3xl text-5xl font-light leading-tight md:text-7xl">L'Essence du Soir</h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
              Découvrez une maison de parfums où chaque flacon raconte une histoire de luxe, de lumière et de mémoire.
            </p>
            <button className="mt-10 rounded-full border border-white/80 px-10 py-4 text-sm uppercase tracking-[0.3em] transition hover:bg-white hover:text-black">
              Explorer les fragrances
            </button>
          </div>
        </section>

        <section className="relative overflow-hidden px-8 py-20 md:px-16">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(251,240,234,0.85),transparent_55%)] pointer-events-none" />
          <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="overflow-hidden rounded-[36px] bg-[#F8F3EE] shadow-[0_32px_120px_rgba(0,0,0,0.08)]"
            >
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="h-[560px] w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-sm uppercase tracking-[0.4em] text-[#7a716c]">Édition Limitée</span>
                <h2 className="text-5xl font-light leading-tight">{selectedProduct.name}</h2>
                <p className="max-w-xl text-sm leading-8 text-[#4f4b48]">{selectedProduct.description}</p>
              </div>

              <div className="grid gap-6 rounded-[32px] border border-black/5 bg-white/90 p-8 shadow-lg">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.32em] text-[#7a716c]">Notes olfactives</p>
                  <ul className="space-y-3 text-sm text-[#2a2724]">
                    {selectedProduct.notes.map((note) => (
                      <li key={note} className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-black" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.32em] text-[#7a716c]">Taille</p>
                  <div className="flex flex-wrap gap-3">
                    {['50ml', '100ml'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-5 py-3 text-sm transition ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-black/10 bg-white text-[#1A1A1A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-[#7a716c]">Prix</p>
                    <p className="mt-3 text-5xl font-thin">{selectedPrice}€</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="rounded-full bg-black px-8 py-4 text-sm uppercase tracking-[0.3em] text-white shadow-xl transition hover:bg-[#111111]"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-8 pb-20 md:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#7a716c]">Collection premium</p>
                <h3 className="mt-4 text-4xl font-light">Nos Best-Sellers</h3>
              </div>
              <a href="#" className="text-sm uppercase tracking-[0.35em] underline underline-offset-8 text-[#1A1A1A]">
                Voir tout
              </a>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedSize('100ml');
                  }}
                  className="group overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_22px_80px_rgba(0,0,0,0.06)] transition hover:-translate-y-1"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#F7F2EE]">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-6 text-left">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#7a716c]">{product.family}</p>
                    <h4 className="text-2xl font-light">{product.name}</h4>
                    <p className="text-sm leading-7 text-[#4f4b48]">{product.description}</p>
                    <p className="text-lg font-semibold">{product.price['100ml']}€</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/90 px-8 py-20 md:px-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#7a716c]">Nos Ingrédients</p>
              <h3 className="text-4xl font-light">Une composition pure et sophistiquée</h3>
              <p className="max-w-xl text-sm leading-8 text-[#4f4b48]">
                Chacun de nos parfums repose sur des matières premières rares et un équilibre subtil conçu pour durer.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {ingredients.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-[32px] border border-black/5 bg-[#F8F3EE] p-8 shadow-sm">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-xl font-medium">{title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[#4f4b48]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-8 py-20 md:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-[#7a716c]">Suggestions</p>
              <h3 className="mt-4 text-4xl font-light">Produits basés sur la même famille de senteurs</h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_18px_70px_rgba(0,0,0,0.05)]"
                >
                  <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[28px] bg-[#F7F2EE]">
                    <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#7a716c]">{product.family}</p>
                  <h4 className="mt-3 text-2xl font-light">{product.name}</h4>
                  <p className="mt-4 text-sm leading-7 text-[#4f4b48]">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="ml-auto flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#7a716c]">Votre panier</p>
                  <h2 className="mt-2 text-3xl font-semibold">Édition Prestige</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="rounded-full border border-black/10 p-3 transition hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="rounded-[28px] border border-dashed border-black/10 bg-[#F8F3EE] p-10 text-center text-sm text-[#4f4b48]">
                    Votre panier est vide pour l'instant. Sélectionnez une taille et ajoutez votre parfum.
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4 rounded-[28px] border border-black/10 bg-[#FAF7F4] p-5">
                      <img src={item.img} alt={item.name} className="h-24 w-24 rounded-3xl object-cover" />
                      <div className="flex-1">
                        <p className="text-lg font-medium">{item.name}</p>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#7a716c]">{item.size}</p>
                        <p className="mt-3 text-sm text-[#4f4b48]">{item.quantity} × {item.price}€</p>
                      </div>
                      <div className="flex flex-col items-center justify-between">
                        <button
                          type="button"
                          onClick={() => changeCartQuantity(index, 1)}
                          className="rounded-full border border-black/10 px-3 py-2 text-sm"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => changeCartQuantity(index, -1)}
                          className="rounded-full border border-black/10 px-3 py-2 text-sm"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-black/10 p-6">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-[#7a716c]">
                  <span>Total</span>
                  <span>{totalAmount}€</span>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full bg-black px-6 py-4 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-[#111111]"
                >
                  Passer à la caisse
                </button>
              </div>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => setCartOpen(false)}
              className="flex-1 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerfumeStore;
