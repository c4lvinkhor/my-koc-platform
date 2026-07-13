export type Lang = 'BM' | 'EN' | 'ZH';

export const i18n: Record<Lang, Record<string, string>> = {
  BM: {
    // Navbar
    nav_kocs: 'KOC',
    nav_services: 'Perkhidmatan',
    nav_about: 'Tentang Kami',
    nav_cta: 'Mula Sekarang',
    nav_subtitle: 'Platform Pengiklanan',

    // Login
    login_business_access: 'Akses untuk Perniagaan',

    // Filter (extra)
    filter_all_areas: 'Semua Kawasan',

    // Favorites
    nav_favorites: 'Kegemaran',
    favorites_empty: 'Tiada KOC kegemaran',
    favorites_clear: 'Kosongkan semua',
    favorites_count: '{count} KOC kegemaran',

    // KOC Detail Modal
    detail_followers: 'Penjangkauan Audiens',
    detail_demographics: 'Demografi',
    detail_past_brands: 'Jenama Terdahulu',
    detail_portfolio: 'Portfolio',
    detail_generate_pitch: 'Jana Pitch AI',

    // Hero
    hero_eyebrow: 'Platform KOC Malaysia',
    hero_title: 'Sambungkan dengan\nInfluencer Tempatan\n yang Tepat',
    hero_subtitle: 'Platform B2B yang memadukan perniagaan di seluruh Malaysia dengan Key Opinion Leaders untuk kandungan autentik dan impak yang sebenar.',
    hero_cta: 'Lihat KOC',
    hero_cta_secondary: 'Cara Kerjanya',
    hero_stat_kocs: 'KOC Aktif',
    hero_stat_merchants: 'Perniagaan',
    hero_stat_satisfaction: 'Kepuasan',

    // Filters
    filters_title: 'Tapis KOC',
    filter_clear: 'Semua',
    filter_search: 'Cari mengikut nama atau hashtag...',
    filter_negeri: 'Negeri',
    filter_daerah: 'Daerah / Bandar',
    filter_platform: 'Platform',
    filter_audience: 'Audiens',
    filter_halal: 'Sijil Halal',
    filter_showing: 'Menunjukkan',
    filter_results: 'hasil',

    // KOC Card
    btn_view_profile: 'Profile',

    // Pitch Modal
    pitch_title: 'Penghantar Cadangan AI',
    form_business_name: 'Nama Perniagaan',
    form_business_name_ph: 'cth: Warung Mak Teh',
    form_business_type: 'Jenis Perniagaan',
    form_business_type_ph: 'Pilih jenis perniagaan...',
    form_contact_name: 'Nama Pegawai Hubungan',
    form_contact_name_ph: 'cth: Ahmad bin Him',
    btn_generate: 'Menjana Cadangan',
    btn_generating: 'Sedang menjana...',
    pitch_result: 'Cadangan Anda',

    // Services Section
    services_eyebrow: 'Perkhidmatan Kami',
    services_title: 'Kami tahu apa yang perniagaan perlukan.',
    services_subtitle: 'Setiap perniagaan mempunyai cerita yang berbeza. Kami membantu anda jumpa KOC yang betul agar cerita sampai kepada audiens yang betul — dari Sabah ke Sarawak, dari KL ke kampung.',
    service_1_title: 'Penemuan KOC',
    service_1_desc: 'Cari dan tapis ratusan influencer di seluruh Malaysia mengikut negeri, daerah, platform, audiens, dan kelayakan halal.',
    service_2_title: 'Penceritaan Strategik',
    service_2_desc: 'Bincangkan campaign dan produksi kandungan yang sejat dengan nilai perniagaan anda.',
    service_3_title: 'Penghantar Cadangan',
    service_3_desc: 'Janaan cadangan peribadi dalam Bahasa Melayu menggunakan data KOC untuk kemunikasi yang lebih baik.',
    service_4_title: 'Pengukuran & Analitik',
    service_4_desc: 'Ukur engagement, capaian, dan kesan campaign dengan dashboard yang memudahkan.',

    // About Section
    about_eyebrow: 'Tentang Kami',
    about_title: 'Kami khusus tentang perniagaan Malaysia.',
    about_desc_1: 'Kami ialah platform B2B yang memadukan usahawan di seluruh Malaysia dengan Key Opinion Leaders. Misi kami menjadikan pemasaran influencer mudah, telus, dan berkesan untuk semua perniagaan.',
    about_desc_2: 'Kami percaya setiap kedai, setiap brand, setiap produk mempunyai cerita yang tersendiri. Kami membantu cerita sampai kepada orang yang betul — di seluruh Malaysia.',
    about_experience: 'Tahun Pengalaman',
    about_stat_kocs: 'KOC Berdaftar',
    about_stat_merchants: 'Perniagaan Aktif',
    about_stat_satisfaction: 'Kepuasan Pelanggan',
    about_stat_negeri: 'Negeri Diliputi',

    // CTA Section
    cta_eyebrow: 'Bersedia untuk mula?',
    cta_title: 'Dapati KOC yang sesuai\nuntuk perniagaan anda.',
    cta_subtitle: 'Sertai ribuan perniagaan di seluruh Malaysia yang sudah mula menggunakan KOC untuk pertumbuhan mereka.',
    cta_primary: 'Mulakan Sekarang',
    cta_secondary: 'Tahu Lebih',

    // Footer
    footer_desc: 'Platform KOC No.1 di Malaysia yang memadukan perniagaan dengan influencer tempatan untuk autentik dan impak yang sebenar.',
    footer_rights: 'Hak cipta terpelihara.',

    // Results
    results_no_match: 'Tiada KOC ditemui. Tapis semak.',
  },
  EN: {
    // Navbar
    nav_kocs: 'KOCs',
    nav_services: 'Services',
    nav_about: 'About',
    nav_cta: 'Get Started',
    nav_subtitle: 'Advertising Platform',

    // Login
    login_business_access: 'Business Access',

    // Filter (extra)
    filter_all_areas: 'All Areas',

    // Favorites
    nav_favorites: 'Favorites',
    favorites_empty: 'No favorite KOCs',
    favorites_clear: 'Clear all',
    favorites_count: '{count} favorite KOCs',

    // HeroKOC Detail Modal
    detail_followers: 'Audience Reach',
    detail_demographics: 'Demographics',
    detail_past_brands: 'Past Brands',
    detail_portfolio: 'Portfolio',
    detail_generate_pitch: 'Generate AI Pitch',

    // Hero
    hero_eyebrow: 'Malaysia KOC Platform',
    hero_title: 'Connect with the\nRight Local\nInfluencers',
    hero_subtitle: 'The B2B platform connecting Malaysian businesses with Key Opinion Leaders for authentic content and real impact — nationwide.',
    hero_cta: 'Explore KOCs',
    hero_cta_secondary: 'How It Works',
    hero_stat_kocs: 'Active KOCs',
    hero_stat_merchants: 'Businesses',
    hero_stat_satisfaction: 'Satisfaction',

    // Filters
    filters_title: 'Filter KOCs',
    filter_clear: 'All',
    filter_search: 'Search by name or hashtag...',
    filter_negeri: 'State',
    filter_daerah: 'District / Town',
    filter_platform: 'Platform',
    filter_audience: 'Audience',
    filter_halal: 'Halal Certified',
    filter_showing: 'Showing',
    filter_results: 'results',

    // KOC Card
    btn_view_profile: 'View Profile',

    // Pitch Modal
    pitch_title: 'AI Proposal Generator',
    form_business_name: 'Business Name',
    form_business_name_ph: 'e.g. Mak Teh\'s Kitchen',
    form_business_type: 'Business Type',
    form_business_type_ph: 'Select business type...',
    form_contact_name: 'Contact Person Name',
    form_contact_name_ph: 'e.g. John Tan',
    btn_generate: 'Generate Proposal',
    btn_generating: 'Generating...',
    pitch_result: 'Your Proposal',

    // Services Section
    services_eyebrow: 'Our Services',
    services_title: 'We know what businesses need.',
    services_subtitle: 'Every business has a different story. We help you find the right KOC so your story reaches the right audience — from Sabah to Sarawak, from KL to small towns.',
    service_1_title: 'KOC Discovery',
    service_1_desc: 'Search and filter thousands of influencers nationwide by state, district, platform, audience, and halal status.',
    service_2_title: 'Strategic Storytelling',
    service_2_desc: 'We discuss your campaign to produce storytelling content that aligns with your brand values.',
    service_3_title: 'Proposal Generator',
    service_3_desc: 'AI-powered personalized proposals using KOC data for better communication.',
    service_4_title: 'Measurement & Analytics',
    service_4_desc: 'Track engagement, reach, and campaign performance with an intuitive dashboard.',

    // About Section
    about_eyebrow: 'About Us',
    about_title: 'We\'re all about Malaysian businesses.',
    about_desc_1: 'We are a nationwide B2B platform connecting Malaysian entrepreneurs with Key Opinion Leaders. Our mission is to make influencer marketing easy, transparent, and effective for every business.',
    about_desc_2: 'We believe every shop, brand, and product has its own story. We help those stories reach the right people — across all of Malaysia.',
    about_experience: 'Years Experience',
    about_stat_kocs: 'Registered KOCs',
    about_stat_merchants: 'Active Businesses',
    about_stat_satisfaction: 'Client Satisfaction',
    about_stat_negeri: 'States Covered',

    // CTA Section
    cta_eyebrow: 'Ready to start?',
    cta_title: 'Find the right KOC\nfor your business.',
    cta_subtitle: 'Join thousands of businesses across Malaysia already using KOCs for growth.',
    cta_primary: 'Get Started Now',
    cta_secondary: 'Learn More',

    // Footer
    footer_desc: 'Malaysia\'s #1 KOC platform connecting businesses with local influencers for authentic, nationwide impact.',
    footer_rights: 'All rights reserved.',

    // Results
    results_no_match: 'No KOCs found. Try adjusting filters.',
  },
  ZH: {
    // Navbar
    nav_kocs: 'KOC',
    nav_services: '服务',
    nav_about: '关于我们',
    nav_cta: '开始',
    nav_subtitle: '广告平台',

    // Filter (extra)
    filter_all_areas: '所有区域',

    // Favorites
    nav_favorites: '收藏',
    favorites_empty: '暂无收藏的KOC',
    favorites_clear: '清空收藏',
    favorites_count: '{count} 个收藏',

    // HeroKOC Detail Modal
    detail_followers: '受众覆盖',
    detail_demographics: '受众统计',
    detail_past_brands: '曾合作品牌',
    detail_portfolio: '作品集',
    detail_generate_pitch: '生成 AI 提案',

    // Hero
    hero_eyebrow: '马来西亚KOC平台',
    hero_title: '与合适的本地\nKOC连系',
    hero_subtitle: 'B2B平台，将全马企业与关键意见领袖连接，创造真实内容与影响力——覆盖全马来西亚。',
    hero_cta: '探索KOC',
    hero_cta_secondary: '如何运作',
    hero_stat_kocs: '活跃KOC',
    hero_stat_merchants: '企业',
    hero_stat_satisfaction: '满意度',

    // Filters
    filters_title: '筛选KOC',
    filter_clear: '全部',
    filter_search: '按名称或标签搜索...',
    filter_negeri: '州属',
    filter_daerah: '地区 / 城镇',
    filter_platform: '平台',
    filter_audience: '受众',
    filter_halal: '清真认证',
    filter_showing: '显示',
    filter_results: '结果',

    // KOC Card
    btn_view_profile: '查看资料',

    // Pitch Modal
    pitch_title: 'AI提案生成器',
    form_business_name: '企业名称',
    form_business_name_ph: '例：Mak Teh\'s Kitchen',
    form_business_type: '企业类型',
    form_business_type_ph: '选择企业类型...',
    form_contact_name: '联络人姓名',
    form_contact_name_ph: '例：John Tan',
    btn_generate: '生成提案',
    btn_generating: '生成中...',
    pitch_result: '您的提案',

    // Services Section
    services_eyebrow: '我们的服务',
    services_title: '我们了解企业的需求。',
    services_subtitle: '每个企业都有自己的故事。我们帮助您找到合适的KOC，让您的故事传达到正确的受众——从沙巴到砂拉越，从吉隆坡到小镇。',
    service_1_title: 'KOC发现',
    service_1_desc: '按州属、地区、平台、受众和清真状态搜索和筛选全马各地影响者。',
    service_2_title: '策略叙事',
    service_2_desc: '我们讨论您的活动，创造符合品牌价值的故事内容。',
    service_3_title: '提案生成器',
    service_3_desc: '使用KOC数据的AI个性化提案，提升沟通效率。',
    service_4_title: '测量与分析',
    service_4_desc: '通过直观仪表板追踪互动率、覆盖范围与活动表现。',

    // About Section
    about_eyebrow: '关于我们',
    about_title: '我们专注于全马企业。',
    about_desc_1: '我们是连接全马企业家的B2B平台。我们的使命是让影响者营销变得简单、透明且有效。',
    about_desc_2: '我们相信每个店铺、品牌和产品都有自己的故事。我们帮助这些故事传达给合适的人——在全马来西亚。',
    about_experience: '年经验',
    about_stat_kocs: '注册KOC',
    about_stat_merchants: '活跃企业',
    about_stat_satisfaction: '客户满意度',
    about_stat_negeri: '覆盖州属',

    // CTA Section
    cta_eyebrow: '准备开始？',
    cta_title: '为您的企业找到\n合适的KOC',
    cta_subtitle: '加入全马数千家已经使用KOC增长的企业。',
    cta_primary: '立即开始',
    cta_secondary: '了解更多',

    // Footer
    footer_desc: '马来西亚首个KOC平台，连接企业与本地影响者，创造全国影响力。',
    footer_rights: '保留所有权利。',

    // Results
    results_no_match: '未找到KOC。请调整筛选条件。',
  },
};
