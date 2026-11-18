// Positions des stations le long de l'axe Z (le voyage descend vers -Z).
export const STATIONS = [
    { z: 200 },
    { z: -700 },
    { z: -1600 },
    { z: -2500 },
    { z: -3400 },
    { z: -4300 },
    { z: -5200 }
];

export const STATION_NAMES = [
    'ACCUEIL',
    'À PROPOS',
    'PROJETS',
    'EXPÉRIENCES',
    'CERTIFICATIONS',
    'SOFT SKILLS',
    'CONTACT'
];

export const PROJECTS = [
    {
        title: 'Play with AI',
        image: '/images/portfolioImage6.png',
        description: 'Jouer à un jeu de course uniquement avec ma caméra et une détection de mes mains. Fait en Python.',
        links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/posts/maxence-villet-schoumaker-developpeur-web-mobile_une-id%C3%A9e-brillante-pour-jouer-sans-souris-activity-7346184266977865728-cjGc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD3ztlAB1dCDSyt2m7LY16JvIZt2w91t-pA' }
        ]
    },
    {
        title: 'PharmaPlus',
        image: '/images/portfolioImage1.jpg',
        description: 'Outil de gestion de stock et de commandes pour les pharmacies. Fait en Java.',
        links: [
            { label: 'GitHub', href: 'https://github.com/Maxence-villet/PharmaPlus' }
        ]
    },
    {
        title: 'FlappyBird-AI',
        image: '/images/portfolioImage5.png',
        description: 'Des oiseaux entraînés avec une IA génétique (N.E.A.T). Fait en Python.',
        links: [
            { label: 'GitHub', href: 'https://github.com/Maxence-villet/FlappyBird-AI' },
            { label: 'YouTube', href: 'https://www.youtube.com/watch?v=ITna4KpiNTM' }
        ]
    },
    {
        title: 'Social-media',
        image: '/images/portfolioImage4.jpg',
        description: 'Simulation de connexions entre utilisateurs à l\'aide de graphes. Fait en Python.',
        links: [
            { label: 'GitHub', href: 'https://github.com/Maxence-villet/Social-media' },
            { label: 'YouTube', href: 'https://www.youtube.com/watch?v=llA73t6hmqQ' }
        ]
    },
    {
        title: 'Universal Paperclips',
        image: '/images/portfolioImage3.jpg',
        description: 'Prévention aux dangers de l\'IA grâce à un clicker game en React.',
        links: [
            { label: 'GitHub', href: 'https://github.com/Maxence-villet/universal-paperclips' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/posts/maxence-villet-schoumaker_ia-aezthiquetechnologique-innovationresponsable-activity-7288486254390751232-gkZN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD3ztlAB1dCDSyt2m7LY16JvIZt2w91t-pA' }
        ]
    }
];

export const EXPERIENCES = [
    {
        title: 'Développeur NextJS',
        subtitle: 'new-webtech [Stage] · Levallois-Perret (92)',
        duration: '9 semaines',
        period: 'Mai 2025 – Juillet 2025',
        description: 'Développement de features d\'un SaaS, debugging.',
        image: '/images/image6.jpg'
    },
    {
        title: 'Développeur Java',
        subtitle: 'Coding Factory [Piscine] · Paris 15 (75)',
        duration: '1 semaine',
        period: 'Septembre 2024',
        description: 'Création d\'un vaisseau en Java. 3e au classement.',
        image: '/images/image1.png'
    },
    {
        title: 'Développeur C#',
        subtitle: 'Econocom Group [Stage] · Puteaux (92)',
        duration: '8 semaines',
        period: 'Décembre 2023 – Janvier 2024',
        description: 'Développement d\'un outil de monitoring en .NET pour le suivi des processus du CRM Econocom.',
        image: '/images/image2.jpg'
    },
    {
        title: 'Designer UX',
        subtitle: 'CIG Grande Couronne [Stage] · Versailles (78)',
        duration: '7 semaines',
        period: 'Mai 2023 – Juillet 2023',
        description: 'Montée de version d\'un outil ITSM. Participation à la conception de notifications mails (HTML/CSS).',
        image: '/images/images3.jpg'
    },
    {
        title: 'Ambassadeur Coding Factory',
        subtitle: 'Coding Factory · Paris',
        duration: '3 ans',
        period: 'Septembre 2024 – Juin 2027',
        description: 'Organisation des journées portes ouvertes, représentant étudiant.',
        image: '/images/image1.png'
    },
    {
        title: 'Restos du Cœur',
        subtitle: 'Engagement associatif',
        duration: '11 ans',
        period: '2010 – 2021',
        description: 'Collecte de fonds alimentaires et distribution de l\'aide alimentaire.',
        image: '/images/image4.png'
    },
    {
        title: 'Ambassadeur eTwinning',
        subtitle: 'Lycée Louis Blériot · Trappes (78)',
        duration: '3 ans',
        period: '2019 – 2022',
        description: 'Promotion d\'eTwinning au sein du lycée, participation au projet « PEK, the Traveller Flea ».',
        image: '/images/image5.png'
    }
];

