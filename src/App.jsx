import { useEffect, useRef, useState } from 'react';
import {
    ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Menu, Minus,
    Moon, Plus, Search, ShoppingBag, SlidersHorizontal, Sun, Truck, X,
} from 'lucide-react';
import { products } from './catalog';
import HeroCampaign from './HeroCampaign';

const collections = [
    { label: 'Tous les parfums', value: '' },
    { label: 'Pour elle', value: 'Femme' },
    { label: 'Pour lui', value: 'Homme' },
    { label: 'Unisexe', value: 'Unisexe' },
];

const collectionImages = {
    Femme: '/images/rose-sauvage.jpg',
    Homme: '/images/oud-mystique.jpg',
    Unisexe: '/images/neroli-dore.jpg',
};

const families = [...new Set(products.map((product) => product.family))].sort();
const productById = new Map(products.map((product) => [product.id, product]));
const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const currency = (price) => money.format(price);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const displaySize = (size) => size.replace('ml', ' ml');
const deliveryOptions = [
    { name: 'Livraison standard', timing: '3 à 5 jours ouvrés', price: 6 },
    { name: 'Livraison express', timing: '1 à 2 jours ouvrés', price: 12 },
    { name: 'Retrait en boutique', timing: 'À Paris', price: 0 },
];
const initialFilters = { collection: '', family: '', size: '', price: '', sort: 'featured', query: '' };

function readStorage(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

function useStoredState(key, fallback, validate) {
    const [value, setValue] = useState(() => {
        const stored = readStorage(key, fallback);
        return validate(stored) ? stored : fallback;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Shopping still works when browser storage is disabled.
        }
    }, [key, value]);

    return [value, setValue];
}

const validCart = (value) => Array.isArray(value) && value.every((item) =>
    item && productById.get(item.id)?.price[item.size] && Number.isSafeInteger(item.quantity) && item.quantity > 0);
const validFavorites = (value) => Array.isArray(value) && value.every((id) => productById.has(id));
const itemPrice = (product, size) => size ? product.price[size] : Math.min(...Object.values(product.price));

function matchesSearch(product, query) {
    const text = normalize([product.name, product.category, product.family, product.description, ...product.notes].join(' '));
    return normalize(query).trim().split(/\s+/).every((term) => text.includes(term));
}

function ProductImage({ product, ...props }) {
    return <img src={product.img} alt={product.name} loading="lazy" {...props} />;
}

function Wordmark() {
    return <span className="wordmark">Ouchen<span>STORE</span></span>;
}

function ProductCard({ product, size, saved, onFavorite, onOpen }) {
    return (
        <article className="product-card">
            <div className="product-frame">
                <button type="button" className="product-image-button" onClick={onOpen} aria-label={`Voir ${product.name}`}>
                    <ProductImage product={product} />
                </button>
                <button className="icon-button favorite-button" type="button" onClick={onFavorite}
                    aria-label={`Favori : ${product.name}`} aria-pressed={saved}>
                    <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
                </button>
            </div>
            <div className="product-info">
                <p className="product-type">{product.family} · {product.category}</p>
                <button type="button" className="product-name" onClick={onOpen}>{product.name}</button>
                <div className="product-bottom">
                    <span>{!size && <span className="from-price">Dès </span>}{currency(itemPrice(product, size))}</span>
                    <button className="icon-button quick-add" type="button" onClick={onOpen} aria-label={`Choisir le format de ${product.name}`}>
                        <Plus size={19} />
                    </button>
                </div>
            </div>
        </article>
    );
}

