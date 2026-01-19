'use client';

interface BottomNavProps {
    visible: boolean;
}

export default function BottomNav({ visible }: BottomNavProps) {
    if (!visible) return null;

    const navItems = [
        { href: '#home', icon: 'fa-solid fa-house', label: 'Home' },
        { href: '#bride', icon: 'fa-solid fa-user-group', label: 'Mempelai' },
        { href: '#wedding-date', icon: 'fa-solid fa-calendar-check', label: 'Tanggal' },
        { href: '#gallery', icon: 'fa-solid fa-images', label: 'Galeri' },
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className="navbar navbar-expand sticky-bottom rounded-top-4 border-top p-0 bg-light-dark"
            style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: '480px',
                width: '100%',
                zIndex: 1030,
                backdropFilter: 'blur(0.5rem)'
            }}
        >
            <ul className="navbar-nav nav-justified w-100 align-items-center">
                {navItems.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <a
                            className="nav-link text-center py-2"
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                        >
                            <i className={item.icon} />
                            <span className="d-block" style={{ fontSize: '0.7rem' }}>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