export const SOFT_SKILLS = [
    {
        title: 'Travail d\'équipe',
        description: 'Forte affinité pour le travail collaboratif, développée à travers des projets académiques et professionnels. Expérience en méthodologies Agile (Scrum, Kanban).'
    },
    {
        title: 'Créativité',
        description: 'Passion pour l\'art et la création (chant, théâtre). Capacité à penser « outside the box » pour résoudre des problèmes techniques.'
    },
    {
        title: 'Rigueur',
        description: 'Discipline et rigueur dans mes engagements. Respect des délais et maintien d\'une qualité constante.'
    },
    {
        title: 'Communication',
        description: 'Compétences en communication persuasive, animation de communauté (streaming, vidéos).'
    },
    {
        title: 'Apprentissage rapide',
        description: 'Montée rapide en compétences sur de nouvelles technologies (Go, Rust, .NET) en mode autodidacte.'
    },
    {
        title: 'Engagement',
        description: 'Implication dans des associations et en tant qu\'ambassadeur. Volonté de contribuer positivement à la communauté.'
    }
];

export const CERTIFICATES = [
    '/images/Certificates/0a55a965-7ef5-4ea3-b8df-86787d430df1.png',
    '/images/Certificates/0d524d84-ae33-40f4-b097-37ace3717f9f.png',
    '/images/Certificates/8d807432-bc65-4a97-b990-549d40d51af9.png',
    '/images/Certificates/a08caaac-49d7-4500-9deb-01607113c7f2.png',
    '/images/Certificates/ansii.png',
    '/images/Certificates/b3e47176-9249-41de-bf43-58f2a31f181e.png',
    '/images/Certificates/certif_c++.png',
    '/images/Certificates/cisco.png',
    '/images/Certificates/cnil_mod1.png',
    '/images/Certificates/cnil_mod2.png',
    '/images/Certificates/cnil_Mod3.png',
    '/images/Certificates/cnil_Mod4.png',
    '/images/Certificates/cnill_Mod5.png',
    '/images/Certificates/f5dedf3e-a6ba-4a60-96fb-7d880cfdc050.png',
    '/images/Certificates/intro_python.png',
    '/images/Certificates/UC-8d129f6f-9136-49d0-803a-c9e7d2004e06.jpg',
    '/images/Certificates/UC-063b2006-adec-4c83-b863-8f1a9d1234dd.jpg',
    '/images/Certificates/UC-eadd7505-9fc7-46a3-aee5-a3dd0f6cd69f.jpg',
    '/images/Certificates/42b23f24-b779-43e8-a6ea-22a82ab49c86_page-0001.jpg',
    '/images/Certificates/9f526a55-fa75-40a0-9087-6ec4192df8ed_page-0001.jpg',
    '/images/Certificates/certif_pointers_golang_page-0001.jpg',
    '/images/Certificates/UC-07907f4f-c864-44f3-9a28-20c5e9f7a4da.jpg'
];
