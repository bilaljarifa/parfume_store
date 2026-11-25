import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const campaigns = [
    {
        id: 'amber',
        name: 'Les nuits ambrées',
        title: ['Le parfum a', 'sa signature.'],
        description: 'De l’oud profond aux fleurs lumineuses, trouvez l’eau de parfum qui vous ressemble.',
        image: '/images/collection-ambree.jpg',
        link: 'Explorer les parfums',
        family: '',
    },
    {
        id: 'rose',
        name: 'La collection florale',
        title: ['L’éclat des', 'fleurs.'],
        description: 'De la rose veloutée au jasmin poudré, découvrez nos accords floraux.',
        image: '/images/collection-florale.jpg',
        link: 'Découvrir les floraux',
        family: 'Floral',
    },
    {
        id: 'neroli',
        name: 'La collection fraîche',
        title: ['Un souffle', 'de lumière.'],
        description: 'Néroli, bergamote et bois clairs composent nos sillages les plus frais.',
        image: '/images/collection-fraiche.jpg',
        link: 'Découvrir les frais',
        family: 'Frais',
    },
];

const campaignDuration = 8000;
const motionPreference = '(prefers-reduced-motion: reduce)';

export default function HeroCampaign({ onBrowse }) {
    const hero = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoEnabled, setAutoEnabled] = useState(() => !window.matchMedia?.(motionPreference).matches);
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(true);
    const [pageVisible, setPageVisible] = useState(() => !document.hidden);
    const running = autoEnabled && !hovered && visible && pageVisible;
    const campaign = campaigns[activeIndex];

    useEffect(() => {
        const preference = window.matchMedia?.(motionPreference);
        const updateMotion = (event) => { if (event.matches) setAutoEnabled(false); };
        const updatePageVisibility = () => setPageVisible(!document.hidden);
        const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
            ([entry]) => setVisible(entry.intersectionRatio >= 0.22),
            { threshold: 0.22 },
        );
        preference?.addEventListener?.('change', updateMotion);
        document.addEventListener('visibilitychange', updatePageVisibility);
        observer?.observe(hero.current);
        return () => {
            preference?.removeEventListener?.('change', updateMotion);
            document.removeEventListener('visibilitychange', updatePageVisibility);
            observer?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!running) return;
        const timer = window.setTimeout(() => {
            setActiveIndex((index) => (index + 1) % campaigns.length);
        }, campaignDuration);
        return () => window.clearTimeout(timer);
    }, [activeIndex, running]);

    function selectCampaign(index) {
        setActiveIndex((index + campaigns.length) % campaigns.length);
        setAutoEnabled(false);
    }

    return (
        <section ref={hero} className="hero" aria-roledescription="carrousel" aria-label="Collections de parfums"
            data-running={running} data-campaign={campaign.id} style={{ '--hero-duration': `${campaignDuration}ms` }}
            onFocus={(event) => { if (event.target.matches(':focus-visible')) setAutoEnabled(false); }}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true); }}
            onPointerLeave={() => setHovered(false)}>
            <h1 className="sr-only">Ouchen Store, eaux de parfum</h1>
            <div className="hero-art" aria-hidden="true">
                {campaigns.map(({ id, image }, index) => (
                    <div key={id} className={`hero-slide hero-slide--${id}`} data-active={index === activeIndex}>
                        <img className="hero-photo" src={image} alt="" fetchpriority={index === 0 ? 'high' : 'low'} />
                        <div className="hero-shade" />
                    </div>
                ))}
            </div>
            <div className="wrap hero-inner">
                <div key={campaign.id} className="hero-content">
                    <p className="eyebrow hero-kicker"><span />{campaign.name}</p>
                    <h2>{campaign.title[0]}<br /><em>{campaign.title[1]}</em></h2>
                    <p className="hero-description">{campaign.description}</p>
                    <a className="button button-light" href="#parfums" onClick={() => onBrowse(campaign.family)}>
                        {campaign.link}<ArrowDown size={16} />
                    </a>
                </div>
                <div className="hero-controlbar">
                    <div className="hero-indicators" role="group" aria-label="Choisir une collection">
                        {campaigns.map(({ id, name }, index) => (
                            <button key={id} type="button" className="hero-indicator" aria-label={name}
                                aria-current={index === activeIndex ? 'true' : undefined} onClick={() => selectCampaign(index)}>
                                <span className="hero-indicator-track" aria-hidden="true"><span /></span>
                            </button>
                        ))}
                    </div>
                    <div className="hero-buttons" role="group" aria-label="Commandes du carrousel">
                        <button type="button" className="hero-icon" onClick={() => setAutoEnabled((enabled) => !enabled)}
                            aria-label={autoEnabled ? 'Mettre les images en pause' : 'Relancer le défilement des images'}>
                            {autoEnabled ? <Pause size={15} /> : <Play size={15} />}
                        </button>
                        <button type="button" className="hero-icon" aria-label="Collection précédente" onClick={() => selectCampaign(activeIndex - 1)}>
                            <ChevronLeft size={20} />
                        </button>
                        <button type="button" className="hero-icon" aria-label="Collection suivante" onClick={() => selectCampaign(activeIndex + 1)}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <span className="sr-only" aria-live={running ? 'off' : 'polite'}>{campaign.name}, {activeIndex + 1} sur {campaigns.length}</span>
        </section>
    );
}
