import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Menu, Sparkles, Droplet, Leaf, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fallbackPerfumeImage = 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80';

const perfumeShots = {
    p1: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    p2: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    p3: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80',
    p4: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80',
    p5: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    p6: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80',
    p7: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80',
    p8: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&w=900&q=80',
    p9: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    p10: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=80',
    p11: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=900&q=80',
    p12: 'https://images.unsplash.com/photo-1610242235318-7cf23c196c88?auto=format&fit=crop&w=900&q=80',
    g1: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
    g2: 'https://images.unsplash.com/photo-1616604847462-4de449f4f58d?auto=format&fit=crop&w=900&q=80',
    g3: 'https://images.unsplash.com/photo-1619994403073-2cec7e7991d2?auto=format&fit=crop&w=900&q=80',
    g4: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=900&q=80',
    g5: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=80',
    g6: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
};

const products = [
    {
        id: 1,
        name: 'Oud Mystique',
        family: 'Boisé',
        category: 'Homme',
        description: 'Un parfum riche aux notes de bois, cuir et encens.',
        notes: ['Oud', 'Cèdre', 'Ambre'],
        price: { '50ml': 85, '100ml': 120 },
        img: perfumeShots.p1,
    },
    {
        id: 2,
        name: 'Rose Sauvage',
        family: 'Floral',
        category: 'Femme',
        description: 'Une rose veloutée mêlée à des pétales frais et une touche musquée.',
        notes: ['Rose', 'Jasmin', 'Musc'],
        price: { '50ml': 70, '100ml': 95 },
        img: perfumeShots.p2,
    },
    {
        id: 4,
        name: 'Nuit Étoilée',
        family: 'Frais',
        category: 'Homme',
        description: 'Une brise marine vivifiante avec des accents d\'agrumes piquants.',
        notes: ['Bergamote', 'Sel de mer', 'Vétiver'],
        price: { '50ml': 75, '100ml': 110 },
        img: perfumeShots.p4,
    },
    {
        id: 5,
        name: 'Fleur d\'Oranger',
        family: 'Floral',
        category: 'Femme',
        description: 'Un bouquet solaire et radieux, évoquant la douceur méditerranéenne.',
        notes: ['Fleur d\'oranger', 'Néroli', 'Miel'],
        price: { '50ml': 80, '100ml': 115 },
        img: perfumeShots.p5,
    },
    {
        id: 6,
        name: 'Cuir Royal',
        family: 'Boisé',
        category: 'Homme',
        description: 'Un accord intense de cuir adouci par la chaleur du safran.',
        notes: ['Cuir', 'Safran', 'Bois de santal'],
        price: { '50ml': 120, '100ml': 175 },
        img: perfumeShots.p6,
    },
    {
        id: 7,
        name: 'Jasmin Éternel',
        family: 'Floral',
        category: 'Femme',
        description: 'Un jasmin envoûtant aux notes poudreuses et sensuelles.',
        notes: ['Jasmin', 'Musc blanc', 'Iris'],
        price: { '50ml': 90, '100ml': 130 },
        img: perfumeShots.p7,
    },
    {
        id: 8,
        name: 'Bois Sacré',
        family: 'Boisé',
        category: 'Homme',
        description: 'Un bois sombre et mystérieux avec une âme méditative.',
        notes: ['Cèdre', 'Encens', 'Musc'],
        price: { '50ml': 95, '100ml': 140 },
        img: perfumeShots.p8,
    },
    {
        id: 9,
        name: 'Velours Nacré',
        family: 'Oriental',
        category: 'Femme',
        description: 'Une orientale douce et crémeuse aux reflets nacrés.',
        notes: ['Vanille', 'Benjoin', 'Rose'],
        price: { '50ml': 88, '100ml': 125 },
        img: perfumeShots.p9,
    },
    {
        id: 10,
        name: 'Santal Impérial',
        family: 'Boisé',
        category: 'Homme',
        description: 'Un santal crémeux relevé d\'épices sèches et d\'ambre doux.',
        notes: ['Santal', 'Cardamome', 'Ambre'],
        price: { '50ml': 98, '100ml': 138 },
        img: perfumeShots.p10,
    },
    {
        id: 11,
        name: 'Iris Satin',
        family: 'Floral',
        category: 'Femme',
        description: 'Un iris poudré et élégant, porté par une muscade délicate.',
        notes: ['Iris', 'Muscade', 'Musc blanc'],
        price: { '50ml': 92, '100ml': 132 },
        img: perfumeShots.p11,
    },
    {
        id: 12,
        name: 'Néroli Doré',
        family: 'Frais',
        category: 'Unisexe',
        description: 'Un néroli lumineux aux agrumes fins et fond boisé discret.',
        notes: ['Néroli', 'Petitgrain', 'Bois blond'],
        price: { '50ml': 86, '100ml': 122 },
        img: perfumeShots.p12,
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

const paymentIcons = [
    {
        name: 'PayPal',
        svg: (
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <rect width="60" height="40" rx="6" fill="#003087" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Arial">PayPal</text>
            </svg>
        ),
    },
    {
        name: 'Visa',
        svg: (
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <rect width="60" height="40" rx="6" fill="#1A1F71" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800" fontFamily="Arial" fontStyle="italic">VISA</text>
            </svg>
        ),
    },
    {
        name: 'Mastercard',
        svg: (
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <rect width="60" height="40" rx="6" fill="#252525" />
                <circle cx="24" cy="20" r="11" fill="#EB001B" />
                <circle cx="36" cy="20" r="11" fill="#F79E1B" />
                <path d="M30 11.8a11 11 0 0 1 0 16.4A11 11 0 0 1 30 11.8z" fill="#FF5F00" />
            </svg>
        ),
    },
    {
        name: 'Apple Pay',
        svg: (
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <rect width="60" height="40" rx="6" fill="#000000" />
                <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="600" fontFamily="Arial"> Pay</text>
                <text x="29" y="52%" dominantBaseline="middle" textAnchor="end" fill="#ffffff" fontSize="13" fontFamily="Arial"></text>
            </svg>
        ),
    },
    {
        name: 'Google Pay',
        svg: (
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <rect width="60" height="40" rx="6" fill="#ffffff" stroke="#e0e0e0" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#3c4043" fontSize="9" fontWeight="600" fontFamily="Arial">G Pay</text>
            </svg>
        ),
    },
    {
        name: 'Virement',
        svg: (
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <rect width="60" height="40" rx="6" fill="#1e8449" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="Arial">VIREMENT</text>
            </svg>
        ),
    },
];

const paymentMethods = [
    { label: 'Carte de crédit', description: 'Visa, Mastercard, American Express.' },
    { label: 'PayPal', description: 'Paiement sécurisé avec votre compte PayPal.' },
    { label: 'Virement bancaire', description: 'Pour les commandes premium et réassorts.' },
];

const deliveryOptions = [
    { label: 'Livraison standard', description: '3-5 jours ouvrés, suivi inclus.' },
    { label: 'Livraison express', description: '1-2 jours ouvrés pour les commandes urgentes.' },
    { label: 'Retrait en boutique', description: 'Disponible dans notre boutique à Paris.' },
];

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[9] || products[0]);
    const [selectedSize, setSelectedSize] = useState('100ml');
    const [cartOpen, setCartOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [navScrolled, setNavScrolled] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [darkMode, setDarkMode] = useState(false);
    const [activeProductModal, setActiveProductModal] = useState(null);
    const [modalSize, setModalSize] = useState('100ml');
    const [checkoutStep, setCheckoutStep] = useState('cart');
    const [checkoutForm, setCheckoutForm] = useState({
        name: '',
        email: '',
        address: '',
        payment: paymentMethods[0].label,
        delivery: deliveryOptions[0].label,
    });

    // Theme helper
    const t = {
        bg: darkMode ? 'bg-[#0D0D0D]' : 'bg-[#FDFCFB]',
        text: darkMode ? 'text-[#E8E0D6]' : 'text-[#1A1A1A]',
        textMuted: darkMode ? 'text-[#7a716c]' : 'text-[#7a716c]',
        textSub: darkMode ? 'text-[#a09890]' : 'text-[#4f4b48]',
        navBg: darkMode ? 'bg-[#0D0D0D]/80 border-white/5' : 'bg-white/75 border-black/5',
        cardBg: darkMode ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-black/5',
        cardBg2: darkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-black/5',
        inputBg: darkMode ? 'bg-[#1A1A1A] border-white/10 text-[#E8E0D6]' : 'bg-[#FAF7F4] border-black/10 text-[#1A1A1A]',
        pillBg: darkMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-white/90 border-black/10',
        sectionBg: darkMode ? 'bg-[#111111]' : 'bg-white/90',
        warmBg: darkMode ? 'bg-[#0F0F0F]' : 'bg-[#F8F3EE]',
        warmCard: darkMode ? 'bg-[#1C1A18]' : 'bg-[#F8F3EE]',
        btnOutline: darkMode ? 'border-white/20 text-[#E8E0D6] hover:border-white/60' : 'border-black/10 text-[#1A1A1A] hover:border-black',
        accent: darkMode ? 'bg-white text-black hover:bg-[#E8E0D6]' : 'bg-black text-white hover:bg-[#111111]',
        cartItem: darkMode ? 'bg-[#1C1A18] border-white/10' : 'bg-[#FAF7F4] border-black/10',
        separator: darkMode ? 'border-white/10' : 'border-black/10',
    };

    useEffect(() => {
        const onScroll = () => setNavScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const selectedPrice = selectedProduct.price[selectedSize];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToProducts = () => {
        const section = document.getElementById('product-details');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const selectProductAndShowDetails = (product) => {
        setSelectedProduct(product);
        setSelectedSize('100ml');
        scrollToProducts();
    };

    const addItemToCart = (product, size) => {
        setCheckoutMessage('');
        setCheckoutStep('cart');
        setCartOpen(true);
        setCartItems((current) => {
            const existingIndex = current.findIndex(
                (item) => item.productId === product.id && item.size === size
            );
            if (existingIndex >= 0) {
                const next = [...current];
                next[existingIndex].quantity += 1;
                return next;
            }
            return [
                ...current,
                {
                    productId: product.id,
                    name: product.name,
                    size,
                    price: product.price[size],
                    quantity: 1,
                    img: product.img,
                },
            ];
        });
    };

    const handleAddToCart = () => {
        addItemToCart(selectedProduct, selectedSize);
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
    const shippingFeeMap = {
        'Livraison standard': 6,
        'Livraison express': 12,
        'Retrait en boutique': 0,
    };
    const shippingFee = checkoutForm.delivery ? (shippingFeeMap[checkoutForm.delivery] ?? 0) : 0;
    const taxAmount = Math.round(totalAmount * 0.05);
    const grandTotal = totalAmount + shippingFee + taxAmount;
    const [checkoutMessage, setCheckoutMessage] = useState('');

    const openCheckout = () => {
        if (cartItems.length === 0) {
            setCheckoutMessage('Votre panier est vide. Ajoutez un parfum avant de passer a la caisse.');
            return;
        }
        setCheckoutMessage('');
        setCheckoutStep('checkout');
    };

    const handleCheckout = () => {
        if (!checkoutForm.name.trim() || !checkoutForm.email.trim() || !checkoutForm.address.trim()) {
            setCheckoutMessage('Veuillez remplir votre nom, email et adresse pour finaliser l achat.');
            return;
        }
        const orderRef = `TS-${Date.now().toString().slice(-6)}`;
        setCheckoutMessage(`Commande confirmee (${orderRef}) ! Total ${grandTotal}EUR. Merci pour votre achat.`);
        setCartItems([]);
        setCheckoutStep('cart');
        setCheckoutForm({
            name: '',
            email: '',
            address: '',
            payment: paymentMethods[0].label,
            delivery: deliveryOptions[0].label,
        });
    };

    const closeCart = () => {
        setCartOpen(false);
        setCheckoutStep('cart');
    };

    const suggestions = products.filter(
        (product) => product.family === selectedProduct.family && product.id !== selectedProduct.id
    );

    const filteredProducts = products.filter((product) => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return true;
        return (
            product.name.toLowerCase().includes(query) ||
            product.family.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.notes.some(note => note.toLowerCase().includes(query))
        );
    });

    const categories = ['Tous', 'Femme', 'Homme', 'Floral', 'Boisé', 'Oriental', 'Frais'];
    const filteredByCategory = selectedCategory === 'Tous'
        ? products
        : products.filter((p) => p.category === selectedCategory || p.family === selectedCategory);

    return (
        <div className={`min-h-screen ${t.bg} ${t.text} font-serif antialiased transition-colors duration-500`}>
            <nav
                className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 transition-all duration-500 ${navScrolled ? `${t.navBg} backdrop-blur-md border-b shadow-sm` : 'bg-transparent'}`}
            >
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className={`md:hidden rounded-full border p-2 sm:p-3 transition hover:shadow-lg ${t.pillBg} ${t.text}`}
                        aria-label="Ouvrir le menu"
                    >
                        <Menu size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="text-base sm:text-lg lg:text-xl tracking-[0.35em] font-light uppercase transition hover:opacity-80"
                    >
                        ouchen_store
                    </button>
                </div>

                <div className={`hidden md:flex items-center gap-6 lg:gap-8 uppercase tracking-[0.22em] text-xs sm:text-sm ${t.text}`}>
                    <a href="#produits" className="transition hover:text-[#7a716c]">Produits</a>
                    <a href="#apropos" className="transition hover:text-[#7a716c]">À propos</a>
                    <a href="#contact" className="transition hover:text-[#7a716c]">Contact</a>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme toggle */}
                    <button
                        type="button"
                        onClick={() => setDarkMode((d) => !d)}
                        className={`rounded-full border p-2 sm:p-3 transition hover:shadow-lg ${t.pillBg} ${t.text}`}
                        aria-label="Basculer le thème"
                    >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchOpen(true)}
                        className={`rounded-full border p-2 sm:p-3 transition hover:shadow-lg ${t.pillBg} ${t.text}`}
                        aria-label="Ouvrir la recherche"
                    >
                        <Search size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setCheckoutStep('cart');
                            setCartOpen(true);
                        }}
                        className={`relative rounded-full border px-3 sm:px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.25em] transition hover:shadow-lg ${t.pillBg} ${t.text}`}
                    >
                        <ShoppingBag size={16} />
                        {cartItems.length > 0 && (
                            <span className={`absolute -top-2 -right-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full text-xs ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            className={`w-full max-w-xl rounded-[30px] border p-8 shadow-2xl ${t.cardBg} ${t.text}`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className={`text-sm uppercase tracking-[0.3em] ${t.textMuted}`}>Rechercher</p>
                                    <h2 className="mt-2 text-3xl font-light">Cherchez votre parfum</h2>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Fermer la recherche"
                                    onClick={() => setSearchOpen(false)}
                                    className={`rounded-full border p-3 transition ${t.btnOutline}`}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Nom du parfum, famille, notes..."
                                className={`w-full rounded-[24px] border px-5 py-4 text-sm outline-none transition ${t.inputBg} focus:border-white/30`}
                            />
                            <div className="mt-8 space-y-4">
                                {filteredProducts.length === 0 ? (
                                    <p className={`text-sm ${t.textSub}`}>Aucun parfum trouvé. Essayez un autre mot-clé.</p>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => {
                                                selectProductAndShowDetails(product);
                                                setSearchOpen(false);
                                            }}
                                            className={`w-full rounded-[24px] border px-5 py-4 text-left transition ${t.warmCard} ${t.btnOutline}`}
                                        >
                                            <p className={`text-sm uppercase tracking-[0.28em] ${t.textMuted}`}>{product.family}</p>
                                            <h3 className={`mt-1 text-lg font-medium ${t.text}`}>{product.name}</h3>
                                        </button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            className={`ml-auto h-full w-72 p-8 shadow-2xl ${darkMode ? 'bg-[#111111]' : 'bg-[#FDFCFB]'}`}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-10 flex items-center justify-between">
                                <span className={`text-sm uppercase tracking-[0.28em] ${t.textMuted}`}>Menu</span>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-full border p-3 transition ${t.btnOutline}`}
                                    aria-label="Fermer le menu"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <nav className={`flex flex-col gap-6 text-lg font-light uppercase tracking-[0.25em] ${t.text}`}>
                                <a href="#produits" onClick={() => setMenuOpen(false)} className="transition hover:text-[#7a716c]">Produits</a>
                                <a href="#apropos" onClick={() => setMenuOpen(false)} className="transition hover:text-[#7a716c]">À propos</a>
                                <a href="#contact" onClick={() => setMenuOpen(false)} className="transition hover:text-[#7a716c]">Contact</a>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-0">
                <section className={`relative flex min-h-screen items-center overflow-hidden px-4 pb-4 pt-16 sm:px-8 sm:pb-6 sm:pt-20 lg:px-16 lg:pt-20 ${darkMode ? 'bg-gradient-to-br from-[#0d0d0d] via-[#141414] to-[#1b1612]' : 'bg-gradient-to-br from-[#fffaf6] via-[#f8f0ea] to-[#efe4dc]'}`}>
                    <div className="absolute -left-20 top-20 h-52 w-52 rounded-full bg-[#d4a574]/20 blur-3xl" />
                    <div className="absolute -right-16 bottom-10 h-60 w-60 rounded-full bg-[#7a716c]/20 blur-3xl" />

                    <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-3 sm:space-y-4">
                            <span className={`inline-flex rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.35em] ${t.pillBg} ${t.textMuted}`}>
                                Nouvelle Collection
                            </span>
                            <h1 className="max-w-2xl text-2xl sm:text-4xl lg:text-5xl font-light leading-tight">
                                L'Art du Parfum,
                                <span className="block">Designé avec Elegance</span>
                            </h1>
                            <p className={`max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 ${t.textSub}`}>
                                Une composition visuelle moderne et une selection de fragrances d'exception, pour une experience premium des la premiere visite.
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={scrollToProducts}
                                    className={`rounded-full px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-[0.26em] transition ${t.accent}`}
                                >
                                    Explorer les fragrances
                                </button>
                                <span className={`text-[11px] sm:text-xs uppercase tracking-[0.25em] ${t.textMuted}`}>
                                    12 parfums exclusifs
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-2.5">
                            <div className={`rounded-[20px] border px-4 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.1)] ${t.cardBg}`}>
                                <p className={`text-[10px] uppercase tracking-[0.3em] ${t.textMuted}`}>Selection du moment</p>
                                <p className="mt-2 text-xl font-light">{selectedProduct.name}</p>
                                <p className={`mt-1 text-xs ${t.textSub}`}>{selectedProduct.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`rounded-[18px] border px-3 py-3 ${t.warmCard} ${t.separator}`}>
                                    <p className={`text-[10px] uppercase tracking-[0.24em] ${t.textMuted}`}>Notes</p>
                                    <p className="mt-2 text-sm font-medium">{selectedProduct.notes[0]}</p>
                                    <p className={`text-xs ${t.textSub}`}>{selectedProduct.notes[1]}</p>
                                </div>
                                <div className={`rounded-[18px] border px-3 py-3 ${t.warmCard} ${t.separator}`}>
                                    <p className={`text-[10px] uppercase tracking-[0.24em] ${t.textMuted}`}>Format</p>
                                    <p className="mt-2 text-sm font-medium">50ml / 100ml</p>
                                    <p className={`text-xs ${t.textSub}`}>Edition premium</p>
                                </div>
                            </div>
                            <div className={`rounded-[18px] border px-4 py-3 ${t.warmCard} ${t.separator}`}>
                                <p className={`text-[10px] uppercase tracking-[0.24em] ${t.textMuted}`}>Experience</p>
                                <p className={`mt-1 text-xs ${t.textSub}`}>
                                    Design minimal, style luxe et navigation rapide pour trouver votre parfum ideal.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="product-details" className={`relative overflow-hidden px-4 sm:px-8 py-8 sm:py-12 lg:px-16 ${t.bg}`}>
                    <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-[radial-gradient(circle_at_top,_rgba(251,240,234,0.15),transparent_55%)] pointer-events-none" />
                    <div className="relative mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-[1.15fr_0.85fr] items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className={`overflow-hidden rounded-[20px] sm:rounded-[28px] shadow-[0_18px_55px_rgba(0,0,0,0.16)] ${t.warmBg}`}
                        >
                            <img
                                src={selectedProduct.img}
                                alt={selectedProduct.name}
                                className="h-[280px] sm:h-[360px] lg:h-[420px] w-full object-cover"
                                onError={(e) => {
                                    e.target.src = fallbackPerfumeImage;
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                            className="space-y-6 sm:space-y-8"
                        >
                            <div className="space-y-3 sm:space-y-4">
                                <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#7a716c]">Édition Limitée</span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight">{selectedProduct.name}</h2>
                                <p className="max-w-xl text-[11px] sm:text-xs leading-5 sm:leading-6 text-[#4f4b48]">{selectedProduct.description}</p>
                            </div>

                            <div className={`grid gap-4 sm:gap-5 rounded-[20px] sm:rounded-[28px] border p-5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.12)] ${t.cardBg}`}>
                                <div className="space-y-3 sm:space-y-4">
                                    <p className={`text-xs sm:text-sm uppercase tracking-[0.32em] ${t.textMuted}`}>Notes olfactives</p>
                                    <ul className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${t.textSub}`}>
                                        {selectedProduct.notes.map((note) => (
                                            <li key={note} className="flex items-center gap-3">
                                                <span className={`h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full ${darkMode ? 'bg-white' : 'bg-black'}`} />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <p className={`text-xs sm:text-sm uppercase tracking-[0.32em] ${t.textMuted}`}>Taille</p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {['50ml', '100ml'].map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`rounded-full border px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm transition ${selectedSize === size
                                                    ? darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                                                    : darkMode ? 'border-white/20 bg-transparent text-[#E8E0D6]' : 'border-black/10 bg-white text-[#1A1A1A]'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 sm:gap-5 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className={`text-xs sm:text-sm uppercase tracking-[0.32em] ${t.textMuted}`}>Prix</p>
                                        <p className="mt-2 sm:mt-3 text-4xl sm:text-5xl font-thin">{selectedPrice}€</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className={`rounded-full px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.3em] shadow-xl transition ${t.accent}`}
                                    >
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="produits" className={`px-4 sm:px-8 pb-12 sm:pb-20 lg:px-16 ${t.bg}`}>
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 sm:mb-12 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className={`text-xs sm:text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>Collection premium</p>
                                <h3 className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-light">Nos Best-Sellers</h3>
                            </div>
                            <a href="#produits" className={`text-xs sm:text-sm uppercase tracking-[0.35em] underline underline-offset-8 ${t.text}`}>
                                Voir tout
                            </a>
                        </div>
                        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <button
                                    key={product.id}
                                    type="button"
                                    onClick={() => {
                                        selectProductAndShowDetails(product);
                                        setActiveProductModal(product);
                                        setModalSize('100ml');
                                    }}
                                    className={`group overflow-hidden rounded-[18px] sm:rounded-[20px] border shadow-[0_10px_24px_rgba(0,0,0,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.16)] ${t.cardBg}`}
                                >
                                    <div className={`h-36 sm:h-44 overflow-hidden ${t.warmBg}`}>
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.src = fallbackPerfumeImage;
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2 p-3 sm:p-4 text-left">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className={`text-[10px] sm:text-[11px] uppercase tracking-[0.28em] ${t.textMuted}`}>{product.family}</p>
                                            <p className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] ${t.textMuted}`}>{product.category}</p>
                                        </div>
                                        <h4 className="text-base sm:text-lg font-light leading-tight">{product.name}</h4>
                                        <p className={`text-xs leading-5 ${t.textSub}`}>{product.description}</p>
                                        <p className={`text-[11px] uppercase tracking-[0.22em] ${t.textMuted}`}>
                                            {product.notes.slice(0, 3).join(' • ')}
                                        </p>
                                        <div className="flex items-center justify-between pt-1">
                                            <p className="text-xs font-semibold">50ml: {product.price['50ml']}€</p>
                                            <p className="text-xs font-semibold">100ml: {product.price['100ml']}€</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="ingredients" className={`px-4 sm:px-8 py-20 sm:py-32 lg:px-16 ${darkMode ? 'bg-gradient-to-b from-[#0D0D0D] via-[#111] to-[#141414]' : 'bg-gradient-to-b from-[#FDFCFB] via-white to-[#F8F3EE]'}`}>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 sm:mb-24 space-y-4 sm:space-y-6">
                            <p className={`text-xs sm:text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>Excellence & Pureté</p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">Nos Ingrédients</h2>
                            <p className={`text-sm sm:text-lg leading-6 sm:leading-8 max-w-3xl ${t.textSub}`}>
                                Une composition pure et sophistiquée. Chacun de nos parfums repose sur des matières premières rares et un équilibre subtil conçu pour durer.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:gap-10 md:grid-cols-3 mb-16 sm:mb-24">
                            {ingredients.map(({ icon: Icon, title, description }) => (
                                <div key={title} className={`rounded-[24px] sm:rounded-[36px] border p-6 sm:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition ${t.cardBg}`}>
                                    <div className={`mb-6 sm:mb-8 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-[20px] sm:rounded-[24px] ${t.warmCard}`}>
                                        <Icon size={24} className="text-[#7a716c]" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4">{title}</h3>
                                    <p className={`text-xs sm:text-sm leading-5 sm:leading-7 ${t.textSub}`}>{description}</p>
                                </div>
                            ))}
                        </div>

                        <div className={`border-t pt-16 ${t.separator}`}>
                            <div className="mb-12 space-y-6">
                                <h3 className="text-3xl font-light">Explorer par catégorie</h3>
                                <p className={`text-sm ${t.textSub}`}>Découvrez nos collections parfumées adaptées à chaque style et occasion</p>

                                <div className="flex flex-wrap gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`rounded-full px-6 py-3 text-sm uppercase tracking-[0.25em] transition ${selectedCategory === cat
                                                ? darkMode ? 'bg-white text-black border border-white' : 'bg-black text-white border border-black'
                                                : darkMode ? 'border border-white/20 text-[#E8E0D6] hover:border-white/60' : 'border border-black/10 text-[#1A1A1A] hover:border-black'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredByCategory.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredByCategory.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`rounded-[28px] border p-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.2)] transition cursor-pointer ${t.cardBg}`}
                                            onClick={() => {
                                                selectProductAndShowDetails(product);
                                            }}
                                        >
                                            <div className={`mb-5 aspect-[5/4] overflow-hidden rounded-[24px] ${t.warmBg}`}>
                                                <img
                                                    src={product.img}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover hover:scale-105 transition duration-500"
                                                    onError={(e) => {
                                                        e.target.src = fallbackPerfumeImage;
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <p className={`text-sm uppercase tracking-[0.28em] ${t.textMuted}`}>{product.family}</p>
                                                <h4 className="text-xl font-light">{product.name}</h4>
                                                <p className={`text-sm uppercase tracking-[0.2em] ${t.textMuted}`}>{product.category}</p>
                                                <p className={`text-sm leading-6 ${t.textSub}`}>{product.description}</p>
                                                <p className="text-base font-semibold">{product.price['100ml']}€</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-sm text-[#4f4b48]">Aucun parfum disponible dans cette catégorie</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section id="apropos" className={`px-4 sm:px-8 py-20 sm:py-32 lg:px-16 ${darkMode ? 'bg-gradient-to-b from-[#111] to-[#0D0D0D]' : 'bg-gradient-to-b from-white/90 to-[#FBF7F3]'}`}>
                    <div className="mx-auto max-w-5xl space-y-16">
                        <div className="space-y-6">
                            <p className={`text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>À propos de nous</p>
                            <h2 className="text-5xl md:text-6xl font-light leading-tight">La maison ouchen_store</h2>
                            <p className={`text-lg leading-8 max-w-3xl ${t.textSub}`}>
                                Fondée sur l'idée que le parfum est une expérience sensorielle, ouchen_store associe des ingrédients rares, des flacons élégants et un service sur-mesure pour créer une connexion intemporelle avec chaque client.
                            </p>
                        </div>

                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-light mb-4">Notre savoir-faire</h3>
                                    <p className={`text-sm leading-7 ${t.textSub}`}>
                                        Nos parfumeurs sélectionnent chaque accord avec précision pour créer des compositions intemporelles qui flattent la peau et la mémoire.
                                    </p>
                                </div>
                                <ul className={`space-y-5 text-sm ${t.textSub}`}>
                                    <li className="flex gap-4">
                                        <span className="text-lg">✦</span>
                                        <span>Expertise artisanale et ingrédients rares</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-lg">✦</span>
                                        <span>Flacons sculpturaux et packaging épuré</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-lg">✦</span>
                                        <span>Expérience client premium et service personnalisé</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={`rounded-[36px] border p-12 shadow-[0_24px_80px_rgba(0,0,0,0.15)] ${t.cardBg}`}>
                                <h3 className="text-2xl font-light mb-6">Notre mission</h3>
                                <p className={`text-sm leading-8 ${t.textSub}`}>
                                    Créer des moments de grâce par la beauté. Chaque flacon raconte une histoire de luxe, de lumière et de mémoire. Nous croyons que le parfum transcende le temps et les tendances.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className={`px-4 sm:px-8 py-16 sm:py-24 lg:px-16 ${t.bg}`}>
                    <div className="mx-auto max-w-5xl">
                        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                            <p className={`text-xs sm:text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>Contact</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">Parlez avec notre équipe</h2>
                        </div>

                        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
                            <div className={`rounded-[20px] sm:rounded-[28px] border p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.12)] max-w-md ${t.cardBg}`}>
                                <h3 className="text-2xl font-light mb-4">Nous joindre</h3>
                                <p className={`text-sm leading-7 mb-8 ${t.textSub}`}>
                                    Pour une commande sur mesure ou une question sur nos fragrances, notre équipe est à votre écoute et prête à vous conseiller.
                                </p>
                                <div className={`space-y-4 text-[12px] ${t.textSub}`}>
                                    <div>
                                        <p className={`font-semibold uppercase tracking-[0.18em] ${t.textMuted}`}>Email</p>
                                        <p className="mt-1 text-[12px]">contact@ouchen_store.fr</p>
                                    </div>
                                    <div>
                                        <p className={`font-semibold uppercase tracking-[0.18em] ${t.textMuted}`}>Téléphone</p>
                                        <p className="mt-1 text-[12px]">+33 1 23 45 67 89</p>
                                    </div>
                                    <div>
                                        <p className={`font-semibold uppercase tracking-[0.18em] ${t.textMuted}`}>Adresse</p>
                                        <p className="mt-1 text-[12px]">12 rue de la Parfumerie<br />75002 Paris, France</p>
                                    </div>
                                </div>
                            </div>

                            <form className={`rounded-[20px] sm:rounded-[28px] border p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.12)] ${t.cardBg}`}>
                                <h3 className="text-2xl font-light mb-6">Envoyez-nous un message</h3>
                                <div className="grid gap-6">
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        className={`w-full rounded-[24px] border px-6 py-4 text-sm outline-none transition ${t.inputBg}`}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Votre email"
                                        className={`w-full rounded-[24px] border px-6 py-4 text-sm outline-none transition ${t.inputBg}`}
                                    />
                                    <textarea
                                        rows="5"
                                        placeholder="Votre message"
                                        className={`w-full rounded-[24px] border px-6 py-4 text-sm outline-none transition resize-none ${t.inputBg}`}
                                    />
                                    <button
                                        type="button"
                                        className={`w-full rounded-full px-8 py-4 text-sm uppercase tracking-[0.3em] transition ${t.accent}`}
                                    >
                                        Envoyer le message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className={`px-4 sm:px-8 py-12 sm:py-20 lg:px-16 ${darkMode ? 'bg-[#0F0F0F]' : 'bg-[#FBF7F3]'}`}>
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                            <div className={`rounded-[28px] border p-8 shadow-[0_18px_60px_rgba(0,0,0,0.12)] ${t.cardBg}`}>
                                <p className={`text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>Méthodes de paiement</p>
                                <h3 className="mt-3 text-3xl font-light">Paiement sécurisé</h3>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {paymentIcons.map((pm) => (
                                        <div key={pm.name} title={pm.name} className="transition hover:-translate-y-0.5 cursor-default">
                                            {pm.svg}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 space-y-4">
                                    {paymentMethods.map((method) => (
                                        <div key={method.label} className={`rounded-[20px] border p-4 flex items-center gap-4 ${t.warmCard} ${t.separator}`}>
                                            <span className="text-[#7a716c] text-lg">✦</span>
                                            <div>
                                                <p className={`text-sm font-medium ${t.text}`}>{method.label}</p>
                                                <p className={`text-xs mt-0.5 ${t.textSub}`}>{method.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`rounded-[28px] border p-8 shadow-[0_18px_60px_rgba(0,0,0,0.12)] ${t.cardBg}`}>
                                <p className={`text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>Livraison</p>
                                <h3 className="mt-3 text-3xl font-light">Options de livraison</h3>
                                <div className="mt-8 space-y-4">
                                    {deliveryOptions.map((option) => (
                                        <div key={option.label} className={`rounded-[20px] border p-4 flex items-center gap-4 ${t.warmCard} ${t.separator}`}>
                                            <span className="text-[#7a716c] text-lg">✦</span>
                                            <div>
                                                <p className={`text-sm font-medium ${t.text}`}>{option.label}</p>
                                                <p className={`text-xs mt-0.5 ${t.textSub}`}>{option.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <AnimatePresence>
                {activeProductModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveProductModal(null)}
                    >
                        <motion.div
                            className={`h-[90vh] w-full overflow-hidden rounded-t-[24px] border ${t.cardBg} sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-[28px]`}
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="grid h-full gap-0 md:grid-cols-[1fr_1.05fr]">
                                <div className={`${t.warmBg}`}>
                                    <img
                                        src={activeProductModal.img}
                                        alt={activeProductModal.name}
                                        className="h-64 w-full object-cover md:h-full"
                                        onError={(e) => {
                                            e.target.src = fallbackPerfumeImage;
                                        }}
                                    />
                                </div>
                                <div className="flex h-full flex-col p-5 sm:p-7">
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <div>
                                            <p className={`text-[11px] uppercase tracking-[0.3em] ${t.textMuted}`}>{activeProductModal.family} - {activeProductModal.category}</p>
                                            <h3 className="mt-2 text-2xl sm:text-3xl font-light leading-tight">{activeProductModal.name}</h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setActiveProductModal(null)}
                                            className={`rounded-full border p-2.5 transition ${t.btnOutline}`}
                                            aria-label="Fermer le detail produit"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>

                                    <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                                        <p className={`text-sm leading-6 ${t.textSub}`}>{activeProductModal.description}</p>
                                        <div>
                                            <p className={`text-[11px] uppercase tracking-[0.26em] ${t.textMuted}`}>Notes olfactives</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {activeProductModal.notes.map((note) => (
                                                    <span key={note} className={`rounded-full border px-3 py-1 text-xs ${t.warmCard} ${t.separator}`}>
                                                        {note}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className={`text-[11px] uppercase tracking-[0.26em] ${t.textMuted}`}>Choisir la taille</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {['50ml', '100ml'].map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => setModalSize(size)}
                                                        className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${modalSize === size
                                                            ? darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                                                            : darkMode ? 'border-white/20 text-[#E8E0D6]' : 'border-black/10 text-[#1A1A1A]'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`mt-4 border-t pt-4 ${t.separator}`}>
                                        <div className="mb-3 flex items-center justify-between">
                                            <p className="text-2xl font-light">{activeProductModal.price[modalSize]}€</p>
                                            <p className={`text-[11px] uppercase tracking-[0.2em] ${t.textMuted}`}>Prix TTC</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                addItemToCart(activeProductModal, modalSize);
                                                setSelectedProduct(activeProductModal);
                                                setSelectedSize(modalSize);
                                                setActiveProductModal(null);
                                            }}
                                            className={`w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.26em] transition ${t.accent}`}
                                        >
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
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
                            className={`ml-auto flex h-full w-full max-w-sm sm:max-w-md flex-col overflow-hidden shadow-2xl ${darkMode ? 'bg-[#111111]' : 'bg-white'}`}
                        >
                            <div className={`flex items-center justify-between border-b p-6 ${t.separator}`}>
                                <div>
                                    <p className={`text-sm uppercase tracking-[0.35em] ${t.textMuted}`}>Votre panier</p>
                                    <h2 className="mt-2 text-3xl font-semibold">Édition Prestige</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeCart}
                                    className={`rounded-full border p-3 transition ${t.btnOutline}`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {checkoutMessage && (
                                    <div className={`rounded-[18px] border px-4 py-3 text-xs ${t.warmCard} ${t.separator} ${t.textSub}`}>
                                        {checkoutMessage}
                                    </div>
                                )}
                                {checkoutStep === 'cart' && cartItems.length === 0 ? (
                                    <div className={`rounded-[28px] border border-dashed p-10 text-center text-sm ${t.warmCard} ${t.textSub} ${t.separator}`}>
                                        Votre panier est vide pour l'instant. Sélectionnez une taille et ajoutez votre parfum.
                                    </div>
                                ) : checkoutStep === 'cart' ? (
                                    cartItems.map((item, index) => (
                                        <div key={`${item.productId}-${item.size}`} className={`flex gap-4 rounded-[28px] border p-5 ${t.cartItem}`}>
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="h-24 w-24 rounded-3xl object-cover"
                                                onError={(e) => {
                                                    e.target.src = fallbackPerfumeImage;
                                                }}
                                            />
                                            <div className="flex-1">
                                                <p className="text-lg font-medium">{item.name}</p>
                                                <p className={`text-sm uppercase tracking-[0.2em] ${t.textMuted}`}>{item.size}</p>
                                                <p className={`mt-3 text-sm ${t.textSub}`}>{item.quantity} × {item.price}€</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-between">
                                                <button
                                                    type="button"
                                                    onClick={() => changeCartQuantity(index, 1)}
                                                    className={`rounded-full border px-3 py-2 text-sm ${t.btnOutline}`}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => changeCartQuantity(index, -1)}
                                                    className={`rounded-full border px-3 py-2 text-sm ${t.btnOutline}`}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => changeCartQuantity(index, -999)}
                                                    className={`rounded-full border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] ${t.btnOutline}`}
                                                >
                                                    Suppr.
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`rounded-[24px] border p-5 space-y-4 ${t.cartItem}`}>
                                        <p className={`text-xs uppercase tracking-[0.3em] ${t.textMuted}`}>Informations de commande</p>
                                        <input
                                            type="text"
                                            placeholder="Votre nom complet"
                                            value={checkoutForm.name}
                                            onChange={(e) => setCheckoutForm((curr) => ({ ...curr, name: e.target.value }))}
                                            className={`w-full rounded-[16px] border px-4 py-3 text-sm outline-none ${t.inputBg}`}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Votre email"
                                            value={checkoutForm.email}
                                            onChange={(e) => setCheckoutForm((curr) => ({ ...curr, email: e.target.value }))}
                                            className={`w-full rounded-[16px] border px-4 py-3 text-sm outline-none ${t.inputBg}`}
                                        />
                                        <textarea
                                            rows="3"
                                            placeholder="Adresse de livraison"
                                            value={checkoutForm.address}
                                            onChange={(e) => setCheckoutForm((curr) => ({ ...curr, address: e.target.value }))}
                                            className={`w-full rounded-[16px] border px-4 py-3 text-sm outline-none resize-none ${t.inputBg}`}
                                        />
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="space-y-1">
                                                <span className={`text-[11px] uppercase tracking-[0.22em] ${t.textMuted}`}>Paiement</span>
                                                <select
                                                    value={checkoutForm.payment}
                                                    onChange={(e) => setCheckoutForm((curr) => ({ ...curr, payment: e.target.value }))}
                                                    className={`w-full rounded-[16px] border px-3 py-3 text-sm outline-none ${t.inputBg}`}
                                                >
                                                    {paymentMethods.map((method) => (
                                                        <option key={method.label} value={method.label}>{method.label}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label className="space-y-1">
                                                <span className={`text-[11px] uppercase tracking-[0.22em] ${t.textMuted}`}>Livraison</span>
                                                <select
                                                    value={checkoutForm.delivery}
                                                    onChange={(e) => setCheckoutForm((curr) => ({ ...curr, delivery: e.target.value }))}
                                                    className={`w-full rounded-[16px] border px-3 py-3 text-sm outline-none ${t.inputBg}`}
                                                >
                                                    {deliveryOptions.map((option) => (
                                                        <option key={option.label} value={option.label}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        <div className={`rounded-[16px] border p-3 ${t.warmCard} ${t.separator}`}>
                                            <p className={`text-[11px] uppercase tracking-[0.22em] ${t.textMuted}`}>Resume commande</p>
                                            <div className={`mt-2 space-y-1.5 text-xs ${t.textSub}`}>
                                                <div className="flex items-center justify-between">
                                                    <span>Sous-total</span>
                                                    <span>{totalAmount}€</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Livraison</span>
                                                    <span>{shippingFee}€</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Taxe</span>
                                                    <span>{taxAmount}€</span>
                                                </div>
                                                <div className={`flex items-center justify-between border-t pt-1.5 text-sm font-semibold ${t.text}`}>
                                                    <span>Total final</span>
                                                    <span>{grandTotal}€</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={`border-t p-6 ${t.separator}`}>
                                <div className={`space-y-1.5 text-xs ${t.textSub}`}>
                                    <div className="flex items-center justify-between">
                                        <span>Sous-total</span>
                                        <span>{totalAmount}€</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Livraison</span>
                                        <span>{checkoutStep === 'checkout' ? `${shippingFee}€` : '-'}</span>
                                    </div>
                                    <div className={`flex items-center justify-between border-t pt-2 text-sm uppercase tracking-[0.2em] ${t.text}`}>
                                        <span>Total</span>
                                        <span>{checkoutStep === 'checkout' ? `${grandTotal}€` : `${totalAmount}€`}</span>
                                    </div>
                                </div>
                                {checkoutStep === 'cart' ? (
                                    <button
                                        type="button"
                                        onClick={openCheckout}
                                        className={`mt-6 w-full rounded-full px-6 py-4 text-sm uppercase tracking-[0.3em] transition ${t.accent}`}
                                    >
                                        Passer à la caisse
                                    </button>
                                ) : (
                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setCheckoutStep('cart')}
                                            className={`rounded-full border px-4 py-3 text-xs uppercase tracking-[0.22em] transition ${t.btnOutline}`}
                                        >
                                            Retour panier
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCheckout}
                                            className={`rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] transition ${t.accent}`}
                                        >
                                            Confirmer achat
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        <motion.button
                            type="button"
                            onClick={closeCart}
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

export default App;
