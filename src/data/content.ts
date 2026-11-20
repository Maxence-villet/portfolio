// Positions des stations le long de l'axe Z (le voyage descend vers -Z).
export interface Station {
    z: number;
}

export interface ProjectLink {
    label: string;
    href: string;
}

export interface Project {
    title: string;
    image: string;
    description: string;
    links: ProjectLink[];
}

export interface Experience {
    title: string;
    subtitle: string;
    contract: string;
    period: string;
    description: string;
    /** Logo de l'entreprise ; absent s'il n'est pas encore fourni. */
    image?: string;
}

export interface SoftSkill {
    title: string;
    description: string;
}

export const STATIONS: Station[] = [
    { z: 200 },
    { z: -700 },
    { z: -1600 },
    { z: -2500 },
    { z: -3400 },
    { z: -4300 },
    { z: -5200 }
];

export const STATION_NAMES: string[] = [
    'ACCUEIL',
    'À PROPOS',
    'PROJETS',
    'EXPÉRIENCES',
    'CERTIFICATIONS',
    'SOFT SKILLS',
    'CONTACT'
];

export const PROJECTS: Project[] = [
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

export const EXPERIENCES: Experience[] = [
    {
        title: 'Consultant Technique Salesforce',
        subtitle: 'Cloudity · Courbevoie (92)',
        contract: 'Alternance',
        period: 'Septembre 2025 – aujourd\'hui',
        description: 'Expert data migration sur SWEEP, Carl Software, CRIT, MVG, Axway et Plénitude Arena. Migration et déploiement de données et métadonnées Revenue Cloud sur différentes instances Salesforce.',
        image: '/images/logo-cloudity.png'
    },
    {
        title: 'Expert Data Migration & Consultant Salesforce',
        subtitle: 'Axway',
        contract: 'Mission',
        period: 'Octobre 2026 – aujourd\'hui',
        description: 'Expert data migration et conseil Salesforce. Accompagnement pour l\'alignement des données et métadonnées métier / technique.',
        image: '/images/logo-axway.png'
    },
    {
        title: 'Consultant Salesforce Revenue Cloud',
        subtitle: 'Carl Software',
        contract: 'Mission',
        period: 'Février 2025 – Septembre 2026',
        description: 'Pilotage de la transformation digitale d\'un chiffrier Excel (25 ans) vers Revenue Cloud : Quote-to-Cash-to-Billing-to-Contract. Conception et déploiement du catalogue produits et objets liés multi-instances.',
        image: '/images/logo-carl-software.png'
    },
    {
        title: 'Consultant Salesforce — Data Migration',
        subtitle: 'SWEEP',
        contract: 'Mission',
        period: 'Septembre 2025 – Janvier 2026',
        description: 'Migration data et metadata Revenue Cloud multi-instances : SFDMU, Salesforce CLI, Salesforce Inspector. Autonomie totale sur une fonctionnalité récente et instable de Salesforce (Revenue Cloud Advanced / Billing).',
        image: '/images/logo-sweep.png'
    },
    {
        title: 'Développeur C#',
        subtitle: 'Econocom Group · Puteaux (92)',
        contract: 'Stage',
        period: 'Décembre 2023 – Janvier 2024',
        description: 'Outil de monitoring .NET (WinForms, Azure Storage) pour le suivi des processus du CRM.',
        image: '/images/logo-econonocom.png'
    },
    {
        title: 'Designer UX',
        subtitle: 'CIG Grande Couronne · Versailles (78)',
        contract: 'Stage',
        period: 'Mai 2023 – Juillet 2023',
        description: 'Refonte UX (Design Thinking) d\'un outil ITSM ; notifications HTML/CSS, UML et analyse de données.',
        image: '/images/logo-cig.jpg'
    },
    {
        title: 'Ambassadeur Coding Factory',
        subtitle: 'Coding Factory · Paris',
        contract: 'Engagement',
        period: '2024 – aujourd\'hui · 3 ans',
        description: 'Organisation des journées portes ouvertes, représentant étudiant.',
        image: '/images/logo-coding-factory.png'
    },
    {
        title: 'Restos du Cœur',
        subtitle: 'Engagement associatif',
        contract: 'Bénévolat',
        period: '2010 – 2021 · 11 ans',
        description: 'Distribution et collecte alimentaire.',
        image: '/images/logo-resto-du-coeur.png'
    },
    {
        title: 'Ambassadeur eTwinning',
        subtitle: 'Lycée Louis Blériot · Trappes (78)',
        contract: 'Engagement',
        period: '2019 – 2022 · 3 ans',
        description: 'Promotion d\'eTwinning au sein du lycée, participation au projet « PEK, the Traveller Flea ».',
        image: '/images/logo-etwinning.png'
    }
];

export const SOFT_SKILLS: SoftSkill[] = [
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

export const CERTIFICATES: string[] = [
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