function StoreDialog({ title, children, view, drawer, close }) {
    const dialog = useRef(null);
    const heading = useRef(null);
    const isOpen = Boolean(view);

    useEffect(() => {
        const element = dialog.current;
        if (isOpen && !element.open) element.showModal();
        if (!isOpen && element.open) element.close();
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    useEffect(() => {
        if (!view) return;
        const focusTarget = dialog.current.querySelector('[data-dialog-focus]') ?? heading.current;
        focusTarget?.focus();
    }, [view]);

    return (
        <dialog ref={dialog} className={`store-dialog ${drawer ? 'drawer' : ''}`} aria-labelledby="dialog-title"
            onCancel={(event) => { event.preventDefault(); close(); }}
            onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
            {isOpen && (
                <div className="dialog-inner">
                    <div className="dialog-header">
                        <h2 id="dialog-title" ref={heading} tabIndex={-1}>{title}</h2>
                        <button className="icon-button" type="button" aria-label="Fermer" onClick={close}><X size={22} /></button>
                    </div>
                    {children}
                </div>
            )}
        </dialog>
    );
}

function App() {
    const [filters, setFilters] = useState(initialFilters);
    const [cart, setCart] = useStoredState('ouchen-cart', [], validCart);
    const [favorites, setFavorites] = useStoredState('ouchen-favorites', [], validFavorites);
    const [dark, setDark] = useStoredState('ouchen-dark', false, (value) => typeof value === 'boolean');
    const [dialog, setDialog] = useState(null);
    const [query, setQuery] = useState('');
    const [activeProduct, setActiveProduct] = useState(products[0]);
    const [activeSize, setActiveSize] = useState('50ml');
    const [delivery, setDelivery] = useState(0);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    }, [dark]);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + productById.get(item.id).price[item.size] * item.quantity, 0);
    const deliveryFee = deliveryOptions[delivery].price;
    const cartTotal = subtotal + deliveryFee + Math.round(subtotal * 0.05);

    const catalog = products.filter((product) =>
        (!filters.collection || product.category === filters.collection) &&
        (!filters.family || product.family === filters.family) &&
        (!filters.size || product.price[filters.size]) &&
        (!filters.price || itemPrice(product, filters.size) <= Number(filters.price)) &&
        matchesSearch(product, filters.query));
    if (filters.sort === 'price-low') catalog.sort((a, b) => itemPrice(a, filters.size) - itemPrice(b, filters.size));
    if (filters.sort === 'price-high') catalog.sort((a, b) => itemPrice(b, filters.size) - itemPrice(a, filters.size));
    if (filters.sort === 'name') catalog.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    const searchResults = query.trim() ? products.filter((product) => matchesSearch(product, query)) : products.slice(0, 4);

    function selectCollection(collection) {
        setFilters({ ...initialFilters, collection });
        setDialog(null);
    }

    function openProduct(product, size = filters.size) {
        setActiveProduct(product);
        setActiveSize(size || Object.keys(product.price)[0]);
        setDialog('product');
    }

    function toggleFavorite(id) {
        setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    }

    function changeQuantity(productId, size, delta) {
        setCart((current) => {
            const matches = (item) => item.id === productId && item.size === size;
            if (!current.some(matches)) {
                return delta > 0 ? [...current, { id: productId, size, quantity: delta }] : current;
            }
            return current
                .map((item) => matches(item) ? { ...item, quantity: item.quantity + delta } : item)
                .filter((item) => item.quantity > 0);
        });
    }

    function addToCart() {
        changeQuantity(activeProduct.id, activeSize, 1);
        setDialog('cart');
    }

    function submitSearch(event) {
        event.preventDefault();
        setFilters({ ...initialFilters, query: query.trim() });
        setDialog(null);
        if (window.location.hash !== '#parfums') window.location.hash = 'parfums';
        else requestAnimationFrame(() => document.getElementById('parfums')?.scrollIntoView());
    }

    function submitOrder(event) {
        event.preventDefault();
        if (!cart.length) return;
        setOrder({ reference: `OC-${Date.now().toString(36).slice(-6).toUpperCase()}`, total: cartTotal });
        setCart([]);
        setDialog('confirmation');
    }

    const dialogTitles = {
        menu: 'Collections',
        search: 'Rechercher un parfum',
        favorites: 'Vos favoris',
        product: activeProduct.name,
        cart: 'Votre panier',
        checkout: 'Commander',
        confirmation: 'Simulation terminée',
        delivery: 'Options de livraison',
    };
    const drawer = ['menu', 'favorites', 'cart', 'checkout', 'confirmation'].includes(dialog);

    return (
        <>
            <a className="skip-link" href="#parfums">Aller aux parfums</a>
            <header className="site-header" id="accueil">
                <div className="announcement"><Truck size={13} /> Livraison standard à 6 €</div>
                <div className="header-row wrap">
                    <nav className="primary-nav" aria-label="Collections">
                        {collections.map(({ label, value }) => (
                            <a key={label} href="#parfums" onClick={() => selectCollection(value)}>{label}</a>
                        ))}
                    </nav>
                    <button type="button" className="icon-button mobile-menu" aria-label="Ouvrir le menu" onClick={() => setDialog('menu')}><Menu size={22} /></button>
                    <a className="brand-link" href="#accueil" aria-label="Ouchen Store, accueil"><Wordmark /></a>
                    <div className="header-actions">
                        <button type="button" className="icon-button" aria-label="Rechercher" onClick={() => { setQuery(filters.query); setDialog('search'); }}><Search size={21} /></button>
                        <button type="button" className="icon-button header-favorite" aria-label={`Favoris (${favorites.length})`} onClick={() => setDialog('favorites')}>
                            <Heart size={21} />{favorites.length > 0 && <span className="favorite-dot" />}
                        </button>
                        <button type="button" className="icon-button header-bag" aria-label={`Panier (${cartCount})`} onClick={() => setDialog('cart')}>
                            <ShoppingBag size={21} /><span className="bag-count" aria-hidden="true">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <HeroCampaign onBrowse={(family) => setFilters({ ...initialFilters, family })} />

                <section className="catalog wrap" id="parfums" aria-labelledby="catalog-title">
                    <div className="section-heading">
                        <div>
                            <h2 id="catalog-title">Les eaux de parfum</h2>
                        </div>
                        <p className="catalog-description">Des compositions boisées, florales, fraîches et ambrées à découvrir en 50 ou 100 ml.</p>
                    </div>
                    <div className="collection-tabs" aria-label="Filtrer par collection">
                        {collections.map(({ label, value }) => (
                            <button type="button" key={label} aria-pressed={filters.collection === value}
                                onClick={() => setFilters({ ...filters, collection: value })}>{label}</button>
                        ))}
                    </div>
                    <div className="catalog-toolbar">
                        <div className="filter-controls">
                            <SlidersHorizontal size={18} aria-hidden="true" />
                            <FilterSelect name="Famille" value={filters.family} onChange={(family) => setFilters({ ...filters, family })}>
                                <option value="">Toutes les familles</option>
                                {families.map((family) => <option key={family}>{family}</option>)}
                            </FilterSelect>
                            <FilterSelect name="Format" value={filters.size} onChange={(size) => setFilters({ ...filters, size })}>
                                <option value="">Tous les formats</option><option value="50ml">50 ml</option><option value="100ml">100 ml</option>
                            </FilterSelect>
                            <FilterSelect name="Prix" value={filters.price} onChange={(price) => setFilters({ ...filters, price })}>
                                <option value="">Tous les prix</option><option value="90">90 € ou moins</option><option value="120">120 € ou moins</option>
                            </FilterSelect>
                        </div>
                        <div className="sort-controls">
                            <span className="result-count" aria-live="polite">{catalog.length} parfum{catalog.length !== 1 ? 's' : ''}</span>
                            <FilterSelect name="Trier par" value={filters.sort} onChange={(sort) => setFilters({ ...filters, sort })}>
                                <option value="featured">Sélection</option><option value="price-low">Prix croissant</option>
                                <option value="price-high">Prix décroissant</option><option value="name">Nom A–Z</option>
                            </FilterSelect>
                        </div>
                    </div>
                    {filters.query && (
                        <button type="button" className="query-chip" onClick={() => setFilters({ ...filters, query: '' })}>
                            « {filters.query} » <X size={14} aria-label="Effacer la recherche" />
                        </button>
                    )}
                    {catalog.length ? (
                        <div className="product-grid">
                            {catalog.map((product) => <ProductCard key={product.id} product={product} size={filters.size}
                                saved={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)}
                                onOpen={() => openProduct(product)} />)}
                        </div>
                    ) : (
                        <div className="empty catalog-empty">
                            <p>Aucun parfum ne correspond à votre recherche.</p>
                            <button className="button button-outline" type="button" onClick={() => setFilters(initialFilters)}>Réinitialiser les filtres</button>
                        </div>
                    )}
                </section>

                <section className="collection-section" aria-labelledby="collections-title">
                    <div className="wrap">
                        <h2 id="collections-title">Les collections</h2>
                        <div className="collection-grid">
                            {collections.slice(1).map(({ label, value }) => (
                                <a href="#parfums" key={value} className="collection-tile" onClick={() => selectCollection(value)}>
                                    <img src={collectionImages[value]} alt="" loading="lazy" />
                                    <span>{label}<ArrowRight size={19} /></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="wrap footer-row">
                    <a className="brand-link" href="#accueil" aria-label="Ouchen Store, accueil"><Wordmark /></a>
                    <nav aria-label="Pied de page">
                        <a href="#parfums" onClick={() => selectCollection('')}>Tous les parfums</a>
                        <button type="button" onClick={() => setDialog('delivery')}>Livraison</button>
                        <button type="button" onClick={() => setDialog('favorites')}>Vos favoris</button>
                    </nav>
                    <button className="theme-button" type="button" aria-pressed={dark} onClick={() => setDark(!dark)}>
                        {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? 'Mode clair' : 'Mode sombre'}
                    </button>
                </div>
            </footer>

            <StoreDialog title={dialogTitles[dialog]} view={dialog} drawer={drawer} close={() => setDialog(null)}>
                {dialog === 'menu' && (
                    <nav className="menu-list" aria-label="Collections mobiles">
                        {collections.map(({ value, label }) => (
                            <a href="#parfums" key={label} onClick={() => selectCollection(value)}>{label}<ArrowRight size={17} /></a>
                        ))}
                        <button type="button" onClick={() => setDialog('favorites')}>Vos favoris <Heart size={17} /></button>
                    </nav>
                )}

                {dialog === 'search' && (
                    <div className="dialog-body">
                        <form onSubmit={submitSearch} className="search-form">
                            <Search size={19} aria-hidden="true" />
                            <input data-dialog-focus aria-label="Nom, famille ou note olfactive" placeholder="Nom, famille ou note olfactive" value={query} onChange={(event) => setQuery(event.target.value)} />
                            <button type="submit" className="icon-button" aria-label="Afficher les résultats"><ArrowRight size={19} /></button>
                        </form>
                        <p className="muted results-label" aria-live="polite">{query.trim() ? `${searchResults.length} résultat(s)` : 'À découvrir'}</p>
                        <div className="search-results">
                            {searchResults.map((product) => (
                                <button className="result-row" key={product.id} type="button" onClick={() => openProduct(product, '')}>
                                    <ProductImage product={product} /><span><strong>{product.name}</strong><small>{product.family} · Dès {currency(itemPrice(product))}</small></span><ArrowRight size={16} />
                                </button>
                            ))}
                            {searchResults.length === 0 && <p className="muted">Essayez un autre nom ou une note comme « vanille ».</p>}
                        </div>
                    </div>
                )}

                {dialog === 'favorites' && (
                    <div className="dialog-body">
                        {favorites.length ? favorites.map((id) => {
                            const product = productById.get(id);
                            return <div className="favorite-row" key={id}>
                                <button className="result-row" type="button" onClick={() => openProduct(product, '')}>
                                    <ProductImage product={product} /><span><strong>{product.name}</strong><small>{currency(itemPrice(product))}</small></span>
                                </button>
                                <button className="icon-button" type="button" aria-label={`Retirer ${product.name} des favoris`} onClick={() => toggleFavorite(id)}><Heart size={18} fill="currentColor" /></button>
                            </div>;
                        }) : <p className="empty muted">Retrouvez ici les parfums que vous ajoutez à vos favoris.</p>}
                    </div>
                )}

                {dialog === 'product' && (
                    <div className="product-detail">
                        <ProductImage product={activeProduct} />
                        <div className="detail-content">
                            <p className="eyebrow">Eau de parfum · {activeProduct.family}</p>
                            <p>{activeProduct.description}</p>
                            <h3>Notes olfactives</h3>
                            <ul className="notes">{activeProduct.notes.map((note) => <li key={note}>{note}</li>)}</ul>
                            <fieldset className="size-picker">
                                <legend>Format</legend>
                                {Object.keys(activeProduct.price).map((size) => (
                                    <label key={size}><input type="radio" name="product-size" checked={activeSize === size}
                                        onChange={() => setActiveSize(size)} /><span>{displaySize(size)}</span></label>
                                ))}
                            </fieldset>
                            <button type="button" className="button button-primary detail-add" onClick={addToCart}>
                                Ajouter au panier <span>{currency(activeProduct.price[activeSize])}</span>
                            </button>
                        </div>
                    </div>
                )}

                {dialog === 'cart' && (
                    cart.length ? <>
                        <div className="dialog-body cart-lines">
                            {cart.map((item) => {
                                const product = productById.get(item.id);
                                return <article className="cart-line" key={`${item.id}-${item.size}`}>
                                    <ProductImage product={product} />
                                    <div><h3>{product.name}</h3><p className="muted">{displaySize(item.size)}</p>
                                        <div className="quantity">
                                            <button type="button" aria-label={`Retirer une unité de ${product.name} ${displaySize(item.size)}`} onClick={() => changeQuantity(item.id, item.size, -1)}><Minus size={14} /></button>
                                            <span aria-live="polite">{item.quantity}</span>
                                            <button type="button" aria-label={`Ajouter une unité de ${product.name} ${displaySize(item.size)}`} onClick={() => changeQuantity(item.id, item.size, 1)}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <span className="line-price">{currency(product.price[item.size] * item.quantity)}</span>
                                </article>;
                            })}
                        </div>
                        <div className="dialog-footer">
                            <p className="total-row"><span>Sous-total</span><strong>{currency(subtotal)}</strong></p>
                            <button type="button" className="button button-primary" onClick={() => { setDelivery(0); setDialog('checkout'); }}>Passer à la caisse <ArrowRight size={17} /></button>
                        </div>
                    </> : <div className="dialog-body empty"><ShoppingBag size={25} /><p>Votre panier est vide.</p>
                        <a href="#parfums" className="button button-primary" onClick={() => selectCollection('')}>Explorer les parfums</a></div>
                )}

                {dialog === 'checkout' && (
                    <form onSubmit={submitOrder} className="checkout-form">
                        <div className="dialog-body checkout-fields">
                            <button type="button" className="back-button" onClick={() => setDialog('cart')}><ArrowLeft size={17} /> Retour au panier</button>
                            <p className="demo-note">Commande de démonstration. Aucun paiement ne sera effectué.</p>
                            <label>Nom complet<input name="name" autoComplete="name" required /></label>
                            <label>Adresse e-mail<input name="email" type="email" autoComplete="email" required /></label>
                            <label>Mode de livraison<select value={delivery} onChange={(event) => setDelivery(Number(event.target.value))}>
                                {deliveryOptions.map((option, index) => <option key={option.name} value={index}>{option.name} · {option.price ? currency(option.price) : 'gratuit'}</option>)}
                            </select></label>
                            {delivery !== 2 && <label>Adresse de livraison<textarea name="address" autoComplete="street-address" rows="2" required /></label>}
                        </div>
                        <div className="dialog-footer">
                            <p className="total-row muted"><span>Sous-total</span><span>{currency(subtotal)}</span></p>
                            <p className="total-row muted"><span>Livraison</span><span>{deliveryFee ? currency(deliveryFee) : 'Gratuite'}</span></p>
                            <p className="total-row muted"><span>Taxe estimée</span><span>{currency(Math.round(subtotal * 0.05))}</span></p>
                            <p className="total-row"><strong>Total estimé</strong><strong>{currency(cartTotal)}</strong></p>
                            <button type="submit" className="button button-primary">Simuler la commande <ArrowRight size={17} /></button>
                        </div>
                    </form>
                )}

                {dialog === 'confirmation' && order && (
                    <div className="dialog-body empty"><Check size={28} /><p>Commande de démonstration {order.reference}</p>
                        <p className="muted">Total estimé {currency(order.total)}</p>
                        <button className="button button-primary" type="button" onClick={() => setDialog(null)}>Continuer mes achats</button>
                    </div>
                )}

                {dialog === 'delivery' && (
                    <div className="dialog-body delivery-list">
                        {deliveryOptions.map((option) => <p key={option.name}>
                            <span><strong>{option.name}</strong><small>{option.timing}</small></span>
                            <span>{option.price ? currency(option.price) : 'Gratuit'}</span>
                        </p>)}
                    </div>
                )}
            </StoreDialog>
        </>
    );
}

function FilterSelect({ name, value, onChange, children }) {
    return (
        <label className="filter-select">
            <select aria-label={name} value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>
            <ChevronDown size={14} aria-hidden="true" />
        </label>
    );
}

export default App;
