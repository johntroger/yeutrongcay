import { Plant } from '../types/index.ts';

export interface LocalizedPlantData {
  common_name: string;
  aliases: string[];
  description: string;
  quick_answer?: string;
  growth_time: string;
  seasonality?: {
    north: string;
    central: string;
    south: string;
    best_months: number[];
    warning?: string;
  };
  medical_info?: {
    uses: string[];
    folk_remedies?: string[];
    preparation?: string[];
    toxicity_warning?: string;
    disclaimer: string;
    confusion_risk?: {
      confused_with: string;
      distinguishing_features: string;
    };
  };
  botanical_details?: {
    family?: string;
    native_range?: string;
    active_compounds?: string[];
    soil_ph?: string;
    ideal_temp?: string;
    pot_size?: string;
  };
  how_to_grow_steps?: {
    step: number;
    title: string;
    instruction: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  monetization_tips?: string[];
  tags: string[];
}

export const PLANT_ENGLISH_MAP: Record<string, LocalizedPlantData> = {
  'herb-01': {
    common_name: 'Indian Borage (Cuban Oregano)',
    aliases: ['Mexican Mint', 'Spanish Thyme', 'Broadleaf Thyme'],
    description: 'A prized medicinal succulent herb and natural throat remedy for coughs and colds. Rich in thymol and carvacrol essential oils, exhibiting potent antimicrobial properties.',
    quick_answer: 'Indian Borage (Plectranthus amboinicus) is a fast-growing succulent herb prized in traditional medicine. It flourishes in partial shade, requires moderate watering every 2-3 days, and roots effortlessly from stem cuttings in balcony pots.',
    growth_time: 'Harvest leaves in 20 days; entire bush matures in 45 days',
    seasonality: {
      north: 'Thrives from March to September; protect from cold northern winds in winter',
      central: 'Year-round cultivation; ensure free-draining substrate during monsoons',
      south: 'Grows vigorously year-round under filtered bright sunlight',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Avoid root waterlogging during extended rainfall',
    },
    medical_info: {
      uses: ['Relieves phlegm, hoarseness, and sore throat', 'Reduces fever safely in children', 'Culinary aromatic for sour soups'],
      folk_remedies: [
        'Steam 5 fresh leaves with 2 green kumquats and 20g rock sugar for 20 minutes; sip syrup warm to soothe coughs.',
        'Crush fresh leaves with sea salt and apply directly to mosquito bites for immediate itch relief.'
      ],
      preparation: ['Prepare bottled herbal cough syrup with rock sugar', 'Brew fresh leaves as morning herbal tea'],
      toxicity_warning: 'Safe and non-toxic. For infants under 6 months old, use natural rock sugar instead of honey.',
      disclaimer: 'This information is for cultural and traditional reference only and is not a substitute for medical advice.',
      confusion_risk: {
        confused_with: 'Thai sweet basil or wild pond-side nettles',
        distinguishing_features: 'Leaves are exceptionally thick, succulent, covered in fine downy hair, releasing an aroma of citrus and oregano.'
      }
    },
    botanical_details: {
      family: 'Lamiaceae (Mint Family)',
      native_range: 'Tropical Africa, South Asia, and Southeast Asia',
      active_compounds: ['Thymol', 'Carvacrol', 'Flavonoids', 'Caryophyllene'],
      soil_ph: '6.0 - 7.5 (Well-drained sandy loam)',
      ideal_temp: '22°C - 35°C (Warm tropical climate)',
      pot_size: '20cm - 30cm pot diameter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Take stem cutting', instruction: 'Cut a healthy 10-15cm stem tip with 3-4 leaf nodes using clean shears.' },
      { step: 2, title: 'Callus cut end', instruction: 'Let cutting air-dry in shade for 2-4 hours to prevent rot.' },
      { step: 3, title: 'Plant into porous mix', instruction: 'Insert into soil mixed with rice husk and perlite, watering lightly.' },
      { step: 4, title: 'Rooting and care', instruction: 'Keep in bright filtered light; vigorous roots establish within 7 days.' }
    ],
    faqs: [
      { question: 'Why are leaves turning pale or rotting at the base?', answer: 'This indicates overwatering or compacted soil. Reduce watering and improve drainage.' },
      { question: 'Can I harvest leaves continuously?', answer: 'Yes, pinch outer leaves regularly to encourage bushy side shoots.' }
    ],
    monetization_tips: [
      'Propagate rooted cuttings in starter pots for urban balcony gardeners.',
      'Produce artisanal organic cough syrup infused with kumquat and rock sugar.'
    ],
    tags: ['Cough Relief', 'Natural Antibiotic', 'Balcony Friendly', 'Family Safe']
  },

  'herb-02': {
    common_name: 'Purple Perilla (Shiso)',
    aliases: ['Red Shiso', 'Beefsteak Plant', 'Chinese Basil'],
    description: 'An aromatic culinary and therapeutic herb packed with anthocyanins and rosmarinic acid. Widely used for reducing chills, respiratory relief, and gout support.',
    quick_answer: 'Purple Perilla (Perilla frutescens) is an antioxidant-rich aromatic herb. It prefers full sun, balanced moisture, and loose fertile soil, providing continuous leaf harvests throughout the season.',
    growth_time: '35 days from seed; continuous leaf picking for 6 months',
    seasonality: {
      north: 'Spring to autumn; sow seeds from February to May',
      central: 'Grows well year-round outside heavy flood periods',
      south: 'Thrives year-round in well-aerated pots',
      best_months: [2, 3, 4, 5, 8],
      warning: 'Pinch flower buds early to prolong vegetative leaf harvesting',
    },
    medical_info: {
      uses: ['Eases respiratory congestion and colds', 'Alleviates allergic reactions', 'Supports uric acid elimination in gout sufferers'],
      folk_remedies: [
        'Boil a handful of fresh perilla leaves with sliced ginger; drink warm and cover with a blanket to induce therapeutic sweating for colds.',
        'Drink strained perilla leaf infusion daily to support healthy uric acid excretion.'
      ],
      preparation: ['Dehydrate leaves for loose herbal tea', 'Fresh garnish for ginger soups and broths'],
      toxicity_warning: 'Generally safe. Excessive consumption of concentrated oil should be avoided during pregnancy.',
      disclaimer: 'For educational reference only; consult a physician for medical conditions.',
      confusion_risk: {
        confused_with: 'Green perilla or wild coleus',
        distinguishing_features: 'Distinctive deep purple leaf undersides and signature spicy aroma.'
      }
    },
    botanical_details: {
      family: 'Lamiaceae (Mint Family)',
      native_range: 'East and Southeast Asia',
      active_compounds: ['Rosmarinic Acid', 'Perillaldehyde', 'Luteolin', 'Anthocyanins'],
      soil_ph: '6.0 - 7.0 (Humus-rich soil)',
      ideal_temp: '20°C - 32°C',
      pot_size: '25cm - 35cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Seed germination', instruction: 'Sow seeds on surface of moist seedling mix; light aids germination.' },
      { step: 2, title: 'Thinning', instruction: 'Thin seedlings to 20cm apart once they develop 4 true leaves.' },
      { step: 3, title: 'Pruning tips', instruction: 'Pinch top shoots when plant reaches 30cm to create a dense canopy.' }
    ],
    faqs: [
      { question: 'Why did my perilla flower quickly and stop producing leaves?', answer: 'Short day lengths trigger flowering. Prune flowers and harvest tops regularly.' }
    ],
    monetization_tips: [
      'Dehydrate clean leaves for artisanal herbal tea pouches.',
      'Supply pesticide-free fresh bunches to specialty health-food markets.'
    ],
    tags: ['Respiratory Care', 'Antioxidant', 'Gout Support', 'Culinary Herb']
  },

  'herb-03': {
    common_name: 'Fish Mint (Chameleon Plant)',
    aliases: ['Fish Herb', 'Heartleaf Houttuynia', 'Lizard Tail'],
    description: 'A cooling perennial wetland herb celebrated in Southeast Asian folk healing. Known for powerful diuretic, anti-inflammatory, and hemorrhoid relief qualities.',
    quick_answer: 'Fish Mint (Houttuynia cordata) is a moisture-loving perennial with heart-shaped leaves. It thrives in partial shade and wet soil, spreading quickly through rhizomes.',
    growth_time: '25 days from rhizome planting to first leaf harvest',
    seasonality: {
      north: 'Perennial foliage dies back in cold winters and re-sprouts in spring',
      central: 'Thrives year-round near water features and moist containers',
      south: 'Prolific growth all year with continuous harvest',
      best_months: [2, 3, 4, 8, 9, 10],
      warning: 'Never allow soil to dry out completely',
    },
    medical_info: {
      uses: ['Soothes hemorrhoids and inflammatory swelling', 'Clears heat toxins and promotes urination', 'Treats conjunctivitis and acne'],
      folk_remedies: [
        'Blend 50g fresh washed fish mint leaves with warm water, strain and drink daily for natural hemorrhoid support.',
        'Crush fresh leaves and apply topically to soothe inflamed acne bumps.'
      ],
      preparation: ['Juiced raw with coconut water', 'Consumed fresh alongside meals'],
      toxicity_warning: 'Very cooling property; individuals with cold digestive constitution should consume in moderation.',
      disclaimer: 'Consult medical specialists for advanced therapeutic management.',
      confusion_risk: {
        confused_with: 'Wild ground creepers or decorative chameleon ivy',
        distinguishing_features: 'Heart-shaped leaves that emit a pungent fish-like aroma when crushed.'
      }
    },
    botanical_details: {
      family: 'Saururaceae (Lizard\'s-tail Family)',
      native_range: 'Southeast Asia, East Asia, and Himalayas',
      active_compounds: ['Quercetin', 'Rutin', 'Hyperoside', 'Houttuynin'],
      soil_ph: '5.5 - 7.0 (Moist clay-loam)',
      ideal_temp: '18°C - 30°C',
      pot_size: 'Wide shallow tray (30-40cm width)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Select runners', instruction: 'Take root runners with 2-3 nodes.' },
      { step: 2, title: 'Plant shallowly', instruction: 'Bury runners 2cm deep in rich, damp soil.' },
      { step: 3, title: 'Keep moist', instruction: 'Water daily and maintain damp conditions.' }
    ],
    faqs: [
      { question: 'Can it grow in water basins?', answer: 'Yes, fish mint excels in semi-aquatic containers or wicking beds.' }
    ],
    monetization_tips: [
      'Sell starter trays with rooted stolons for home detox gardens.'
    ],
    tags: ['Detoxification', 'Anti-inflammatory', 'Moisture Loving', 'Easy Care']
  },

  'herb-04': {
    common_name: 'Ming Aralia (Folk Ginseng)',
    aliases: ['Polyscias Fruticosa', 'Vietnamese Ginseng of the Poor'],
    description: 'Renowned as the poor man\'s ginseng in Vietnamese herbalism. Rich in therapeutic saponins and amino acids, boosting stamina and nourishing blood circulation.',
    quick_answer: 'Ming Aralia (Polyscias fruticosa) is an evergreen medicinal shrub. It prefers partial shade, well-draining soil, and modest watering, serving both as an ornamental bonsai and blood tonic.',
    growth_time: 'Harvest young tender leaves after 3 months; root harvest after 3-5 years',
    seasonality: {
      north: 'Spring propagation (Feb-April) yields highest rooting success',
      central: 'Grows smoothly; keep protected during monsoon stagnation',
      south: 'Evergreen year-round growth under dappled canopy',
      best_months: [2, 3, 4, 9, 10],
      warning: 'Extremely sensitive to standing water; root rot occurs quickly if soil stays muddy',
    },
    medical_info: {
      uses: ['Restores vitality and relieves physical exhaustion', 'Improves sleep and memory retention', 'Relieves rheumatic joint soreness'],
      folk_remedies: [
        'Brew 10-15g dried roots into medicinal tonic tea for energy and mental clarity.',
        'Cook young leaves with carp or chicken broth for postpartum mothers to stimulate milk production.'
      ],
      preparation: ['Sun-dry sliced aged roots for medicinal infusions', 'Cook young leafy shoots in nourishing broths'],
      toxicity_warning: 'Contains saponins; avoid excessive dosages as it may cause hemolysis.',
      disclaimer: 'Traditional herbal reference; not intended to replace formal prescriptions.',
      confusion_risk: {
        confused_with: 'Broadleaf aralia or round-leaf decorative ming aralia',
        distinguishing_features: 'Fine, deeply serrated feathery leaves with an invigorating ginseng-like scent.'
      }
    },
    botanical_details: {
      family: 'Araliaceae (Ginseng Family)',
      native_range: 'Southeast Asia and Pacific Islands',
      active_compounds: ['Polysciasides (Saponins)', 'Essential Oils', 'B-complex Vitamins', 'Polysaccharides'],
      soil_ph: '6.0 - 6.8 (Free-draining organic mix)',
      ideal_temp: '22°C - 32°C',
      pot_size: '30cm - 50cm deep pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Woody cutting', instruction: 'Select semi-hardwood stems about finger thickness.' },
      { step: 2, title: 'Rooting medium', instruction: 'Plant in coarse river sand mixed with coco coir.' },
      { step: 3, title: 'Shaded location', instruction: 'Place under 60% shade cloth until new leaves sprout.' }
    ],
    faqs: [
      { question: 'How old should the roots be for medicinal use?', answer: 'Roots should be at least 3 years old, with optimal potency reached after 5 years.' }
    ],
    monetization_tips: [
      'Sculpt older rooted specimens into high-value medicinal indoor bonsai.',
      'Package dried sliced roots for wellness tea gift sets.'
    ],
    tags: ['Ginseng Alternative', 'Vitality Tonic', 'Bonsai Art', 'Deep Rooted']
  },

  'herb-05': {
    common_name: 'Common Mugwort',
    aliases: ['Wormwood', 'Felon Herb', 'Wild Artemisia'],
    description: 'A classic healing herb renowned for warming the meridians, halting bleeding, easing menstrual pain, and dispelling cold dampness in the body.',
    quick_answer: 'Common Mugwort (Artemisia vulgaris) is a resilient perennial herb that thrives in full sun and well-drained soil. It produces fragrant silver-undersided leaves year-round.',
    growth_time: '30 days for initial harvest; perennial rootstock lasts years',
    seasonality: {
      north: 'Spring is the most vigorous vegetative season',
      central: 'Perennial in pots; protect from torrential rains',
      south: 'Grows continuously with moderate shade in hot summer',
      best_months: [1, 2, 3, 8, 9, 10],
      warning: 'Provide good airflow to avoid fungal leaf rust',
    },
    medical_info: {
      uses: ['Harmonizes menstruation and eases cramps', 'Stops wound bleeding and relieves headaches', 'Used in traditional moxibustion therapy'],
      folk_remedies: [
        'Fry fresh mugwort with eggs in sesame oil to relieve postpartum fatigue and headache.',
        'Crush clean leaves with salt and bind over minor cuts to quickly stem bleeding.'
      ],
      preparation: ['Dehydrated for moxa sticks', 'Herbal steam baths for cold relief'],
      toxicity_warning: 'Avoid high medicinal doses during early pregnancy due to uterine stimulating properties.',
      disclaimer: 'For educational purposes; seek medical guidance for obstetrical matters.',
      confusion_risk: {
        confused_with: 'Wild ragweed or chrysanthemum greens',
        distinguishing_features: 'Deeply lobed dark green leaves with silvery-white woolly down underneath.'
      }
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'Eurasia and North Africa; naturalized worldwide',
      active_compounds: ['Cineole', 'Thujone', 'Sesquiterpene Lactones', 'Flavonoids'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '15°C - 28°C',
      pot_size: '25cm - 35cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Division', instruction: 'Divide root clumps with active shoots.' },
      { step: 2, title: 'Planting', instruction: 'Set root clumps in moist, well-aerated potting soil.' }
    ],
    faqs: [
      { question: 'Why are lower leaves drying out?', answer: 'Ensure adequate sunlight and check if the pot has become root-bound.' }
    ],
    monetization_tips: ['Handcraft aromatic moxa herbal bath bags.'],
    tags: ['Womens Wellness', 'Circulation', 'Moxibustion', 'Cold Relief']
  },

  'herb-06': {
    common_name: 'Wild Betel Leaf (Piper Sarmentosum)',
    aliases: ['Lol-lot Pepper', 'Wild Pepper', 'Cha-phlu'],
    description: 'An indispensable culinary and therapeutic vine. Excellent for warming the joints, dispelling bone aches, relieving bloating, and soothing cold abdominal pain.',
    quick_answer: 'Wild Betel Leaf (Piper sarmentosum) is a shade-loving creeping herb with glossy heart-shaped leaves. It roots readily from stem runners in damp, shaded corners.',
    growth_time: '30-40 days for abundant leaf picking',
    seasonality: {
      north: 'Grows well spring through autumn; keep warm in winter',
      central: 'Evergreen under tree canopies and shaded balconies',
      south: 'Extremely vigorous all year round',
      best_months: [2, 3, 4, 5, 8, 9],
      warning: 'Avoid harsh scorching midday sun which bleaches leaves',
    },
    medical_info: {
      uses: ['Relieves joint soreness, osteoarthritis, and rheumatism', 'Eases bloating and dyspepsia', 'Soothes sweaty hands and feet'],
      folk_remedies: [
        'Boil a large bundle of leaves and stems; soak feet in warm liquid before bed for joint comfort.',
        'Stir-fry beef wrapped in betel leaves for warming digestive nutrition.'
      ],
      preparation: ['Fresh leaf wraps for grilling', 'Decoctions for herbal foot baths'],
      toxicity_warning: 'Warm nature; consume in moderation if experiencing stomach heat or mouth ulcers.',
      disclaimer: 'Folk medicine reference; consult doctors for chronic joint disease.',
      confusion_risk: {
        confused_with: 'Betel vine (Piper betle) or piper chaba',
        distinguishing_features: 'Thinner leaves with distinct veins and mild pleasant peppery fragrance.'
      }
    },
    botanical_details: {
      family: 'Piperaceae (Pepper Family)',
      native_range: 'Tropical Southeast Asia',
      active_compounds: ['Piperine', 'Alkaloids', 'Beta-caryophyllene', 'Essential Oils'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '22°C - 32°C',
      pot_size: 'Wide shallow hanging basket or planter box'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Cuttings', instruction: 'Cut 20cm runners with adventitious roots.' },
      { step: 2, title: 'Bedding', instruction: 'Bury nodes 3cm in rich compost and water well.' }
    ],
    faqs: [
      { question: 'Can it grow under full sun?', answer: 'Full sun will scorch the leaves; it must have dappled shade or indirect light.' }
    ],
    monetization_tips: ['Harvest organic fresh bundles for culinary specialty restaurants.'],
    tags: ['Joint Support', 'Culinary Star', 'Shade Loving', 'Easy Groundcover']
  },

  'herb-07': {
    common_name: 'Bitter Ginger (Shampoo Ginger)',
    aliases: ['Awapuhi', 'Pinecone Ginger', 'Zingiber Zerumbet'],
    description: 'A prized tropical rhizome celebrated for cooling digestive heat, supporting liver detoxification, and conditioning hair with aromatic pinecone nectar.',
    quick_answer: 'Bitter Ginger (Zingiber zerumbet) is an exotic tropical perennial producing fragrant pinecone bracts. It prefers fertile, loose soil and partial sun on balconies.',
    growth_time: '6-8 months for mature rhizome harvest',
    seasonality: {
      north: 'Plant rhizomes in March; harvest in autumn before frost',
      central: 'Grows smoothly during wet warm seasons',
      south: 'Perennial with lush green foliage year-round',
      best_months: [2, 3, 4],
      warning: 'Ensure deep pots with ample drainage holes',
    },
    medical_info: {
      uses: ['Digestive bitter stimulating bile production', 'Supports liver function and detoxification', 'Natural botanical hair conditioner'],
      folk_remedies: [
        'Slice rhizomes, steep in pure honey, and take 1 teaspoon before meals for digestive well-being.',
        'Squeeze natural clear nectar from mature red pinecone cones to rinse and soften hair.'
      ],
      preparation: ['Steeped in raw honey', 'Extracted for organic hair rinses'],
      toxicity_warning: 'Use in moderation; avoid high doses during acute gastric ulcers.',
      disclaimer: 'Traditional botanical reference only.',
      confusion_risk: {
        confused_with: 'Standard culinary ginger (Zingiber officinale)',
        distinguishing_features: 'Taller cane-like stems and dramatic pinecone-shaped crimson flower heads.'
      }
    },
    botanical_details: {
      family: 'Zingiberaceae (Ginger Family)',
      native_range: 'Tropical Asia and Polynesia',
      active_compounds: ['Zerumbone', 'Humulene', 'Camphene', 'Curcumene'],
      soil_ph: '6.0 - 6.8',
      ideal_temp: '24°C - 35°C',
      pot_size: '35cm - 50cm deep container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Rhizome pieces', instruction: 'Select plump rhizomes with 2-3 live eye buds.' },
      { step: 2, title: 'Planting depth', instruction: 'Plant eyes facing upwards, 5cm under loose potting soil.' }
    ],
    faqs: [
      { question: 'When do pinecone flowers appear?', answer: 'Flowering typically occurs in late summer into early autumn.' }
    ],
    monetization_tips: ['Produce natural shampoo and hair serum from flower cones.'],
    tags: ['Hair Care', 'Digestive Bitter', 'Exotic Bloom', 'Honey Infusion']
  },

  'herb-08': {
    common_name: 'Red Turmeric (High Curcumin)',
    aliases: ['Crimson Turmeric', 'Curcuma Longa'],
    description: 'A prized native heirloom turmeric variety boasting exceptionally high curcumin levels. Celebrated for gastric ulcer repair, wound healing, and cellular antioxidant defense.',
    quick_answer: 'Red Turmeric (Curcuma longa) produces deep orange-red medicinal rhizomes. It thrives in warm, humid conditions with loose organic compost.',
    growth_time: '8-9 months from rhizome planting to harvest',
    seasonality: {
      north: 'Plant in early spring (Feb-April); harvest when foliage yellows in winter',
      central: 'Ideal for sandy loam garden beds',
      south: 'Prolific growth all year',
      best_months: [2, 3, 4],
      warning: 'Protect from heavy prolonged winter cold in northern mountains',
    },
    medical_info: {
      uses: ['Accelerates stomach ulcer and gastritis healing', 'Powerful antioxidant and anti-inflammatory', 'Brightens skin and speeds wound healing'],
      folk_remedies: [
        'Mix 1 teaspoon red turmeric powder with raw wild honey in warm water every morning for stomach comfort.',
        'Apply fresh turmeric juice to minor scratches to prevent keloid scarring.'
      ],
      preparation: ['Grind into pure nano-curcumin powder', 'Steep thin slices in honey'],
      toxicity_warning: 'Do not use large doses during pregnancy or alongside blood-thinning medication.',
      disclaimer: 'Consult gastroenterology physicians for ulcer management.',
      confusion_risk: {
        confused_with: 'Yellow turmeric or white zedoary',
        distinguishing_features: 'Rhizome core has an intense, brilliant deep-orange to crimson color.'
      }
    },
    botanical_details: {
      family: 'Zingiberaceae (Ginger Family)',
      native_range: 'South Asia and Southeast Asia',
      active_compounds: ['Curcuminoids (Curcumin, Demethoxycurcumin)', 'Turmerone', 'Zingiberene'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '22°C - 35°C',
      pot_size: '30cm - 45cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Sprout buds', instruction: 'Keep mother rhizomes in a moist burlap bag until eye buds sprout.' },
      { step: 2, title: 'Potting', instruction: 'Plant in potting soil enriched with vermicompost.' }
    ],
    faqs: [
      { question: 'When is turmeric ready to harvest?', answer: 'Harvest when leaves turn yellow and stems collapse naturally.' }
    ],
    monetization_tips: ['Process into premium organic turmeric starch and honey paste.'],
    tags: ['Stomach Health', 'Anti-inflammatory', 'Curcumin Gold', 'Wound Healing']
  },

  'herb-09': {
    common_name: 'Thorny Nightshade (Solanum Procumbens)',
    aliases: ['Solanum Hainanense', 'Liver Herb', 'Thorny Solanum'],
    description: 'Vietnam\'s premier indigenous medicinal vine for liver support. Clinically demonstrated to reduce elevated liver enzymes, calm viral hepatitis, and alleviate alcohol distress.',
    quick_answer: 'Thorny Nightshade is an indigenous creeping herb covered in tiny sharp prickles and violet flowers. It thrives in full sun and well-aerated sandy loam.',
    growth_time: '60 days for vine pruning; 6-8 months for roots',
    seasonality: {
      north: 'March to October is the peak growth window',
      central: 'Naturally adapted to arid sunny sandy soil',
      south: 'Grows smoothly year-round',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Extremely intolerant of standing muddy water; roots rot easily',
    },
    medical_info: {
      uses: ['Protects liver hepatocytes and lowers elevated ALT/AST enzymes', 'Supports management of chronic hepatitis B', 'Relieves hangover and alcohol discomfort'],
      folk_remedies: [
        'Boil 30g dried vines in 1 liter of water; drink throughout the day to cleanse liver heat and protect liver health.'
      ],
      preparation: ['Sun-dry stems and leaves for decoctions', 'Processed into standardized extracts'],
      toxicity_warning: 'Avoid using during pregnancy or in children under 5 years old.',
      disclaimer: 'Botanical support only; patients with viral hepatitis should remain under specialist medical care.',
      confusion_risk: {
        confused_with: 'Wild eggplant or thorny solanum torvum',
        distinguishing_features: 'Creeping herbaceous vine, prominent yellow spines on both leaf surfaces and small orange berries.'
      }
    },
    botanical_details: {
      family: 'Solanaceae (Nightshade Family)',
      native_range: 'Endemic to Vietnam and Southern China',
      active_compounds: ['Glycoalkaloids (Solamargine, Solasonine)', 'Flavonoids', 'Diosgenin'],
      soil_ph: '6.0 - 7.5 (Sandy loam)',
      ideal_temp: '25°C - 38°C (Heat loving)',
      pot_size: '30cm pot with climbing trellis'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Stem cuttings', instruction: 'Take semi-hardwood cuttings with mature nodes.' },
      { step: 2, title: 'Provide trellis', instruction: 'Install a vertical wire support for creeping vines.' }
    ],
    faqs: [
      { question: 'Does it need full sun?', answer: 'Yes, full sunlight increases the concentration of medicinal glycoalkaloids.' }
    ],
    monetization_tips: ['Dry and package certified single-origin herbal tea bags.'],
    tags: ['Liver Care', 'Detox', 'Indigenous Herb', 'Sun Loving']
  },

  'herb-10': {
    common_name: 'Moringa (Drumstick Tree)',
    aliases: ['Miracle Tree', 'Horseradish Tree', 'Tree of Life'],
    description: 'A nutritional powerhouse tree packed with vitamins, bio-available calcium, and complete plant protein. Boosts immunity, cleanses blood, and enriches mother\'s milk.',
    quick_answer: 'Moringa (Moringa oleifera) is a rapid-growing drought-tolerant tree. It provides abundant vitamin-rich leaves for daily soups and shakes within 45 days.',
    growth_time: 'Harvest leaves in 45 days; prune regularly to maintain bush shape',
    seasonality: {
      north: 'Spring through autumn; protect young trees from cold winters',
      central: 'Thrives in coastal sandy soil',
      south: 'Continuous rapid growth throughout the year',
      best_months: [2, 3, 4, 5, 8],
      warning: 'Susceptible to root rot if pots lack drainage holes',
    },
    medical_info: {
      uses: ['Combats malnutrition and fatigue', 'Stabilizes blood sugar and lipid profiles', 'Promotes healthy breast milk production'],
      folk_remedies: [
        'Cook fresh leaves with minced shrimp for a cooling, nutrient-dense everyday family soup.'
      ],
      preparation: ['Dehydrated into green superfood powder', 'Cooked as leafy greens'],
      toxicity_warning: 'Do not consume roots or bark during pregnancy as they may stimulate uterine contractions.',
      disclaimer: 'Nutritional reference; not a medication.',
      confusion_risk: {
        confused_with: 'Sauropus androgynus or sesbania grandiflora',
        distinguishing_features: 'Tripinnate feathery leaves and winged seeds in long pods.'
      }
    },
    botanical_details: {
      family: 'Moringaceae (Moringa Family)',
      native_range: 'Indian Subcontinent; cultivated across tropics',
      active_compounds: ['Quercetin', 'Chlorogenic Acid', 'Isothiocyanates', 'Complete Amino Acids'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '25°C - 35°C',
      pot_size: '40cm - 60cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Seed soaking', instruction: 'Soak seeds in warm water for 12 hours.' },
      { step: 2, title: 'Prune canopy', instruction: 'Pinch leader shoot at 1 meter height to create low bushy branches.' }
    ],
    faqs: [
      { question: 'Can it be kept small on a balcony?', answer: 'Yes, heavy pruning keeps it manageable as a compact leafy bush.' }
    ],
    monetization_tips: ['Mill clean dehydrated leaves into premium green superfood powder.'],
    tags: ['Superfood', 'Vitamin Rich', 'Fast Growing', 'Immunity Boost']
  },

  'herb-11': {
    common_name: 'Green Chiretta (King of Bitters)',
    aliases: ['Andrographis Paniculata', 'Creat', 'Mahatita'],
    description: 'Renowned as nature\'s potent antibiotic bitter. Widely applied in Eastern medicine for clearing respiratory infections, sore throats, flu, and bacterial fevers.',
    quick_answer: 'Green Chiretta is a therapeutic bitter herb containing andrographolides. It loves warm sunshine, moderate moisture, and flowers with tiny white-violet blossoms.',
    growth_time: '60 days to harvest leaves before flowering',
    seasonality: {
      north: 'Grow in spring and summer; harvest before autumn flowering',
      central: 'Year-round cultivation in sunny pots',
      south: 'Prolific self-seeding in tropical gardens',
      best_months: [2, 3, 4, 5],
      warning: 'Harvest medicinal foliage before flower seeds set to preserve active potency',
    },
    medical_info: {
      uses: ['Relieves acute tonsillitis, pharyngitis, and bronchitis', 'Natural broad-spectrum antimicrobial action', 'Reduces fever and viral flu symptoms'],
      folk_remedies: [
        'Brew 5-10g dried leaves into bitter tea; drink warm over 3-5 days for severe throat inflammation.'
      ],
      preparation: ['Powdered into capsules to avoid intense bitterness', 'Decocted into bitter tonics'],
      toxicity_warning: 'Avoid during pregnancy and breastfeeding; do not take continuously for longer than 2 weeks.',
      disclaimer: 'Use under herbal practitioner guidance; discontinue if digestive upset occurs.',
      confusion_risk: {
        confused_with: 'Wild grass weeds or false chiretta',
        distinguishing_features: 'Square quadrangular stems and intense, unmistakable bitter taste.'
      }
    },
    botanical_details: {
      family: 'Acanthaceae (Acanthus Family)',
      native_range: 'India and Sri Lanka; naturalized in Southeast Asia',
      active_compounds: ['Andrographolide', 'Neoandrographolide', 'Deoxyandrographolide'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '22°C - 35°C',
      pot_size: '25cm - 30cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Seed sowing', instruction: 'Sow fine seeds on moist soil surface and mist gently.' }
    ],
    faqs: [
      { question: 'Why is it so bitter?', answer: 'The high concentration of andrographolides is responsible for its intense bitterness and healing properties.' }
    ],
    monetization_tips: ['Encapsulate pure organic leaf powder for winter wellness kits.'],
    tags: ['Natural Antibiotic', 'Fever Reducer', 'Respiratory Care', 'Bitter Tonic']
  },

  'herb-12': {
    common_name: 'False Daisy (Eclipta Prostrata)',
    aliases: ['Yerba de Tago', 'Bhringraj', 'Ink Plant'],
    description: 'An esteemed Ayurvedic and Vietnamese hair and blood revitalizer. Clinically renowned for arresting hemorrhage, nourishing liver and kidneys, and darkening hair.',
    quick_answer: 'False Daisy (Eclipta prostrata) is a moisture-loving herb with small white daisy-like flowers. Crushed foliage turns ink-black upon oxidation.',
    growth_time: '35 days from seed to harvest',
    seasonality: {
      north: 'Spring through late autumn',
      central: 'Evergreen in damp garden borders',
      south: 'Grows continuously year-round',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Prefers moist soil; do not let root zone dehydrate',
    },
    medical_info: {
      uses: ['Stops nosebleeds, bloody stool, and external wounds', 'Strengthens hair follicles and prevents premature graying', 'Soothes viral rashes and hives'],
      folk_remedies: [
        'Simmer fresh herb with black sesame seeds and honey as a restorative tonic for lustrous black hair.',
        'Apply fresh crushed black juice to stop bleeding from minor lacerations immediately.'
      ],
      preparation: ['Cooked into hair oils with coconut oil', 'Fresh squeezed juice'],
      toxicity_warning: 'Gentle and safe; those with loose stools should combine with fresh ginger.',
      disclaimer: 'Traditional folk reference.',
      confusion_risk: {
        confused_with: 'Wild bidens or tridax daisy',
        distinguishing_features: 'Sap oxidizes rapidly to an indelible bluish-black ink stain.'
      }
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'Widespread across tropical and subtropical regions',
      active_compounds: ['Wedelolactone', 'Demethylwedelolactone', 'Ecliptine', 'Tannins'],
      soil_ph: '5.5 - 7.5',
      ideal_temp: '20°C - 32°C',
      pot_size: '20cm - 30cm wide pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Sow seeds', instruction: 'Scatter seed heads onto moist compost.' }
    ],
    faqs: [
      { question: 'Why does the plant turn black when crushed?', answer: 'Oxidation of wedelolactone and phenolic compounds causes the characteristic black ink.' }
    ],
    monetization_tips: ['Infuse with virgin coconut oil for premium botanical hair growth oils.'],
    tags: ['Hair Health', 'Hemostatic', 'Ayurvedic Star', 'Natural Ink']
  },

  'herb-13': {
    common_name: 'Gotu Kola (Asiatic Pennywort)',
    aliases: ['Centella Asiatica', 'Brahmi of Southeast Asia', 'Spadeleaf'],
    description: 'A celebrated memory enhancer, circulatory tonic, and longevity herb. Renowned for stimulating collagen synthesis, healing skin, and soothing nervous fatigue.',
    quick_answer: 'Gotu Kola (Centella asiatica) is a creeping perennial with fan-shaped scalloped leaves. It thrives in damp soil, partial sun, and self-propagates easily via runners.',
    growth_time: '25-30 days for harvestable leaf carpets',
    seasonality: {
      north: 'Spring through autumn; shelter during harsh winter',
      central: 'Year-round growth in moist garden soil',
      south: 'Prolific year-round in balcony trays',
      best_months: [2, 3, 4, 8, 9, 10],
      warning: 'Maintain steady moisture; leaves turn bitter and tough if underwatered',
    },
    medical_info: {
      uses: ['Enhances cognitive memory and mental clarity', 'Stimulates collagen production and heals skin wounds', 'Acts as a cooling diuretic and clears bodily heat'],
      folk_remedies: [
        'Blend 100g fresh leaves with cold water and a touch of rock sugar for a refreshing detox smoothie.'
      ],
      preparation: ['Juiced fresh', 'Dehydrated into longevity herbal tea'],
      toxicity_warning: 'Avoid excessive intake during pregnancy; rotate usage rather than consuming heavily every single day.',
      disclaimer: 'General herbal health reference.',
      confusion_risk: {
        confused_with: 'Dichondra micrantha or hydrocotyle vulgaris',
        distinguishing_features: 'Gotu kola leaves are kidney-shaped with crenate margins and distinct palmate veins.'
      }
    },
    botanical_details: {
      family: 'Apiaceae (Carrot Family)',
      native_range: 'Tropical and subtropical wetlands worldwide',
      active_compounds: ['Asiaticoside', 'Madecassoside', 'Asiatic Acid', 'Madecassic Acid'],
      soil_ph: '6.0 - 7.2',
      ideal_temp: '20°C - 30°C',
      pot_size: 'Wide shallow tray (30cm - 50cm diameter)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Pin runners', instruction: 'Pin rooting stolons onto rich moist potting soil.' }
    ],
    faqs: [
      { question: 'Can I grow it indoors?', answer: 'Yes, provided it receives bright indirect window light and continuous moisture.' }
    ],
    monetization_tips: ['Supply organic fresh-cut bundles for premium health juice bars.'],
    tags: ['Brain Health', 'Collagen Booster', 'Cooling Detox', 'Moisture Lover']
  },

  'herb-14': {
    common_name: 'Japanese Honeysuckle',
    aliases: ['Lonicera Japonica', 'Golden-and-Silver Flower', 'Jin Yin Hua'],
    description: 'An elegant medicinal climbing vine with sweet-scented blooms that transition from pure white to golden yellow. A classic anti-pathogenic remedy for respiratory and skin fevers.',
    quick_answer: 'Japanese Honeysuckle (Lonicera japonica) is a vigorous flowering vine that thrives on sunny trellises, producing aromatic medicinal flowers spring through summer.',
    growth_time: 'First flower bud harvest after 4-6 months',
    seasonality: {
      north: 'Buds appear vigorously from March to July',
      central: 'Flowering can occur year-round with sunny exposure',
      south: 'Grows smoothly; prune after flowering',
      best_months: [2, 3, 4, 8],
      warning: 'Pick unopened flower buds early in the morning for peak medicinal potency',
    },
    medical_info: {
      uses: ['Clears pathogenic heat and resolves toxic fever', 'Relieves acute tonsillitis, measles, and skin boils', 'Relieves viral respiratory flu symptoms'],
      folk_remedies: [
        'Brew 10g dried flower buds with hot water for a fragrant, cooling sore-throat tea.'
      ],
      preparation: ['Dry unopened buds in shade', 'Brew as floral infusion'],
      toxicity_warning: 'Cool nature; those with cold digestive deficiency should not consume in large quantities.',
      disclaimer: 'Traditional pharmacopeia reference.',
      confusion_risk: {
        confused_with: 'Wild jasmine or toxic gelsemium',
        distinguishing_features: 'Paired tubular flowers that open white and turn golden yellow as they mature.'
      }
    },
    botanical_details: {
      family: 'Caprifoliaceae (Honeysuckle Family)',
      native_range: 'East Asia',
      active_compounds: ['Chlorogenic Acid', 'Lonicerin', 'Luteolin', 'Inositol'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '18°C - 32°C',
      pot_size: '35cm pot with sturdy vertical trellis'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Trellis setup', instruction: 'Install a balcony trellis for climbing tendrils.' }
    ],
    faqs: [
      { question: 'When is the best time to harvest honeysuckle?', answer: 'Pick flower buds right before they open in the early morning.' }
    ],
    monetization_tips: ['Package whole dried floral buds as luxury calming herbal tea.'],
    tags: ['Floral Medicine', 'Viral Relief', 'Sweet Aroma', 'Trellis Vine']
  },

  'herb-15': {
    common_name: 'Jewels of Opar (Earth Ginseng)',
    aliases: ['Talinum Paniculatum', 'Fameflower', 'Pink Baby\'s Breath'],
    description: 'A resilient ornamental and medicinal succulent producing edible glossy green leaves and panicles of sparkling pink jewel flowers. Tonifies lung qi and soothes coughs.',
    quick_answer: 'Jewels of Opar (Talinum paniculatum) is a self-seeding, drought-tolerant edible succulent. Its roots and mucilaginous leaves provide gentle restorative nutrition.',
    growth_time: 'Harvest leaves in 25 days; roots after 1 year',
    seasonality: {
      north: 'Perennial; grows luxuriantly from April to November',
      central: 'Thrives in rocky arid balcony planters',
      south: 'Blooms and self-seeds continuously year-round',
      best_months: [2, 3, 4, 5, 8],
      warning: 'Self-seeds freely; remove spent seed pods if you do not want it spreading',
    },
    medical_info: {
      uses: ['Tonifies lung yin, nourishes qi, and relieves chronic cough', 'Gentle restorative soup green for physical weakness', 'Relieves night sweats and fatigue'],
      folk_remedies: [
        'Simmer fresh earth ginseng leaves with lean pork for an invigorating dinner soup.'
      ],
      preparation: ['Cooked like spinach in broths', 'Dried tuberous roots steeped in rice wine'],
      toxicity_warning: 'Mild and safe; contains mild oxalates so cook thoroughly if prone to kidney stones.',
      disclaimer: 'Nutritional and herbal reference.',
      confusion_risk: {
        confused_with: 'Portulaca oleracea (common purslane)',
        distinguishing_features: 'Taller upright growth habit with airy panicles of delicate ruby-pink flowers.'
      }
    },
    botanical_details: {
      family: 'Talinaceae',
      native_range: 'Tropical Americas; widely naturalized in Vietnam',
      active_compounds: ['Steroids', 'Saponins', 'Polysaccharides', 'Flavonoids'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '22°C - 35°C',
      pot_size: '20cm - 30cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Scatter seeds', instruction: 'Scatter tiny black seeds lightly on top of warm soil.' }
    ],
    faqs: [
      { question: 'Are the flowers edible?', answer: 'Yes, both the leaves, stems, and flower buds are edible.' }
    ],
    monetization_tips: ['Marketed as decorative wellness culinary greens.'],
    tags: ['Tonic Greens', 'Ornamental Bloom', 'Drought Resilient', 'Easy Seeding']
  },

  'herb-16': {
    common_name: 'West Indian Lemongrass',
    aliases: ['Cymbopogon Citratus', 'Oil Grass', 'Citronella Grass'],
    description: 'A fragrant perennial clump-forming grass prized for culinary zest and therapeutic aromatherapy. Natural mosquito repellent, digestive carminative, and cold relief remedy.',
    quick_answer: 'Lemongrass is a fast-growing aromatic grass that thrives in full sun and well-drained soil. It naturally repels garden insects and provides stalks for tea and cooking.',
    growth_time: 'Harvest outer stalks after 60-80 days',
    seasonality: {
      north: 'Plant in spring; thrives in summer heat',
      central: 'Flourishes in sandy, warm coastal conditions',
      south: 'Continuous harvest all year round',
      best_months: [2, 3, 4, 5, 8],
      warning: 'Needs at least 6 hours of direct sun daily to maintain rich essential oil content',
    },
    medical_info: {
      uses: ['Soothes digestive bloating and stomach cramps', 'Herbal steam for colds, flu, and muscle aches', 'Natural insect and mosquito repellent'],
      folk_remedies: [
        'Bruise 3 lemongrass stalks with fresh ginger; simmer with lime and honey for a cold-dispelling hot tea.'
      ],
      preparation: ['Crushed for herbal broths', 'Steam-distilled for essential oil'],
      toxicity_warning: 'Avoid therapeutic doses of concentrated oil internally during pregnancy.',
      disclaimer: 'Traditional culinary and wellness reference.',
      confusion_risk: {
        confused_with: 'Citronella grass (Cymbopogon nardus)',
        distinguishing_features: 'Culinary lemongrass has pale green-white bulb bases and a cleaner, sweeter citrus aroma.'
      }
    },
    botanical_details: {
      family: 'Poaceae (Grass Family)',
      native_range: 'Southeast Asia and South Asia',
      active_compounds: ['Citral (Geranial & Neral)', 'Myrcene', 'Geraniol', 'Limonene'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '24°C - 36°C (Full Sun)',
      pot_size: '30cm - 45cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Root stalks', instruction: 'Place base of fresh grocery stalks in water until roots emerge.' }
    ],
    faqs: [
      { question: 'Why are leaf tips turning brown?', answer: 'Check for insufficient water during hot summer days or pot-bound root clumps.' }
    ],
    monetization_tips: ['Bundle fresh organic stalks and distill natural anti-mosquito room sprays.'],
    tags: ['Aromatherapy', 'Bug Repellent', 'Full Sun', 'Culinary Staple']
  },

  'herb-17': {
    common_name: 'Basket Plant (Callisia Fragrans)',
    aliases: ['Spironema Fragrans', 'Chain Plant', 'False Bromeliad'],
    description: 'A prized folk remedy succulent producing trailing spider-plant-like runners. Revered in traditional household medicine for soothing sprains, burns, and inflammation.',
    quick_answer: 'Basket Plant (Callisia fragrans) is an adaptable trailing succulent that thrives in partial shade and well-aerated soil. It produces medicinal runners that root easily.',
    growth_time: '60 days for mature medicinal leaf and runner harvesting',
    seasonality: {
      north: 'Spring through autumn; shelter from freezing temperatures',
      central: 'Evergreen in shaded balcony courtyards',
      south: 'Perennial year-round growth',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Avoid direct scorching sun which bleaches leaves purple-yellow',
    },
    medical_info: {
      uses: ['Reduces swelling from sprains, bruises, and contusions', 'Soothes throat inflammation and minor burns', 'Topical wash for itchy dermatological conditions'],
      folk_remedies: [
        'Macerate cleaned runners in 40-degree rice alcohol for 1 month; use as an external liniment for joint pain.'
      ],
      preparation: ['Tinctured in alcohol for external liniments', 'Crushed fresh as cooling poultice'],
      toxicity_warning: 'Avoid excessive internal consumption; predominantly recommended for external topical applications.',
      disclaimer: 'Traditional folk practice; use cautiously.',
      confusion_risk: {
        confused_with: 'Tradescantia or spider plant (Chlorophytum)',
        distinguishing_features: 'Stout stem with whorls of fleshy leaves and long horizontal purple-tinged runners.'
      }
    },
    botanical_details: {
      family: 'Commelinaceae (Spiderwort Family)',
      native_range: 'Tropical Americas (Mexico); widely cultivated in Vietnam',
      active_compounds: ['Quercetin', 'Kaempferol', 'Phytosterols', 'Flavonoid Glycosides'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '20°C - 30°C',
      pot_size: '25cm - 35cm pot or hanging basket'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Sever runner', instruction: 'Snip a plantlet from the tip of a runner and insert into potting soil.' }
    ],
    faqs: [
      { question: 'Can it be used internally?', answer: 'Internal use must be approached with caution; external liniments are significantly safer.' }
    ],
    monetization_tips: ['Sell rooted trailing plantlets in ornamental macrame hangers.'],
    tags: ['Bruise Liniment', 'Succulent', 'Shade Friendly', 'Joint Comfort']
  },

  'herb-18': {
    common_name: 'Miracle Leaf (Cathedral Bells)',
    aliases: ['Kalanchoe Pinnata', 'Life Plant', 'Air Plant', 'Goethe Plant'],
    description: 'Famous for its miraculous ability to generate new baby plantlets along leaf margins. Renowned in traditional medicine for cooling burns, soothing ulcers, and stopping bleeding.',
    quick_answer: 'Miracle Leaf (Kalanchoe pinnata) is a hardy medicinal succulent. It requires minimal watering, thrives on sunny windowsills, and reproduces vigorously from fallen leaves.',
    growth_time: '15 days for baby plantlets to emerge from leaf margins',
    seasonality: {
      north: 'Blooms with pendulous bell flowers in late winter to spring',
      central: 'Extremely resilient to coastal sea breezes and heat',
      south: 'Flourishes continuously all year round',
      best_months: [2, 3, 4, 8, 9, 10],
      warning: 'Do not allow soil to remain soggy; succulent stems rot under poor drainage',
    },
    medical_info: {
      uses: ['Accelerates recovery from thermal burns and scalds', 'Reduces swelling, minor hemorrhages, and boils', 'Soothes inflammation from insect stings'],
      folk_remedies: [
        'Wash 2-3 thick leaves, crush with a pinch of salt, and apply juice directly onto minor first-degree burns for rapid cooling relief.',
        'Chew 2 clean fresh leaves and slowly swallow the juice to alleviate acute throat irritation.'
      ],
      preparation: ['Crushed fresh as cooling poultice', 'Juiced with salt for gargling'],
      toxicity_warning: 'Generally safe; pets should not ingest large quantities of flowers due to cardiac glycosides.',
      disclaimer: 'Emergency first aid reference only; seek hospital care for severe second-degree or third-degree burns.',
      confusion_risk: {
        confused_with: 'Other ornamental Kalanchoe species',
        distinguishing_features: 'Pinnately compound crenate succulent leaves with dormant vegetative buds in leaf notches.'
      }
    },
    botanical_details: {
      family: 'Crassulaceae (Stonecrop Family)',
      native_range: 'Madagascar; naturalized throughout tropical Asia',
      active_compounds: ['Bryophyllin A and B', 'Flavonoids', 'Quercetin Glycosides', 'Phenolic Acids'],
      soil_ph: '6.0 - 7.5 (Cactus and succulent mix)',
      ideal_temp: '20°C - 35°C',
      pot_size: '20cm - 30cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Leaf propagation', instruction: 'Place a detached mature leaf flat on damp soil surface; tiny plantlets will sprout from every notch within days.' }
    ],
    faqs: [
      { question: 'Why does a detached leaf produce new plants without soil?', answer: 'Dormant meristem tissue in the leaf margins triggers root and shoot development when separated from the parent plant.' }
    ],
    monetization_tips: ['Sell starter potted specimens as living burn and first-aid plants for homes.'],
    tags: ['Burn Care', 'First Aid Herb', 'Easy Propagation', 'Succulent Magic']
  },

  'herb-19': {
    common_name: 'Peppermint',
    aliases: ['Mentha Piperita', 'True Peppermint', 'Brandy Mint'],
    description: 'A world-famous cooling hybrid mint loaded with natural menthol. Invaluable for easing digestive cramps, relieving tension headaches, and clearing nasal passages.',
    quick_answer: 'Peppermint (Mentha piperita) is a vigorous aromatic perennial. It prefers rich, moist soil and partial shade, spreading rapidly through underground stolons.',
    growth_time: '25-30 days to initial aromatic leaf cutting',
    seasonality: {
      north: 'Spring and autumn are peak aromatic periods',
      central: 'Needs shaded protection during intense summer midday heat',
      south: 'Grows smoothly with daily moisture and morning sunlight',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Keep contained in a designated pot so it does not crowd out adjacent herbs',
    },
    medical_info: {
      uses: ['Relieves irritable bowel symptoms and indigestion', 'Eases tension headaches and mental fatigue', 'Clears sinus congestion and freshens breath'],
      folk_remedies: [
        'Brew fresh peppermint leaves with green tea and a slice of lemon for an invigorating digestive cooler.'
      ],
      preparation: ['Fresh herbal tea infusions', 'Steam inhalation for blocked sinuses'],
      toxicity_warning: 'Do not apply pure menthol or strong essential oil near the nostrils of infants under 2 years old.',
      disclaimer: 'Aromatic and digestive support reference.',
      confusion_risk: {
        confused_with: 'Spearmint (Mentha spicata) or Vietnamese mint',
        distinguishing_features: 'Dark green leaves with purple-tinged square stems and an intense crisp menthol kick.'
      }
    },
    botanical_details: {
      family: 'Lamiaceae (Mint Family)',
      native_range: 'Europe and Middle East; naturalized worldwide',
      active_compounds: ['Menthol', 'Menthone', 'Menthyl Acetate', 'Rosmarinic Acid'],
      soil_ph: '6.0 - 7.0 (Moist organic soil)',
      ideal_temp: '18°C - 28°C',
      pot_size: '25cm - 35cm dedicated container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Plant runner', instruction: 'Plant a 10cm rooted runner 2cm under moist potting soil.' }
    ],
    faqs: [
      { question: 'Why are leaves becoming small and yellowing?', answer: 'Mint quickly exhausts nutrients and roots become crowded. Repot with fresh compost every 6 months.' }
    ],
    monetization_tips: ['Supply certified organic fresh mint bundles to mixology lounges and cafes.'],
    tags: ['Menthol Kick', 'Digestive Tea', 'Aromatic Herb', 'Cooling Freshness']
  },

  'herb-20': {
    common_name: 'Indian Chrysanthemum',
    aliases: ['Chrysanthemum Indicum', 'Wild Chrysanthemum', 'Golden Mum'],
    description: 'An ancient oriental medicinal blossom celebrated for clearing liver heat, calming eye strain, soothing hypertension, and promoting serene sleep.',
    quick_answer: 'Indian Chrysanthemum produces clusters of golden medicinal blossoms. It prefers sunny balconies, free-draining soil, and regular tip pruning.',
    growth_time: '90-120 days from planting to autumn flowering harvest',
    seasonality: {
      north: 'Peak flowering occurs from October to January',
      central: 'Flowers reliably in late autumn to early winter',
      south: 'Thrives in highland climates or breezy rooftop gardens',
      best_months: [5, 6, 7, 8],
      warning: 'Avoid wetting flowers when watering to prevent floral fungal rot',
    },
    medical_info: {
      uses: ['Clears liver heat and relieves dry, fatigued eyes', 'Soothes tension headaches and mild hypertension', 'Calms the nervous system and encourages deep sleep'],
      folk_remedies: [
        'Steep 5-7 dried golden chrysanthemum flowers with goji berries and rock sugar for a nourishing vision-brightening tea.'
      ],
      preparation: ['Dehydrated whole flowers for tea', 'Floral steam baths for eyes'],
      toxicity_warning: 'Cool nature; individuals with cold digestion and chronic diarrhea should use in moderation.',
      disclaimer: 'Herbal beverage reference; not a medical cure for acute hypertension.',
      confusion_risk: {
        confused_with: 'Florist large hybrid mums',
        distinguishing_features: 'Small daisy-like golden-yellow flower heads (1.5-2.5cm) with a pungent medicinal aroma.'
      }
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'East Asia',
      active_compounds: ['Luteolin', 'Apigenin', 'Chrysanthemin', 'Sesquiterpene Lactones'],
      soil_ph: '6.0 - 7.2',
      ideal_temp: '18°C - 26°C',
      pot_size: '25cm - 35cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Stem cuttings', instruction: 'Take softwood cuttings in early summer for fall blooms.' }
    ],
    faqs: [
      { question: 'How do I get more flowers?', answer: 'Pinch growing tips 2-3 times during the vegetative phase to double the number of flowering branches.' }
    ],
    monetization_tips: ['Craft premium dried flower tea jars paired with organic wild honey.'],
    tags: ['Floral Tea', 'Eye Care', 'Liver Heat', 'Autumn Blossom']
  },

  // FRUITS (fruit-01 to fruit-10)
  'fruit-01': {
    common_name: 'Taiwan Guava (Grafted Dwarf)',
    aliases: ['Psidium Guajava', 'Crisp Pear Guava'],
    description: 'A prolific dwarf variety producing crisp, sweet fruits rich in vitamin C. Ideal for balcony pots, fruiting continuously throughout the year.',
    quick_answer: 'Taiwan Guava is an ideal container fruit tree. It thrives in full sun, requires regular watering, and bears crisp vitamin C-packed fruit in 40-50L pots.',
    growth_time: 'First harvest 4-6 months after planting grafted tree',
    seasonality: {
      north: 'Fruits year-round; peak harvests in summer and autumn',
      central: 'Continuous fruiting across all seasons',
      south: 'Prolific year-round harvests',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Bag young fruit when marble-sized to protect from fruit flies',
    },
    botanical_details: {
      family: 'Myrtaceae (Myrtle Family)',
      native_range: 'Tropical Americas; widely naturalized in Vietnam',
      active_compounds: ['Vitamin C', 'Lycopene', 'Dietary Fiber', 'Polyphenols'],
      soil_ph: '5.5 - 7.0',
      ideal_temp: '22°C - 35°C',
      pot_size: '40L - 60L heavy container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Container potting', instruction: 'Plant in 50L pot using organic soil mixed with vermicompost and perlite.' },
      { step: 2, title: 'Prune for fruiting', instruction: 'Prune branches back to 4-5 leaf pairs after each harvest to trigger new flowering shoots.' }
    ],
    faqs: [
      { question: 'Why do small fruits drop off?', answer: 'Inconsistent watering or nutrient deficiency causes fruit drop. Maintain even moisture.' }
    ],
    monetization_tips: ['Sell grafted dwarf container trees already bearing young fruit.'],
    tags: ['Balcony Fruit', 'Vitamin C', 'Year-Round Harvest', 'High Yield']
  },

  'fruit-02': {
    common_name: 'Dwarf Thai Ambarella',
    aliases: ['Spondias Dulcis', 'June Plum', 'Otaheite Apple'],
    description: 'An ultra-productive dwarf tropical fruit tree that sets fruit clusters early. The crunchy, tart-sweet fruits are beloved for fresh snacks and salads.',
    quick_answer: 'Dwarf Thai Ambarella flowers and fruits prolifically in compact balcony pots within 3 months, enjoying full sunlight and regular organic feeding.',
    growth_time: 'Flowers and fruits in 3-4 months from potted seedling',
    seasonality: {
      north: 'Fruits from April to November',
      central: 'Continuous flowering clusters throughout the year',
      south: 'Perennial non-stop fruiting',
      best_months: [2, 3, 4, 5, 8],
      warning: 'Support heavy fruit clusters with garden ties to prevent branch breakage',
    },
    botanical_details: {
      family: 'Anacardiaceae (Cashew Family)',
      native_range: 'Polynesia and Southeast Asia',
      active_compounds: ['Ascorbic Acid', 'Iron', 'Calcium', 'Pectin'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '24°C - 36°C',
      pot_size: '35L - 50L container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Full sun location', instruction: 'Place container where it receives at least 6 hours of direct sunlight daily.' }
    ],
    faqs: [
      { question: 'Can young leaves be eaten?', answer: 'Yes, the tender sour young leaves are delicious in Vietnamese sour fish soups.' }
    ],
    monetization_tips: ['Produce spicy salted fermented ambarella snacks.'],
    tags: ['Super Productive', 'Compact Tree', 'Crisp Snack', 'Balcony Star']
  },

  'fruit-03': {
    common_name: 'Persian Seedless Lime',
    aliases: ['Citrus Latifolia', 'Tahiti Lime', 'Four-Season Lime'],
    description: 'A thornless, seedless citrus variety producing juicy, aromatic limes continuously throughout all four seasons in compact patio pots.',
    quick_answer: 'Persian Seedless Lime is a thornless dwarf citrus that thrives on sunny balconies, providing heavy yields of juicy seedless limes year-round.',
    growth_time: 'Pick ripe juicy limes 3-4 months after flowering',
    seasonality: {
      north: 'Blooms and fruits continuously all 4 seasons',
      central: 'Thrives in sunny well-aerated pots',
      south: 'Perennial year-round harvests',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Monitor for citrus leaf miners and spray neem oil preventatively',
    },
    botanical_details: {
      family: 'Rutaceae (Citrus Family)',
      native_range: 'Tropical and subtropical regions',
      active_compounds: ['Citric Acid', 'Hesperidin', 'Limonene', 'Vitamin C'],
      soil_ph: '5.8 - 6.8',
      ideal_temp: '20°C - 32°C',
      pot_size: '40L - 60L container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Prune water sprouts', instruction: 'Remove vertical non-fruiting water sprouts to channel energy into fruiting laterals.' }
    ],
    faqs: [
      { question: 'Why are leaves curling with silvery trails?', answer: 'This is caused by citrus leaf miners. Treat with organic neem oil spray.' }
    ],
    monetization_tips: ['Sell established potted patio lime trees laden with fruit.'],
    tags: ['Seedless', 'Thornless', 'Four Seasons', 'Citrus Delight']
  },

  'fruit-04': {
    common_name: 'Black Genoa Fig',
    aliases: ['Ficus Carica', 'Common Fig', 'Honey Fig'],
    description: 'An exceptional container fruit tree producing large, sweet purple-skinned figs with succulent strawberry-red honeyed pulp.',
    quick_answer: 'Black Genoa Fig is a premier container fruit variety. It loves dry warmth, full sun, and good drainage, producing delicious honeyed figs in 4-5 months.',
    growth_time: 'Fruits ripen 4-5 months from spring pruning',
    seasonality: {
      north: 'Major harvest window spans from June to November',
      central: 'Heavy yields during dry sunny months',
      south: 'Fruits almost year-round with controlled watering',
      best_months: [2, 3, 4, 8],
      warning: 'Protect ripening figs from birds and beetles using breathable mesh bags',
    },
    botanical_details: {
      family: 'Moraceae (Mulberry Family)',
      native_range: 'Mediterranean Basin and West Asia',
      active_compounds: ['Ficin (Enzyme)', 'Anthocyanins', 'Potassium', 'Soluble Fiber'],
      soil_ph: '6.5 - 7.5 (Prefers slightly alkaline soil)',
      ideal_temp: '22°C - 35°C',
      pot_size: '45L - 65L pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Add lime to soil', instruction: 'Incorporate agricultural dolomite lime to raise soil pH and calcium levels.' }
    ],
    faqs: [
      { question: 'Do figs require wasp pollination?', answer: 'No, self-fertile Black Genoa figs develop sweet fruit parthenocarpically without wasps.' }
    ],
    monetization_tips: ['Market fresh honey figs directly to gourmet bakeries and restaurants.'],
    tags: ['Honey Pulp', 'Gourmet Fruit', 'Mediterranean Vibe', 'Self Fertile']
  },

  'fruit-05': {
    common_name: 'Dwarf Indian Pomegranate',
    aliases: ['Punica Granatum Nana', 'Ruby Pomegranate'],
    description: 'A compact ornamental and fruiting shrub with fiery scarlet blooms and jewel-like ruby seeds rich in punicalagins and antioxidants.',
    quick_answer: 'Dwarf Pomegranate combines dazzling red flowers with nutritious ruby-seeded fruit in patio containers under full bright sun.',
    growth_time: 'Fruits mature 5-6 months after vibrant flowering',
    seasonality: {
      north: 'Flowers from April to July; fruits ripen in autumn',
      central: 'Thrives in dry, warm, sunny exposures',
      south: 'Evergreen with multiple flowering flushes',
      best_months: [2, 3, 4, 8],
      warning: 'Ensure container drains freely; waterlogged soil causes root rot',
    },
    botanical_details: {
      family: 'Lythraceae',
      native_range: 'Mediterranean to Northern India',
      active_compounds: ['Punicalagins', 'Ellagic Acid', 'Punicic Acid', 'Anthocyanins'],
      soil_ph: '6.0 - 7.2',
      ideal_temp: '22°C - 35°C',
      pot_size: '30L - 50L pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Sunlight requirement', instruction: 'Position in the sunniest balcony corner for rich fruit coloration.' }
    ],
    faqs: [
      { question: 'Why does the fruit split before ripening?', answer: 'Irregular watering causes sudden fruit expansion and splitting. Water evenly.' }
    ],
    monetization_tips: ['Shape mature fruiting shrubs into high-end feng shui bonsai.'],
    tags: ['Antioxidant Jewel', 'Feng Shui', 'Scarlet Bloom', 'Bonsai Ready']
  },

  'fruit-06': {
    common_name: 'Sweet Starfruit (Grafted Dwarf)',
    aliases: ['Averrhoa Carambola', 'Carambola', 'Five-Finger Fruit'],
    description: 'A prolific grafted dwarf starfruit tree displaying pink-violet floral clusters followed by succulent golden-yellow honeyed star-shaped fruits.',
    quick_answer: 'Sweet Starfruit produces abundant honey-sweet star-shaped fruits in 40L containers, thriving in warm sunshine with regular organic feeding.',
    growth_time: '4-5 months from flowering to golden ripe fruit',
    seasonality: {
      north: 'Flowers in spring and summer; fruits ripen late summer into winter',
      central: 'Continuous fruiting in coastal areas',
      south: 'Prolific year-round harvests',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Individuals with severe chronic kidney disease should avoid consuming starfruit',
    },
    botanical_details: {
      family: 'Oxalidaceae (Wood Sorrel Family)',
      native_range: 'Tropical Southeast Asia',
      active_compounds: ['Caramboxin', 'Oxalic Acid', 'Vitamin C', 'Beta-Carotene'],
      soil_ph: '5.5 - 6.5',
      ideal_temp: '22°C - 34°C',
      pot_size: '40L - 60L container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Maintain humidity', instruction: 'Mist foliage lightly on dry windy afternoons.' }
    ],
    faqs: [
      { question: 'How do I know the starfruit is ripe?', answer: 'Harvest when ribs turn luminous yellow with subtle green tips.' }
    ],
    monetization_tips: ['Sell grafted dwarf container trees bearing star-shaped fruit.'],
    tags: ['Star Fruit', 'Juicy Sweet', 'Tropical Star', 'High Yield']
  },

  'fruit-07': {
    common_name: 'Heat-Tolerant Strawberry (Tochiotome)',
    aliases: ['Fragaria Ananassa', 'Tropical Strawberry', 'Patio Berry'],
    description: 'An acclimated Japanese strawberry cultivar adapted for warm Southeast Asian climates. Yields fragrant, sweet red berries in hanging baskets.',
    quick_answer: 'Heat-Tolerant Strawberry thrives in hanging pots and vertical planters, producing sweet red berries when protected from midday tropical scorch.',
    growth_time: 'Pick sweet red berries 60-75 days after planting runners',
    seasonality: {
      north: 'Peak production from October through April',
      central: 'Grow in airy shaded balconies',
      south: 'Provide morning sun and afternoon shade cloth',
      best_months: [9, 10, 11, 12, 1, 2],
      warning: 'Keep strawberry crown elevated above soil line to prevent fungal rot',
    },
    botanical_details: {
      family: 'Rosaceae (Rose Family)',
      native_range: 'Cultivated hybrid origin',
      active_compounds: ['Ellagic Acid', 'Pelargonidin (Anthocyanin)', 'Folate', 'Vitamin C'],
      soil_ph: '5.8 - 6.5',
      ideal_temp: '18°C - 28°C',
      pot_size: 'Hanging basket or vertical tiered planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Crown planting', instruction: 'Set root crown level with soil surface; never bury the growing heart.' }
    ],
    faqs: [
      { question: 'How do I pollinate indoor strawberry flowers?', answer: 'Gently tickle flower centers with a small soft watercolor paintbrush.' }
    ],
    monetization_tips: ['Design vertical DIY strawberry planter towers for urban families.'],
    tags: ['Sweet Berry', 'Hanging Basket', 'Kid Friendly', 'Heat Adapted']
  },

  'fruit-08': {
    common_name: 'Rangpur Lime (Red Lemon)',
    aliases: ['Citrus Limonia', 'Kona Lime', 'Mandarin Lime'],
    description: 'A stunning hybrid citrus bearing abundant orange-red fruits with deep tangerine pulp and an exquisite mandarin-lime fragrance. Superb for homemade syrups.',
    quick_answer: 'Rangpur Lime is a resilient ornamental and culinary citrus tree that bears striking reddish-orange fruits on sunny balconies throughout the year.',
    growth_time: 'Harvest juicy ripe fruit 4-5 months from flowering',
    seasonality: {
      north: 'Major crop ripens in autumn and winter for Lunar New Year',
      central: 'Continuous fruiting throughout the year',
      south: 'Evergreen with year-round harvest flushes',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Protect tree from strong gale-force winds when laden with fruit',
    },
    botanical_details: {
      family: 'Rutaceae (Citrus Family)',
      native_range: 'Hybrid origin (Citrus reticulata x Citrus medica)',
      active_compounds: ['Citric Acid', 'Limonene', 'Flavonoids', 'Vitamin C'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '20°C - 34°C',
      pot_size: '40L - 60L container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Balanced fertilizer', instruction: 'Apply organic kelp and fish emulsion during fruit swelling.' }
    ],
    faqs: [
      { question: 'Is the skin orange or yellow?', answer: 'The fruit turns bright reddish-orange upon full ripeness, resembling a small mandarin.' }
    ],
    monetization_tips: ['Market handcrafted artisanal red lemon and rock sugar cough syrup.'],
    tags: ['Aromatic Citrus', 'Unique Color', 'Patio Specimen', 'Artisanal Syrup']
  },

  'fruit-09': {
    common_name: 'Ninh Thuan Table Grape',
    aliases: ['Vitis Vinifera', 'Tropical Table Grape', 'Red Cardinal Grape'],
    description: 'A heat-adapted tropical grape cultivar capable of fruiting on rooftop pergolas and balcony trellises, producing clusters of sweet ruby-red grapes.',
    quick_answer: 'Ninh Thuan Grape vine transforms rooftop trellises into cooling green canopies while producing sweet grape bunches with proper seasonal cane pruning.',
    growth_time: '90-100 days from winter spur pruning to ripe harvest',
    seasonality: {
      north: 'Prune in March for summer harvest; second prune in August',
      central: 'Ideal native climate with high sunny heat',
      south: 'Can yield up to 3 crops annually with scheduled pruning',
      best_months: [2, 3, 8, 9],
      warning: 'Strict pruning is required; unpruned vines will not flower',
    },
    botanical_details: {
      family: 'Vitaceae (Grape Family)',
      native_range: 'Adapted Mediterranean vine in Ninh Thuan, Vietnam',
      active_compounds: ['Resveratrol', 'Proanthocyanidins', 'Tartaric Acid', 'Quercetin'],
      soil_ph: '6.5 - 7.5',
      ideal_temp: '25°C - 38°C (High Sun)',
      pot_size: '80L - 100L heavy planter tub'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Hard cane pruning', instruction: 'Cut mature brown canes back to 2-3 healthy eye buds to trigger fruiting clusters.' }
    ],
    faqs: [
      { question: 'Why does my grapevine only grow leaves and no fruit?', answer: 'Grapes only fruit on new shoots arising from pruned mature canes. Pruning is essential.' }
    ],
    monetization_tips: ['Install customized balcony grape arbor setups for urban clients.'],
    tags: ['Rooftop Canopy', 'Grapevine', 'Ruby Clusters', 'Resveratrol']
  },

  'fruit-10': {
    common_name: 'Thai Green Jujube',
    aliases: ['Ziziphus Mauritiana', 'Indian Jujube', 'Apple Plum'],
    description: 'A remarkably drought-tolerant, high-yielding fruit tree bearing crisp, juicy green fruits that taste like sweet mini Granny Smith apples.',
    quick_answer: 'Thai Jujube is a heavy-yielding container fruit tree. It loves hot sun and minimal care, producing crisp apple-flavored fruits within 5 months.',
    growth_time: 'Harvest sweet crisp fruits 4-5 months after spring pruning',
    seasonality: {
      north: 'Major harvest window spans October to February',
      central: 'Exceptional drought tolerance in sunny courtyards',
      south: 'Fruits abundantly throughout the year',
      best_months: [2, 3, 4, 8],
      warning: 'Cut entire tree back severely after each harvest to stimulate vigorous new fruiting branches',
    },
    botanical_details: {
      family: 'Rhamnaceae (Buckthorn Family)',
      native_range: 'South and Southeast Asia',
      active_compounds: ['Ascorbic Acid', 'Betulinic Acid', 'Flavonoid Glycosides', 'Triterpenes'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '24°C - 38°C',
      pot_size: '50L - 70L container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Post-harvest stump cut', instruction: 'Saw the trunk back to 30cm above graft union each spring for explosive new fruiting.' }
    ],
    faqs: [
      { question: 'Does it taste sour or sweet?', answer: 'Thai jujube is crisp, exceptionally juicy, and refreshingly sweet.' }
    ],
    monetization_tips: ['Sell fresh crisp organic jujube fruit baskets by the kilogram.'],
    tags: ['Crisp Apple Taste', 'Heavy Bearer', 'Drought Hardy', 'Super Vigorous']
  },

  // ORNAMENTALS & BONSAI (orn-01 to orn-05)
  'orn-01': {
    common_name: 'Water Jasmine Bonsai',
    aliases: ['Wrightia Religiosa', 'Sacred Buddhist Jasmine', 'Mai Chieu Thuy'],
    description: 'A revered Southeast Asian sacred bonsai with pendulous, heavenly scented white blossoms. Symbolizes serenity, peace of mind, and harmonious fortune.',
    quick_answer: 'Water Jasmine (Wrightia religiosa) is a premier fragrant bonsai tree. It thrives in full sun, loves generous water, and flowers continuously with sweet jasmine perfume.',
    growth_time: 'Flowers emerge 20-30 days after leaf defoliation',
    seasonality: {
      north: 'Warm seasons bring continuous blooms; protect from freezing winters',
      central: 'Evergreen flowering year-round',
      south: 'Perennial non-stop white blossom flushes',
      best_months: [2, 3, 4, 5, 8, 9],
      warning: 'Defoliate old leaves completely 4 weeks before holidays to coordinate a massive synchronized bloom',
    },
    botanical_details: {
      family: 'Apocynaceae (Dogbane Family)',
      native_range: 'Southeast Asia (Vietnam, Thailand, Malaysia)',
      active_compounds: ['Essential Oils', 'Terpenoids', 'Alkaloids'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '22°C - 35°C',
      pot_size: 'Shallow ceramic bonsai tray (30cm - 60cm)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Wiring branches', instruction: 'Shape flexible young branches using anodized aluminum bonsai wire.' }
    ],
    faqs: [
      { question: 'How do I trigger synchronized flowering?', answer: 'Withhold water for 3 days until leaves droop, strip all leaves off, and water deeply with high-phosphorus organic fertilizer.' }
    ],
    monetization_tips: ['Create shaped specimen bonsai pieces for corporate offices and luxury homes.'],
    tags: ['Sacred Bonsai', 'Heavenly Fragrance', 'Zen Living', 'Flower Synchrony']
  },

  'orn-02': {
    common_name: 'Sapa Heirloom Rose',
    aliases: ['Rosa Chinensis Sapa', 'Ancient French Tea Rose', 'Heritage Rose'],
    description: 'A legendary heirloom tea rose acclimated in northern Vietnamese mountains. Prolific multi-petaled blush pink blooms exuding an intoxicating classical damask rose perfume.',
    quick_answer: 'Sapa Heirloom Rose is a vigorous heritage rose that flowers continuously in large containers, filling balconies with sweet damask perfume all year.',
    growth_time: 'Blooms every 35-45 days following seasonal branch pruning',
    seasonality: {
      north: 'Spectacular large multi-petaled blooms from autumn to spring',
      central: 'Provide breezy morning sun',
      south: 'Grow under airy balcony conditions with regular pruning',
      best_months: [9, 10, 11, 12, 1, 2, 3],
      warning: 'Treat black spot and spider mites promptly with organic copper fungicide and neem oil',
    },
    botanical_details: {
      family: 'Rosaceae (Rose Family)',
      native_range: 'Sapa Highlands, Vietnam (Historic French heirloom heritage)',
      active_compounds: ['Citronellol', 'Geraniol', 'Nerol', 'Anthocyanins'],
      soil_ph: '6.0 - 6.8 (Rich compost and earthworm castings)',
      ideal_temp: '18°C - 28°C',
      pot_size: '40L - 60L container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Deadhead spent flowers', instruction: 'Prune back 3 leaf nodes below faded blooms to encourage rapid new floral shoots.' }
    ],
    faqs: [
      { question: 'Why are flower buds balling and not opening?', answer: 'Prolonged damp rain or thrips can prevent buds from opening. Ensure good air circulation.' }
    ],
    monetization_tips: ['Distill pure organic rose hydrosol mist from freshly picked petals.'],
    tags: ['Damask Perfume', 'Heirloom Rose', 'Romantic Balcony', 'Year-Round Blooms']
  },

  'orn-03': {
    common_name: 'Dwarf Umbrella Tree',
    aliases: ['Schefflera Heptaphylla', 'Seven-Finger Ivy', 'Octopus Tree'],
    description: 'A prized native indoor botanical that naturally repels mosquitoes, purifies formaldehyde from urban air, and brings good fortune with its umbrella-like leaf whorls.',
    quick_answer: 'Dwarf Umbrella Tree (Schefflera heptaphylla) is an undemanding indoor houseplant that filters airborne toxins and naturally repels mosquitoes.',
    growth_time: 'Fast-growing; maintain desired height through spring pruning',
    seasonality: {
      north: 'Evergreen year-round; protect from cold dry winds',
      central: 'Resilient in shaded corridors and patios',
      south: 'Lush green foliage in all seasons',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Keep away from domestic cats who may chew leaves, as oxalates can cause irritation',
    },
    botanical_details: {
      family: 'Araliaceae (Ginseng Family)',
      native_range: 'Vietnam and East Asia',
      active_compounds: ['Saponins', 'Volatile Terpenes', 'Flavonoids'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '20°C - 32°C (Indoor / Partial shade)',
      pot_size: '30cm - 45cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Indoor placement', instruction: 'Place in bright filtered light near living room or balcony windows.' }
    ],
    faqs: [
      { question: 'Does it really deter mosquitoes?', answer: 'Yes, the natural volatile terpenes emitted by its foliage naturally discourage mosquitoes.' }
    ],
    monetization_tips: ['Curate styled ceramic office desk planters for wellness corporate clients.'],
    tags: ['Mosquito Repellent', 'Air Purifier', 'Indoor Green', 'Feng Shui Luck']
  },

  'orn-04': {
    common_name: 'ZZ Plant (Fortune Aroid)',
    aliases: ['Zamioculcas Zamiifolia', 'Eternity Plant', 'Money Tree'],
    description: 'The ultimate indestructible architectural houseplant with lustrous emerald-green waxy leaves. Symbolizes wealth attraction and thrives even in low light.',
    quick_answer: 'ZZ Plant is the most forgiving indoor plant. It stores water in potato-like underground rhizomes, tolerating low light and needing water only once every 2 weeks.',
    growth_time: 'Slow, steady architectural growth lasting decades',
    seasonality: {
      north: 'Water minimally in winter; growth surges in spring and summer',
      central: 'Evergreen in offices and living rooms',
      south: 'Flourishes continuously with minimal care',
      best_months: [3, 4, 5, 8],
      warning: 'Never overwater; wet soggy soil will quickly rot the subterranean potato-like rhizomes',
    },
    botanical_details: {
      family: 'Araceae (Arum Family)',
      native_range: 'Eastern Africa',
      active_compounds: ['Calcium Oxalate Crystals', 'Phenolic Acids'],
      soil_ph: '6.0 - 7.0 (Fast draining succulent mix)',
      ideal_temp: '18°C - 32°C (Low to medium indirect light)',
      pot_size: '25cm - 35cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Let soil dry', instruction: 'Allow the top 75% of soil to dry completely between waterings.' }
    ],
    faqs: [
      { question: 'Why are stems turning mushy and yellow?', answer: 'Overwatering is rotting the tubers. Stop watering and move into brighter indirect light.' }
    ],
    monetization_tips: ['Offer commercial plant leasing and maintenance for tech startups.'],
    tags: ['Indestructible', 'Low Light', 'Wealth Symbol', 'Clean Air']
  },

  'orn-05': {
    common_name: 'Houseleek Succulent (Buddha Stone Lotus)',
    aliases: ['Sempervivum Calcareum', 'Hens and Chicks', 'Buddha Lotus'],
    description: 'A mesmerizing rosette succulent resembling a carved jade lotus flower. Symbolizes eternal resilience, peaceful meditation, and unwavering focus on balconies.',
    quick_answer: 'Houseleek Succulent forms tight geometric lotus-like rosettes. It requires bright sun, gritty mineral soil, and minimal watering, making it ideal for desk terrariums.',
    growth_time: 'Produces clustered baby chicks offsets every 2-3 months',
    seasonality: {
      north: 'Vibrant rosy leaf tips in cool, dry autumn and winter',
      central: 'Ensure coarse gritty pumice soil to withstand monsoon humidity',
      south: 'Provide breezy morning sun and shelter from tropical afternoon downpours',
      best_months: [9, 10, 11, 12, 1, 2, 3],
      warning: 'Never pour water into the center of the rosette; water around the soil edge to prevent crown rot',
    },
    botanical_details: {
      family: 'Crassulaceae (Stonecrop Family)',
      native_range: 'Alps and European mountain ranges; cultivated widely',
      active_compounds: ['Malic Acid', 'Mucilage', 'Flavonoids', 'Tannins'],
      soil_ph: '6.0 - 7.5 (Gritty pumice and perlite substrate)',
      ideal_temp: '15°C - 28°C',
      pot_size: '10cm - 20cm porous unglazed terracotta pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Separate offsets', instruction: 'Snip baby chicks on stolons and place gently on top of dry gritty pumice mix.' }
    ],
    faqs: [
      { question: 'Why are outer leaves turning translucent and mushy?', answer: 'Root rot from overwatering or lack of airflow. Remove damaged leaves immediately and let soil dry.' }
    ],
    monetization_tips: ['Create custom artisanal stone succulent bowls for mindfulness meditation gifts.'],
    tags: ['Meditation Lotus', 'Drought Champion', 'Terracotta Art', 'Geometric Beauty']
  },

  // ==========================================
  // BILINGUAL TRANSLATIONS FOR PRIZED VIETNAMESE HERBS (MS10)
  // ==========================================
  'herb-21': {
    common_name: 'Red Onion Ginseng (Sam Dai Hanh)',
    aliases: ['Eleutherine Bulb', 'Red Garlic Herb', 'Lao Garlic'],
    description: 'A prized Vietnamese medicinal bulb with ruby-red cloves. Rich in naphthoquinone derivatives (eleutherin, isoeleutherin) showing potent antimicrobial activity against Staphylococcus aureus, nourishing red blood cells, and healing respiratory infections.',
    quick_answer: 'Red Onion Ginseng (Eleutherine bulbosa) thrives in balcony pots from clove division. It prefers loose humus-rich soil and bright filtered morning sun. Harvest medicinal bulbs in 6-8 months when foliage naturally dies back.',
    growth_time: '6 - 8 months to harvest mature medicinal bulbs',
    seasonality: {
      north: 'Plant in spring (Feb-Apr); harvest bulbs in late autumn (Oct-Dec)',
      central: 'Year-round cultivation; maintain well-drained substrate during monsoon season',
      south: 'Thrives vigorously year-round under filtered canopy light',
      best_months: [2, 3, 4, 10, 11]
    },
    medical_info: {
      uses: ['Tonifies blood, remedies anemia and physical fatigue', 'Natural antibiotic for pharyngitis and bronchitis', 'Relieves boils, bruises, and promotes wound hemostasis'],
      folk_remedies: [
        'Decoct 12g dried red bulb with 12g Drynaria rhizome and 10g Angelica sinensis for rheumatic aches and anemia.',
        'Crush fresh cloves with a pinch of sea salt and apply as a poultice on inflamed carbuncles to rapidly draw pus.'
      ],
      preparation: ['Steep in rice wine as a blood-building tonic', 'Sun-dry and grind into fine daily medicinal powder'],
      toxicity_warning: 'Non-toxic and gentle. Individuals experiencing high fever or excessive internal heat should use in moderate doses.',
      disclaimer: 'Referenced from Pharmacopoeia of Vietnam V. Traditional folklore does not substitute professional medical diagnosis.'
    },
    botanical_details: {
      family: 'Iridaceae (Iris Family)',
      native_range: 'Tropical Americas, naturalized as a classical Vietnamese medicinal herb',
      active_compounds: ['Eleutherin', 'Isoeleutherin', 'Eleutherol', 'Flavonoids'],
      soil_ph: '6.0 - 6.8',
      ideal_temp: '20°C - 32°C',
      pot_size: '25cm - 35cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Separate Clove Bulbs', instruction: 'Gently split individual cloves from mother bulb clusters and let calluses dry for 24 hours.' },
      { step: 2, title: 'Plant Upright', instruction: 'Bury cloves 3cm deep in fluffy organic potting mix with the pointed tip facing upwards.' }
    ],
    faqs: [
      { question: 'Can I grow Red Onion Ginseng in shallow apartment planters?', answer: 'Yes, any container with 20cm depth and drainage holes will yield 8-12 new daughter bulbs per clove.' }
    ],
    monetization_tips: ['Sell organic heirloom bulb starters at $1.50 - $2.50 each to home herbalists.'],
    tags: ['Blood Tonic', 'Natural Antibiotic', 'Balcony Bulb', 'Precious Folk Herb']
  },

  'herb-22': {
    common_name: 'Indian Camphorweed (Cuc Tan)',
    aliases: ['Pluchea Indica', 'False Camphor', 'Southern Sai Ho'],
    description: 'A celebrated Southeast Asian restorative herb for breaking wind-cold fevers, relieving spinal osteoarthritis, and soothing hemorrhoids. Leaves exude an invigorating lemongrass-camphor aroma and tolerate scorching west-facing balconies effortlessly.',
    quick_answer: 'Indian Camphorweed roots 100% reliably from semi-hardwood stem cuttings in balcony pots. It loves intense direct sunlight and drought, creating a natural green acoustic and heat privacy hedge.',
    growth_time: 'Harvest fresh tender tips in 25 days continuously',
    seasonality: {
      north: 'Vigorous flush in spring and summer; leaves tint slightly golden in winter',
      central: 'Highly tolerant to coastal sea spray and windy balconies',
      south: 'Perennial evergreen lush growth all 12 months',
      best_months: [2, 3, 4, 5, 8, 9]
    },
    medical_info: {
      uses: ['Dispels wind-cold, lowers headache and acute fevers', 'Alleviates lower back pain, sciatica, and joint stiffness', 'Herbal steam wash for hemorrhoids and antiseptic skin rinse'],
      folk_remedies: [
        'Boil 20g fresh leaves with 10g lemongrass and 10g lime leaves into a restorative facial steam to induce cleansing sweat.',
        'Pan-roast fresh leaves with coarse sea salt and wrap in a cotton towel for a therapeutic hot back compress.'
      ],
      preparation: ['Herbal sweat steam therapy', 'Medicinal salt hot compress', 'Tender shoots raw culinary aromatic'],
      toxicity_warning: 'Safe and non-toxic. Do not use steam baths when the patient is excessively dehydrated or suffering from heat stroke.',
      disclaimer: 'Referenced from Pharmacopoeia of Vietnam IV. For traditional home therapy guidance.'
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'Indigenous to Vietnam and Southeast Asian wetlands and coasts',
      active_compounds: ['Sesquiterpenes', 'Cineol', 'Limonene', 'Flavonoids'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '22°C - 36°C',
      pot_size: '30cm - 45cm planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Take 15cm Cuttings', instruction: 'Strip bottom foliage and insert into damp coco peat; new roots appear in 10-14 days.' }
    ],
    faqs: [
      { question: 'Does Pluchea indica repel mosquitoes?', answer: 'Yes, crushing its essential-oil-rich leaves releases natural camphor that repels mosquitoes and gnats.' }
    ],
    monetization_tips: ['Sell rooted hedge starter pots and artisanal botanical foot soak salt pouches.'],
    tags: ['Fever Relief', 'Joint Therapy', 'West Balcony Champion', 'Living Green Wall']
  },

  'herb-23': {
    common_name: 'Purple Skunkvine (Mo Long Tia)',
    aliases: ['Paederia Foetida', 'Chinese Fever Vine', 'King of Gut Herbs'],
    description: 'The premier botanical remedy for amoebic dysentery, spastic colitis, and irritable bowel syndrome (IBS) in Vietnamese culinary medicine. Bi-colored velvety leaves (green top, purple underside) contain paederin which cleanses bacterial infections and regenerates gut lining.',
    quick_answer: 'Purple Skunkvine is an energetic balcony trellis vine that loves partial shade. Its hallmark culinary remedy—omelette steamed in banana leaf without cooking oil—is a clinical dietary staple for digestive recovery.',
    growth_time: '30 days to start picking climbing leaves',
    seasonality: {
      north: 'Plant Feb-May; dense green foliage wraps trellises all through summer and fall',
      central: 'Adapts wonderfully to high ambient humidity',
      south: 'Perennial vigorous vine with year-round leaf production',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Cures amoebic dysentery, bacterial diarrhea, and IBS spasms', 'Soothes chronic ulcerative colitis inflammation', 'Clears pinworms gently in pediatric health'],
      folk_remedies: [
        'Finely chop 30g fresh leaves with 1 organic egg, wrap in banana leaves and dry-pan roast without oil; consume warm daily for 5 days.',
        'Crush fresh leaves in warm water, strain, and sip on an empty morning stomach to expel pinworms.'
      ],
      preparation: ['Dry-pan egg omelette wrap', 'Fresh pressed therapeutic juice'],
      toxicity_warning: 'Completely safe, nutritious, and gentle as a daily culinary dish.',
      disclaimer: 'Traditional functional culinary guidance as recorded by Prof. Do Tat Loi.'
    },
    botanical_details: {
      family: 'Rubiaceae (Coffee Family)',
      native_range: 'Native to tropical Asia; cherished staple in Vietnamese herb gardens',
      active_compounds: ['Paederin', 'Methyl Mercaptan', 'Scandoside', 'Iridoids'],
      soil_ph: '5.5 - 6.5',
      ideal_temp: '20°C - 32°C',
      pot_size: '30cm - 40cm container with climbing trellis'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Trellis Setup', instruction: 'Provide vertical twine or a bamboo lattice; vines will climb up to 3 meters quickly.' }
    ],
    faqs: [
      { question: 'Why does the vine have a sulfur smell when crushed?', answer: 'The pungent aroma comes from natural methyl mercaptan, the very compound responsible for eradicating gut pathogens.' }
    ],
    monetization_tips: ['Supply fresh organic culinary leaves to neighborhood families suffering from chronic gut sensitivity.'],
    tags: ['Colitis Savior', 'Gut Health', 'Balcony Trellis', 'Superfood Omelette']
  },

  'herb-24': {
    common_name: 'Dwarf Lilyturf / Mondo Grass (Mach Mon Dong)',
    aliases: ['Ophiopogon Japonicus', 'Mondo Grass Tuber', 'Mai Men Dong'],
    description: 'A classical Asian lung and heart restorative herb. Nourishes Yin moisture, clears chronic dry hacking coughs, soothes hoarseness, relieves dry mouth, and eases heat-induced constipation. Its evergreen fountain-like grassy tufts make it a gorgeous balcony border plant.',
    quick_answer: 'Dwarf Lilyturf (Ophiopogon japonicus) is a hardy perennial clumping herb producing plump underground medicinal tubers. It loves partial shade, tolerates drought, and produces delicate pale lilac flowers.',
    growth_time: '12 - 18 months to harvest mature succulent medicinal tubers',
    seasonality: {
      north: 'Plant in spring (Feb-Apr); harvest tubers in late autumn and winter',
      central: 'Flourishes beneath shady canopies of larger potted fruit trees',
      south: 'Evergreen perennial thriving on morning-sun East or North balconies',
      best_months: [2, 3, 4, 10, 11]
    },
    medical_info: {
      uses: ['Moistens dry lungs, stops chronic hacking coughs and hoarse voice', 'Generates body fluids to relieve intense thirst and dry throat', 'Gently lubricates intestines for Yin-deficiency constipation'],
      folk_remedies: [
        'Simmer 12g Ophiopogon with 12g Asparagus cochinchinensis and 8g Platycodon for chronic dry bronchial coughs.',
        'Decoct 10g Ophiopogon with 12g Scrophularia and 12g Rehmannia to clear internal fever and nourish dry mucous membranes.'
      ],
      preparation: ['De-cored dried tuber herbal tea', 'Lung-nourishing sweet bird-nest tonic soup'],
      toxicity_warning: 'Non-toxic and gentle. Those with spleen-stomach deficiency diarrhea or cold phlegm should not use alone.',
      disclaimer: 'Pharmacopoeia of Vietnam V. For traditional oriental medicine reference.'
    },
    botanical_details: {
      family: 'Asparagaceae (Asparagus Family)',
      native_range: 'East Asia, naturalized and cultivated widely across Vietnam',
      active_compounds: ['Ophiopogonins A-D', 'Ruscogenin', 'Polysaccharides', 'Sterols'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '18°C - 30°C',
      pot_size: '20cm - 30cm shallow wide planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Separate Clump Divisions', instruction: 'Divide rooted clumps and plant 3-4 shoots per cluster into well-drained sandy loam.' }
    ],
    faqs: [
      { question: 'Why must the inner green core of the tuber be removed?', answer: 'Traditional pharmacopoeias recommend removing the fibrous central core before drying to avoid mild heat-vexation.' }
    ],
    monetization_tips: ['Sell aesthetic live grassy border pots and hand-prepared de-cored dried tubers for premium wellness teas.'],
    tags: ['Lung Moistener', 'Dry Cough Cure', 'Grassy Border', 'Yin Tonic']
  },

  'herb-25': {
    common_name: 'Stevia Sweetleaf (Co Ngot)',
    aliases: ['Stevia Rebaudiana', 'Sweet Daisy', 'Zero-Calorie Sugar Plant'],
    description: 'Nature’s miraculous zero-calorie sweetener. Leaves are up to 300 times sweeter than cane sugar without triggering blood glucose or insulin spikes, making it the supreme natural sweetener for diabetics, keto dieters, and healthy weight management.',
    quick_answer: 'Stevia thrives in balcony containers with gentle morning sunlight and consistently moist, well-aerated soil. Snip fresh or dried leaves to naturally sweeten tea blends without refined sugar.',
    growth_time: '35 days to begin picking intensely sweet leaves',
    seasonality: {
      north: 'Thrives from March to September; rests during chilly northern winter',
      central: 'Flourishes during mild spring and autumn months',
      south: 'Grows continuously year-round in bright, sheltered patio spots',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Natural 0-calorie sweetener for diabetic dietary control', 'Mildly regulates high blood pressure and cardiac tone', 'Inhibits oral bacteria and prevents dental cavities'],
      folk_remedies: [
        'Infuse 3 fresh stevia leaves with 10 dried chamomile blossoms in boiling water for 5 minutes for a calming, sweet sugar-free evening brew.',
        'Brew with mint and Indian borage to sweeten homemade children’s cough syrups safely without refined sugar.'
      ],
      preparation: ['Fresh or dried leaf tea infusion', 'Concentrated liquid stevia extract'],
      toxicity_warning: 'Recognized as universally safe by FDA and WHO. Those with hypotension should avoid drinking overly concentrated stevia tea.',
      disclaimer: 'Scientific guidance in accordance with National Institute of Nutrition and FDA GRAS.'
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'South America (Paraguay & Brazil), domesticated in Vietnam institutes',
      active_compounds: ['Stevioside', 'Rebaudioside A', 'Dulcoside A', 'Flavonoids'],
      soil_ph: '6.5 - 7.5',
      ideal_temp: '20°C - 30°C',
      pot_size: '20cm - 30cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Avoid Flowering', instruction: 'Pinch off flower buds immediately when they appear to channel maximum sweetness into the foliage.' }
    ],
    faqs: [
      { question: 'Does Stevia raise blood sugar?', answer: 'No, steviol glycosides pass through the digestive tract without caloric absorption, leaving blood glucose completely unchanged.' }
    ],
    monetization_tips: ['Pack artisanal loose-leaf stevia blends mixed with dried rosebuds and peppermint for health boutiques.'],
    tags: ['Zero Calorie', 'Diabetic Safe', 'Pure Natural Sweet', 'Artisanal Tea']
  },

  // ==========================================
  // SPRINT 1: NATIVE MEDICINAL HERBS (herb-26 to herb-35)
  // ==========================================
  'herb-26': {
    common_name: 'Longevity Spinach (Kim That Tai)',
    aliases: ['Leaves of the Gods', 'Gynura Procumbens', 'Diabetes Leaf'],
    description: 'Renowned Southeast Asian medicinal green revered for blood sugar stabilization, hypertension balance, and metabolic support. Thick succulent leaves propagate effortlessly from balcony cuttings.',
    quick_answer: 'Longevity Spinach thrives in partial shade or gentle morning light. Root cuttings in 10-14 days. Consume 3-5 fresh leaves daily or toss into daily broths.',
    growth_time: '20 days to start harvesting succulent tender shoots',
    seasonality: {
      north: 'Thrives during spring and summer; shelter from chilly winter frost',
      central: 'Flourishes year-round; ensure prompt rainwater drainage',
      south: 'Luxuriant emerald growth year-round in bright dappled light',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Supports type 2 blood sugar management', 'Aids cholesterol reduction and healthy blood pressure', 'Clears internal heat, soothes inflammation, and protects liver'],
      folk_remedies: [
        'Chew 3-5 fresh washed leaves thoroughly 30 minutes before breakfast.',
        'Cook 50g fresh leaves with lean minced pork or shrimp for a revitalizing soup.'
      ],
      preparation: ['Raw leaf consumption', 'Herbal soup cooking', 'Dried leaf tea infusion'],
      toxicity_warning: 'Gentle culinary vegetable; pregnant women should consult their physician before high-dose consumption.',
      disclaimer: 'Renowned Southeast Asian ethnomedical wellness herb.'
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'Vietnam, Malaysia, Thailand',
      active_compounds: ['Flavonoids', 'Phenolic acids', 'Sterols', 'Gynurin'],
      soil_ph: '6.0 - 7.0 (Moist, rich, well-aerated loam)',
      ideal_temp: '22°C - 32°C',
      pot_size: '25cm - 35cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Stem Cuttings', instruction: 'Insert 15cm semi-woody cuttings into moist organic coco peat; roots emerge vigorously within 10 days.' }
    ],
    faqs: [
      { question: 'Can I eat Longevity Spinach raw?', answer: 'Yes, leaves are succulent with a pleasant mild herbal taste, ideal for fresh salads or wraps.' }
    ],
    monetization_tips: ['Sell organic potted Longevity Spinach plants to health-conscious apartment dwellers.'],
    tags: ['Blood Sugar Support', 'Blood Pressure', 'Easy Cuttings', 'Edible Medicinal']
  },

  'herb-27': {
    common_name: 'Sabah Snake Grass (Xuong Khi / Bim Bip)',
    aliases: ['Clinacanthus Nutans', 'Bone-Knit Herb', 'Miser Grass'],
    description: 'Traditional tropical medicinal herb famed across Vietnam and Southeast Asia for joint rehabilitation, anti-inflammatory prowess, and cellular detox. Easily cultivated in lightweight balcony pots.',
    quick_answer: 'Sabah Snake Grass loves filtered sunlight and regular hydration. Blend leaves into raw restorative morning green juices or steam as wholesome culinary greens.',
    growth_time: '30 - 45 days for full vegetative harvest',
    seasonality: {
      north: 'Rapid growth in humid summer months; moves indoors in winter',
      central: 'Thrives in warm coastal conditions with organic mulch',
      south: 'Perennial vigorous growth across all seasons',
      best_months: [3, 4, 5, 8, 9, 10]
    },
    medical_info: {
      uses: ['Supports joint mobility and soothes bone aches', 'Broad-spectrum anti-inflammatory and cellular detox', 'Clears liver heat and cleanses lymphatic pathways'],
      folk_remedies: [
        'Blend 30-50g fresh washed leaves with pure apple juice or young coconut water as a daily restorative tonic.',
        'Crush fresh leaves and apply topically over sprained joints or minor skin eruptions.'
      ],
      preparation: ['Fresh restorative green smoothie', 'Simmered bone-broth soup', 'External poultice'],
      toxicity_warning: 'Safe culinary green. Drink plenty of warm water throughout the day.',
      disclaimer: 'Extensively researched botanical in Southeast Asian integrative medicine.'
    },
    botanical_details: {
      family: 'Acanthaceae (Acanthus Family)',
      native_range: 'Vietnam, Thailand, Malaysia',
      active_compounds: ['Lupeol', 'Betulin', 'Flavonoids', 'C-glycosylflavones'],
      soil_ph: '6.0 - 6.8',
      ideal_temp: '22°C - 35°C',
      pot_size: '30cm - 45cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Harvest Pruning', instruction: 'Snip top 20cm branches regularly to stimulate dense side shoots and continuous fresh foliage.' }
    ],
    faqs: [
      { question: 'What does Sabah Snake Grass taste like?', answer: 'Mildly grassy and sweet with zero bitterness, blending smoothly into juices and soups.' }
    ],
    monetization_tips: ['Craft freshly harvested cold-pressed medicinal green detox bottles.'],
    tags: ['Joint Support', 'Anti-Inflammatory', 'Liver Detox', 'Rich Green Smoothie']
  },


  'herb-29': {
    common_name: 'Snake Needle Grass (Bach Hoa Xa Thiet Thao)',
    aliases: ['Hedyotis Diffusa', 'Oldenlandia Diffusa', 'Diamond Burbark'],
    description: 'Classic heat-clearing and detoxifying herbal remedy extensively documented for anti-tumor, anti-inflammatory, and immune-modulating properties. Tender creeping herb suitable for mixed shallow planters.',
    quick_answer: 'Grows readily in moist, organic soil under mild sun. Boil fresh or sun-dried whole plant into refreshing detox infusions.',
    growth_time: '35 - 45 days from seedling to full carpet harvest',
    seasonality: {
      north: 'Vigorous summer carpet; self-seeds for following spring',
      central: 'Requires regular misting during dry summer wind periods',
      south: 'Perennial groundcover in moist shaded balcony pots',
      best_months: [3, 4, 5, 6, 7]
    },
    medical_info: {
      uses: ['Clears internal toxic heat and reduces inflammatory swellings', 'Frequently combined with Scutellaria in cellular wellness protocols', 'Soothes urinary tract heat and urinary discomfort'],
      folk_remedies: [
        'Simmer 40g dried Snake Needle Grass with 20g Ban Chi Lien (Barbed Skullcap) in 1.5L water down to 800ml for internal cellular cleanse.',
        'Drink fresh decoction during humid heatwaves to eliminate acne and skin eruptions.'
      ],
      preparation: ['Simmered detox tea', 'Cooling summer tisane'],
      toxicity_warning: 'Markedly cooling nature; individuals with cold digestive weakness should add fresh ginger slices.',
      disclaimer: 'Renowned classical herb in Oriental oncology and lymphatic medicine.'
    },
    botanical_details: {
      family: 'Rubiaceae (Coffee Family)',
      native_range: 'Tropical and subtropical Asia',
      active_compounds: ['Ursolic acid', 'Oleanolic acid', 'Asperuloside', 'Scandoside'],
      soil_ph: '5.5 - 6.5 (Rich, constantly moist humus)',
      ideal_temp: '20°C - 32°C',
      pot_size: 'Wide shallow rectangular planter (15cm - 20cm deep)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Moisture Retention', instruction: 'Top shallow containers with fine rice hull charcoal to retain consistent moisture around delicate creeping roots.' }
    ],
    faqs: [
      { question: 'Why does it have tiny white flowers?', answer: 'The name "Bach Hoa" means Hundred White Flowers, referring to its abundant needle-shaped star-white blooms.' }
    ],
    monetization_tips: ['Sell paired wellness combinations of Bach Hoa Xa Thiet Thao and Ban Chi Lien.'],
    tags: ['Cellular Detox', 'Anti-Inflammatory', 'Cooling Herb', 'Shallow Planter']
  },

  'herb-30': {
    common_name: 'Gymnema / Sugar Destroyer (Day Thia Canh)',
    aliases: ['Gymnema Sylvestre', 'Gurmar', 'Miracle Glucose Vine'],
    description: 'The legendary "sugar destroyer" vine of Ayurvedic and Vietnamese ethnobotany. Gymnemic acids suppress sweet taste receptors on the tongue and regulate pancreatic insulin secretion.',
    quick_answer: 'Train this perennial vine on balcony railings or trellis. Steep dried leaves after meals to curb sugar cravings and maintain balanced glucose levels.',
    growth_time: '60 days for lush climbing vine development',
    seasonality: {
      north: 'Flourishes from April to October; rests during cold northern winter',
      central: 'Tolerates summer heat well with daily morning watering',
      south: 'Perennial vigorous climbing growth all 12 months',
      best_months: [3, 4, 5, 8, 9, 10]
    },
    medical_info: {
      uses: ['Suppresses oral sensation of sweetness to curb sugar addiction', 'Stimulates healthy pancreatic beta-cell function', 'Aids holistic weight management and lipid balance'],
      folk_remedies: [
        'Brew 10-15g dried Gymnema leaves with 500ml boiling water; drink 20 minutes after lunch and dinner.',
        'Chew 1 fresh leaf before dessert to experience the natural loss of sweet taste perception.'
      ],
      preparation: ['Post-meal herbal tea', 'Standardized dried leaf infusion'],
      toxicity_warning: 'Diabetic individuals on insulin therapy should monitor blood glucose closely to prevent hypoglycemia.',
      disclaimer: 'Universally celebrated botanical for metabolic endocrine support.'
    },
    botanical_details: {
      family: 'Apocynaceae (Dogbane Family)',
      native_range: 'Tropical forests of Central and Southern Vietnam, India',
      active_compounds: ['Gymnemic acids', 'Gurmarin', 'Flavonoids', 'Anthraquinones'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '22°C - 35°C',
      pot_size: '35cm - 50cm pot with climbing trellis'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Balcony Trellis', instruction: 'Guide young vine tendrils onto balcony guardrails to create a lush, productive green screen.' }
    ],
    faqs: [
      { question: 'Why does sugar taste like sand after chewing this leaf?', answer: 'Gurmarin peptides temporarily block sweet taste buds on the tongue for 1-2 hours without affecting salty or sour tastes.' }
    ],
    monetization_tips: ['Produce premium loose-leaf Gymnema tea blends for health boutiques.'],
    tags: ['Sugar Destroyer', 'Glucose Balance', 'Craving Blocker', 'Balcony Trellis']
  },

  'herb-31': {
    common_name: 'Vietnamese Lowland Dandelion (Bo Cong Anh Thap)',
    aliases: ['Taraxacum Officinale', 'Wild Dandelion', 'Herba Taraxaci'],
    description: 'Potent lymphatic purifier, liver cleanser, and digestive tonic. Fluffy golden blooms and deeply toothed mineral-rich leaves pack high concentrations of inulin, luteolin, and vitamin A.',
    quick_answer: 'Thrives in organic balcony containers. Harvest crisp bitter greens for nutrient-dense spring salads or roast roots for caffeine-free herbal coffee.',
    growth_time: '25 - 30 days to begin harvesting tender bitter greens',
    seasonality: {
      north: 'Peak vitality from late autumn through spring; produces sunny blooms',
      central: 'Provide partial afternoon shade during sweltering summer months',
      south: 'Grows best in cooler breezy months or under 40% shade cloth',
      best_months: [1, 2, 3, 10, 11, 12]
    },
    medical_info: {
      uses: ['Classic botanical for mastitis and clearing breast congestion in nursing mothers', 'Powerful gentle diuretic that preserves potassium levels', 'Promotes digestive bile flow and liver cleansing'],
      folk_remedies: [
        'Boil 40g fresh dandelion leaves with rock sugar; drink warm to relieve breast swelling and soothe mastitis.',
        'Chop tender young leaves into fresh salads with olive oil and garlic as a spring liver detox.'
      ],
      preparation: ['Fresh detox green salad', 'Simmered leaf tisane', 'Roasted root herbal coffee'],
      toxicity_warning: 'Safe culinary bitter green. Individuals with gallstones should consult healthcare providers.',
      disclaimer: 'Celebrated worldwide as an indispensable culinary and medicinal weed.'
    },
    botanical_details: {
      family: 'Asteraceae (Daisy Family)',
      native_range: 'Temperate and subtropical regions, naturalized across Vietnam',
      active_compounds: ['Inulin', 'Taraxacin', 'Luteolin', 'Potassium', 'Choline'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '18°C - 28°C',
      pot_size: '20cm - 30cm deep container for taproot growth'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Deep Soil', instruction: 'Use pots at least 25cm deep to accommodate the strong medicinal taproot.' }
    ],
    faqs: [
      { question: 'Is low dandelion different from tall dandelion (Lactuca indica)?', answer: 'Yes, low dandelion forms a basal rosette with intense dandelion flowers and stronger medicinal taproots.' }
    ],
    monetization_tips: ['Sell fresh organic micro-greens and hand-roasted dandelion root brew bags.'],
    tags: ['Liver Cleanse', 'Nursing Support', 'Nutrient Rich', 'Bitters Salad']
  },



  'herb-34': {
    common_name: 'Crinum Lily (Trinh Nu Hoang Cung)',
    aliases: ['Crinum Latifolium', 'Royal Virgin Lily', 'Grand Crinum'],
    description: 'Imperial Vietnamese medicinal bulb celebrated for female reproductive vitality and prostate wellness. Broad sword-shaped foliage produces majestic fragrant trumpet-shaped floral clusters.',
    quick_answer: 'Needs a deep container and bright indirect to moderate sunlight. Dried leaf decoctions are traditionally consumed in regulated cycles for cellular protection.',
    growth_time: '3 - 4 months to yield robust, mature medicinal leaves',
    seasonality: {
      north: 'Prolific leaf growth in spring and summer; flowers in rainy months',
      central: 'Resilient in warm coastal balconies; shelter from typhoons',
      south: 'Perennial evergreen bulb producing large leaves all year',
      best_months: [3, 4, 5, 8, 9, 10]
    },
    medical_info: {
      uses: ['Botanical support for uterine fibroids and benign breast cysts', 'Supports prostate gland health and urinary flow in mature men', 'Enhances cellular immunity and resists irregular cell proliferation'],
      folk_remedies: [
        'Brew 10g dried leaves in 600ml water down to 300ml; divide into 3 daily doses after meals in 7-day cyclical regimens.',
        'Wilted fresh leaf wrapped over warm compress relieves localized inflammation.'
      ],
      preparation: ['Dried leaf water decoction', 'Standardized herbal syrup'],
      toxicity_warning: 'Ensure correct botanical identification (Crinum latifolium) to avoid mixing with toxic wild lilies. Not for pregnant women.',
      disclaimer: 'Renowned Vietnamese palace remedy extensively researched by modern clinical science.'
    },
    botanical_details: {
      family: 'Amaryllidaceae (Amaryllis Family)',
      native_range: 'Vietnam, India, Indochina',
      active_compounds: ['Crinine', 'Augustine', 'Pratosine', 'Glucan A', 'Alkaloids'],
      soil_ph: '6.0 - 7.0 (Rich porous loam with compost)',
      ideal_temp: '22°C - 35°C',
      pot_size: '35cm - 50cm deep pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Bulb Planting', instruction: 'Plant large bulb with top 1/3 protruding above the potting mix to prevent crown rot.' }
    ],
    faqs: [
      { question: 'Why is it called Royal Virgin Lily?', answer: 'In imperial dynasties, palace physicians reserved this precious herb exclusively to maintain health in court ladies.' }
    ],
    monetization_tips: ['Propagate certified pure-strain bulbs with authentication certificates.'],
    tags: ['Women Wellness', 'Prostate Care', 'Palace Legacy', 'Magnificent Bloom']
  },


  // ==========================================
  // BILINGUAL TRANSLATIONS FOR URBAN FRUIT PLANTS (MS3)
  // ==========================================
  'fruit-11': {
    common_name: 'Taiwan Sweet Mulberry F1',
    aliases: ['Long Fruit Mulberry', 'Sweet Container Mulberry', 'Tang Tham'],
    description: 'An extraordinary high-yielding long-fruit mulberry bred for compact balcony planters. Yields prolific finger-length berries with 18-20° Brix sweetness and zero sourness. Dark purple ripe fruit is loaded with anti-aging anthocyanin and resveratrol.',
    quick_answer: 'Taiwan Sweet Mulberry flourishes in a minimum 40L container with 6-8 hours of direct sun. Prune tips and strip old leaves after each harvest to trigger continuous flushes of sweet fruit all year.',
    growth_time: '4 - 5 months for the first prolific harvest of sweet berries',
    seasonality: {
      north: 'Plant in spring (Feb-Apr); prune for early summer berry flushes',
      central: 'Ensure quick drainage during severe tropical downpours',
      south: 'Perennial vigorous growth and continuous fruiting flushes all 12 months',
      best_months: [2, 3, 4, 9, 10],
      warning: 'Prevent root rot during prolonged monsoons by using perlite-rich substrate'
    },
    botanical_details: {
      family: 'Moraceae (Mulberry Family)',
      native_range: 'East Asia, fully adapted to tropical climates',
      active_compounds: ['Anthocyanins', 'Resveratrol', 'Vitamin C', 'Flavonoids'],
      soil_ph: '6.0 - 7.0 (Loose humus soil)',
      ideal_temp: '22°C - 35°C',
      pot_size: '40cm - 60cm wide container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Mix Rich Substrate', instruction: 'Combine 40% garden soil, 30% aged coco coir, 20% worm castings, and 10% perlite.' },
      { step: 2, title: 'Prune for Fruit Flush', instruction: 'When branches reach 50cm, tip-prune and strip 60% of foliage to wake latent fruiting buds in 10-14 days.' }
    ],
    faqs: [
      { question: 'Do I need two trees to cross-pollinate?', answer: 'No, Taiwan Sweet Mulberry is self-fertile via natural wind; a single pot will bear fruit profusely.' }
    ],
    monetization_tips: ['Propagate rooted stem cuttings for $2 - $3 each; craft artisanal fermented mulberry syrup jars.'],
    tags: ['Hyper Prolific', 'Anti-Aging', 'Easy Balcony Pot', 'Herbal Berry']
  },

  'fruit-12': {
    common_name: 'Four Seasons Bonsai Calamondin',
    aliases: ['Container Kumquat', 'Lucky Citrus Bonsai', 'Golden Tangerine'],
    description: 'The ultimate symbol of prosperity and vitality for city dwellings. Features fragrant white blossoms and golden juicy citrus fruit all four seasons. Rich in vitamin C and limonene for soothing winter throat ailments and zesty cooking.',
    quick_answer: 'Calamondin thrives in full sun with daily morning watering. Plant in well-draining rich loam amended with organic biochar. Blooms and sets golden fruit continuously throughout the year.',
    growth_time: 'Sets new fragrant blossom flushes every 3-4 months',
    seasonality: {
      north: 'Bears heavy golden fruit in Jan-Feb for Lunar New Year; prune in March',
      central: 'Water consistently during dry sunny spells',
      south: 'Produces continuous fruit flushes all 12 months',
      best_months: [1, 2, 3, 7, 8]
    },
    botanical_details: {
      family: 'Rutaceae (Citrus Family)',
      native_range: 'Southeast Asia and South Asia',
      active_compounds: ['Limonene', 'Citric Acid', 'Hesperidin', 'Vitamin C'],
      soil_ph: '5.5 - 6.5',
      ideal_temp: '20°C - 32°C',
      pot_size: '35cm - 50cm planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Organic Feeding', instruction: 'Apply worm castings or composted poultry manure every 20 days around pot perimeter.' }
    ],
    faqs: [
      { question: 'How to time heavy golden fruit for holiday display?', answer: 'Gently restrict water for 10 days in early summer to induce simultaneous blossom budding, then resume deep feeding.' }
    ],
    monetization_tips: ['Create desk-sized fruiting mini bonsai specimens selling for $25 - $60 each during festive seasons.'],
    tags: ['Wealth Symbol', 'Fragrant Blooms', 'Natural Cough Remedy', 'Patio Bonsai']
  },

  'fruit-13': {
    common_name: 'Southern Highbush Blueberry',
    aliases: ['Heat-Tolerant Blueberry', 'Tropical Balcony Blueberry'],
    description: 'An elite low-chill blueberry cultivar specially bred to flourish under intense tropical and subtropical heat. Yields plump, powdery-blue berry clusters with a refreshing sweet-tart flavor, ranking at the top of cognitive superfoods.',
    quick_answer: 'Southern Highbush Blueberries strictly require acidic soil (pH 4.5 - 5.2) composed of peat moss and perlite. Water with chlorine-free water and provide maximum bright sunlight on rooftop patios.',
    growth_time: '6 - 8 months to yield the first cluster of ripe blue berries',
    seasonality: {
      north: 'Flowers in late winter; berries ripen from April to June',
      central: 'Provide 30% afternoon shade cloth during scorching midsummer heat',
      south: 'Thrives year-round if roots are kept cool with organic pine bark mulch',
      best_months: [2, 3, 4, 10, 11]
    },
    botanical_details: {
      family: 'Ericaceae (Heath Family)',
      native_range: 'North America, bred for subtropical Asian performance',
      active_compounds: ['Anthocyanins', 'Pterostilbene', 'Polyphenols', 'Vitamin K'],
      soil_ph: '4.5 - 5.2 (Strictly acidic peat required)',
      ideal_temp: '18°C - 35°C',
      pot_size: '35cm - 50cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Acidic Potting Mix', instruction: 'Blend 60% Canadian peat moss with 30% perlite and 10% aged pine bark. Never add lime or alkaline compost.' }
    ],
    faqs: [
      { question: 'Why are leaves turning pale yellow with green veins?', answer: 'Iron chlorosis due to elevated pH. Apply diluted pine vinegar or organic sulfur to lower pH below 5.0 immediately.' }
    ],
    monetization_tips: ['Sell specialized acidic blueberry potting kit refills to city container growers.'],
    tags: ['Superfood', 'Antioxidant King', 'Acid Soil Plant', 'Blue Pearl']
  },

  'fruit-14': {
    common_name: 'Container Cantaloupe Melon',
    aliases: ['Sweet Honey Melon', 'Japanese Netted Melon', 'Kim Co Nuong'],
    description: 'The pinnacle of urban gardening satisfaction. In a single 20L container on a sunny balcony or rooftop, 75 days reward you with a magnificent netted melon bursting with honey-sweet orange flesh and irresistible aroma.',
    quick_answer: 'Container cantaloupes need fluffy potting mix, generous organic feeding, and early morning hand pollination (7am-9am). Retain only the single best-shaped fruit per vine to concentrate maximum sweetness.',
    growth_time: '65 - 75 days from seed germination to harvest',
    seasonality: {
      north: 'Crop 1: March-May; Crop 2: August-October',
      central: 'Plant Feb-August; avoid stormy typhoon season',
      south: 'Cultivate year-round; dry sunny months produce peak 15° Brix sweetness',
      best_months: [2, 3, 4, 8, 9]
    },
    botanical_details: {
      family: 'Cucurbitaceae (Gourd Family)',
      native_range: 'Southwest Asia and the Mediterranean',
      active_compounds: ['Beta-Carotene', 'Citrulline', 'Potassium', 'Vitamin A'],
      soil_ph: '6.0 - 6.8',
      ideal_temp: '25°C - 35°C',
      pot_size: '20L - 30L pot per vine'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Hand Pollination', instruction: 'Touch a freshly opened male blossom stamen directly onto the female flower stigma between 7am and 9am.' }
    ],
    faqs: [
      { question: 'When is the melon ready to pick?', answer: 'When netting fully surfaces, a fragrant sweet aroma wafts around the pot, and the stem collar shows fine radial cracks.' }
    ],
    monetization_tips: ['Supply premium gift-wrapped organic rooftop netted melons at $8 - $12 per melon.'],
    tags: ['75-Day Harvest', 'Honey Sweet', 'Rooftop Trophy', 'Net Melon']
  },

  'fruit-15': {
    common_name: 'Dwarf Red Papaya F1',
    aliases: ['Red Lady Dwarf Papaya', 'Container Papaya', 'Sweet Lady F1'],
    description: 'A remarkable dwarf papaya cultivar that sets heavy fruit just 40cm above the soil. Features stout wind-resistant stems perfect for windy apartment rooftops, yielding dozens of sweet, seedless, vibrant red-orange fruit annually.',
    quick_answer: 'Dwarf Red Papaya needs a deep 50L container or large cooler with multiple drainage holes, as roots dislike standing water. Requires full sun and organic potassium feeding for dense, candy-sweet fruit.',
    growth_time: '6 - 7 months from transplanting to ripe sweet harvest',
    seasonality: {
      north: 'Plant Feb-April to bypass winter cold snaps',
      central: 'Anchor containers against strong coastal storm gusts',
      south: 'Continuous harvest all 12 months in tropical warmth',
      best_months: [2, 3, 4, 8, 9]
    },
    botanical_details: {
      family: 'Caricaceae (Papaya Family)',
      native_range: 'Central America, now grown across all tropical zones',
      active_compounds: ['Papain enzyme', 'Lycopene', 'Vitamin C', 'Carotenoids'],
      soil_ph: '6.0 - 6.5',
      ideal_temp: '24°C - 33°C',
      pot_size: '50L - 80L large planter box'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Drainage Holes', instruction: 'Drill 8-10 perimeter drainage holes around the base of the planter to prevent root waterlogging.' }
    ],
    faqs: [
      { question: 'Can papaya grow in a styrofoam box?', answer: 'Yes, a standard large 60x40x40cm styrofoam box is the most economical container for dwarf papaya.' }
    ],
    monetization_tips: ['Sell organically ripened tree-sweetened red papayas to health-conscious condo neighbors.'],
    tags: ['Dwarf Heavy Bearer', 'Red Sweet Flesh', 'Papain Enzyme', 'Rooftop Planter']
  },

  // ==========================================
  // SPRINT 1: BALCONY FRUIT TREES (fruit-16 to fruit-20)
  // ==========================================

  'fruit-17': {
    common_name: 'Brazilian Cherry Grumixama (Cherry Brazil)',
    aliases: ['Eugenia Brasiliensis', 'Tropical Balcony Cherry', 'Grumixama'],
    description: 'An elite tropical cherry 100% adapted to hot Vietnamese climates with zero winter chill hours needed. A compact shrub adorned with white blossom flushes and abundant dark purple berries bursting with aristocratic sweetness.',
    quick_answer: 'Thrives in 50-60L balcony planters under blazing sunlight. Requires no winter dormancy, bearing hundreds of glossy sweet berries within 12 months.',
    growth_time: '1 year to the first sweet purple berry harvest',
    seasonality: {
      north: 'Spring blossoms; fruit ripens quickly in early summer',
      central: 'Easily tolerates 40°C+ on west-facing apartment balconies',
      south: 'Produces 2-3 prolific fruiting flushes each year',
      best_months: [3, 4, 5, 6, 7]
    },
    botanical_details: {
      family: 'Myrtaceae (Myrtle Family)',
      native_range: 'South America, thriving across tropical Southeast Asia',
      active_compounds: ['Anthocyanins', 'Vitamin C (20x orange)', 'Polyphenols', 'Quercetin'],
      soil_ph: '5.5 - 6.5',
      ideal_temp: '22°C - 38°C',
      pot_size: '50cm - 70cm planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Feed Organic Compost', instruction: 'Apply composted chicken manure or worm castings every 25 days to sustain rapid fruit swelling.' }
    ],
    faqs: [
      { question: 'Does it taste like temperate cherries?', answer: 'Yes, it offers a rich sweet flavor with subtle notes of plum and sweet cherry, juicy and intensely fragrant.' }
    ],
    monetization_tips: ['Supply fruiting 1-meter potted specimen trees at premium boutique prices.'],
    tags: ['Tropical Berry', 'Hyper Prolific', 'Anti-Aging', 'Sun Worshipper']
  },

  'fruit-18': {
    common_name: 'Southern Highbush Blueberry (Viet Quat Nhiet Doi)',
    aliases: ['Heat-Tolerant Blueberry', 'Vaccinium Darrowii', 'Tropical Balcony Blueberry'],
    description: 'A revolutionary low-chill blueberry variety developed specifically for warm tropical climates without winter freeze requirements. Compact bushes produce heavy clusters of plump blue-violet berries loaded with cognitive antioxidants.',
    quick_answer: 'Requires strictly acidic soil (pH 4.5 - 5.5) using peat moss and aged pine bark. Water with clean unchlorinated water and position in 5-6 hours of bright balcony sun.',
    growth_time: '6 - 8 months to harvest ripe blue berry clusters',
    seasonality: {
      north: 'Flourishes in spring; berry harvest peaks from April to August',
      central: 'Use 30% shade cloth during extreme midsummer heatwaves',
      south: 'Continuous berry production year-round with regular root moisture',
      best_months: [3, 4, 5, 6, 7, 8]
    },
    botanical_details: {
      family: 'Ericaceae (Heath Family)',
      native_range: 'North America, bred for Asian tropical performance',
      active_compounds: ['Anthocyanins', 'Resveratrol', 'Vitamin C', 'Organic Zinc'],
      soil_ph: '4.5 - 5.5 (Acidic substrate essential)',
      ideal_temp: '20°C - 36°C',
      pot_size: '40cm - 55cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Acidic Potting Mix', instruction: 'Combine 50% peat moss, 30% perlite, and 20% composted pine bark or spent coffee grounds.' }
    ],
    faqs: [
      { question: 'Why is acidic soil required?', answer: 'Blueberries have delicate fine root systems that only absorb iron and trace minerals in low pH environments below 5.5.' }
    ],
    monetization_tips: ['Sell fruiting blueberry container starter sets complete with acidic nutrient mixes.'],
    tags: ['Superfood', 'Brain Health', 'Antioxidant King', 'Acid Soil Plant']
  },

  'fruit-19': {
    common_name: 'Dwarf Urban Mulberry F1 (Dau Tam Lun)',
    aliases: ['Morus Alba var. Nana', 'Container Mulberry', 'Dwarf Taiwan Mulberry'],
    description: 'A specially bred dwarf mulberry cultivar tailored for compact balcony gardening. Staying at a manageable 70cm - 1m height, branches are laden with juicy finger-length berries that ripen from ruby-red to jet-black sweetness.',
    quick_answer: 'Incredibly easy to grow. Regular tip pruning triggers immediate flushes of new fruiting spurs. Keep in sunny balcony spots with daily watering for endless year-round berries.',
    growth_time: '2 - 3 months from rooted stem cutting to abundant fruit',
    seasonality: {
      north: 'Heavy crops from Feb to May; autumn prune for a second harvest',
      central: 'Flourishes vigorously across all seasons',
      south: 'Continuous four-season fruiting triggered by periodic pruning',
      best_months: [2, 3, 4, 5, 8, 9, 10]
    },
    botanical_details: {
      family: 'Moraceae (Mulberry Family)',
      native_range: 'East Asia, selected for ultra-compact heavy fruiting',
      active_compounds: ['Resveratrol', 'Anthocyanins', 'Vitamin C', 'Organic Iron', 'Fiber'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '20°C - 36°C',
      pot_size: '35cm - 50cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Prune for Berries', instruction: 'Snip top branch buds whenever stems reach 40cm to force lateral nodes into fruiting spurs.' }
    ],
    faqs: [
      { question: 'Can I grow this from cuttings?', answer: 'Yes! Semi-woody cuttings root with nearly 100% success in moist soil within 14 days.' }
    ],
    monetization_tips: ['Sell heavy-bearing fruiting balcony planters and organic mulberry elixir bottles.'],
    tags: ['Blood Nourishing', 'Hyper Prolific', 'Zero Maintenance', 'Sun Worshipper']
  },

  'fruit-20': {
    common_name: 'Red Flesh Balcony Dragon Fruit (Thanh Long Ruot Do)',
    aliases: ['Hylocereus Costaricensis', 'Container Red Pitaya', 'West-Facing Heat Shield'],
    description: 'The invincible green warrior for scorching west-facing balconies exceeding 42°C. Succulent cactus stems insulate walls from radiant heat, opening nocturnal fragrant white blossoms followed by deep ruby-red antioxidant fruit.',
    quick_answer: 'Plant in 40-50L containers against railings or posts. Withstands weeks of drought without flinching, yielding ruby-fleshed fruit brimming with anticancer betalains.',
    growth_time: '8 - 10 months to first fragrant nocturnal bloom and sweet fruit',
    seasonality: {
      north: 'Active summer flowering; keep dry during chilly winter rest',
      central: 'Master of hot winds and extreme summer droughts',
      south: 'Produces 4-5 prolific fruit cycles annually from May to November',
      best_months: [5, 6, 7, 8, 9, 10]
    },
    botanical_details: {
      family: 'Cactaceae (Cactus Family)',
      native_range: 'Central America, cultivated widely across Vietnam',
      active_compounds: ['Betalains', 'Prebiotic Fiber', 'Lycopene', 'Vitamin C', 'Iron'],
      soil_ph: '6.0 - 7.5 (Gritty soil amended with sand and biochar)',
      ideal_temp: '25°C - 42°C (Extreme heat tolerant)',
      pot_size: '40cm - 60cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Secure to Railing', instruction: 'Tie climbing cactus cladodes to balcony uprights to support the weight of heavy fruit.' }
    ],
    faqs: [
      { question: 'Why does urine turn reddish after eating?', answer: 'Natural betalain pigments pass harmlessly through the kidneys, confirming high antioxidant absorption.' }
    ],
    monetization_tips: ['Sell rooted heat-shield cuttings and decorative fruiting holiday specimens.'],
    tags: ['Drought Resilient', 'Extreme Heat Shield', 'Antioxidant King', 'Sweet Fruit']
  },

  // ==========================================
  // BILINGUAL TRANSLATIONS FOR ORNAMENTAL AIR-PURIFIERS (MS3)
  // ==========================================
  'orn-06': {
    common_name: 'Split-Leaf Tree Philodendron',
    aliases: ['Philodendron Bipinnatifidum', 'Hope Selloum', 'Tree Philodendron'],
    description: 'The majestic queen of deeply lobed tropical foliage. Features expansive, sculpted glossy green fronds that neutralize indoor radiation, reduce eye strain, and vigorously scrub airborne formaldehyde and VOCs.',
    quick_answer: 'Tree Philodendron flourishes in filtered indirect light or gentle morning sun. Water thoroughly when the top 3cm of soil dries out, and gently wipe broad leaves with a damp cloth to maximize photosynthesis.',
    growth_time: 'Maintains lush evergreen architectural beauty year-round',
    seasonality: {
      north: 'Thrives in warm humid seasons; shelter indoors during cold winters',
      central: 'Thrives in bright sheltered courtyards',
      south: 'Luxuriant growth year-round in bright shaded balconies',
      best_months: [3, 4, 5, 8, 9, 10]
    },
    botanical_details: {
      family: 'Araceae (Arum Family)',
      native_range: 'Tropical South American rainforests',
      active_compounds: ['Chlorophyll', 'Flavonoids', 'Air-Filtering Enzymes'],
      soil_ph: '5.5 - 6.5',
      ideal_temp: '18°C - 30°C',
      pot_size: '30cm - 45cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Wipe Foliage', instruction: 'Clean broad leaves monthly with a soft damp cloth to keep air-purifying pores clear of city dust.' }
    ],
    faqs: [
      { question: 'Why are leaf tips turning brown?', answer: 'Usually low ambient humidity or tap water fluoride. Mist surrounding air or switch to filtered water.' }
    ],
    monetization_tips: ['Propagate architectural specimen plants for upscale interior design staging.'],
    tags: ['Clean Air Champion', 'Tropical Luxury', 'Eye Comfort', 'Shade Lover']
  },

  'orn-07': {
    common_name: 'Fiddle-Leaf Fig (Bang Singapore)',
    aliases: ['Ficus Lyrata', 'Singapore Fig', 'Violin Leaf Fig'],
    description: 'The iconic darling of modern interior architecture. Showcases dramatic violin-shaped leathery leaves that command attention in living rooms and high-ceiling foyers while actively absorbing airborne toxins.',
    quick_answer: 'Fiddle-Leaf Figs crave consistent bright indirect sunlight and dislike being moved around. Water only when the top half of soil feels dry, and ensure zero standing water in the drip tray.',
    growth_time: 'Steadily produces 2-4 massive new glossy leaves every month in warm weather',
    seasonality: {
      north: 'Spring and summer produce dramatic growth flushes; rests in winter',
      central: 'Maintain in bright airy verandas',
      south: 'Flourishes vigorously year-round under bright skylights',
      best_months: [3, 4, 5, 6, 9, 10]
    },
    botanical_details: {
      family: 'Moraceae (Fig Family)',
      native_range: 'Lowland tropical rainforests of Western Africa',
      soil_ph: '6.0 - 7.0',
      ideal_temp: '18°C - 32°C',
      pot_size: '35cm - 50cm ceramic pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Rotate Container', instruction: 'Turn the pot 90 degrees every week so all sides receive balanced light and grow upright.' }
    ],
    faqs: [
      { question: 'Why is my Fiddle-Leaf dropping green leaves?', answer: 'Classic shock from sudden drafts, relocation, or overwatering. Keep in one bright spot and stabilize watering.' }
    ],
    monetization_tips: ['Sell mature trained single-trunk indoor tree specimens for $40 - $90.'],
    tags: ['Interior Icon', 'Sculptural Foliage', 'Modern Decor', 'Air Purifier']
  },

  'orn-08': {
    common_name: 'ZZ Plant (Kim Tien)',
    aliases: ['Zamioculcas Zamiifolia', 'Eternity Plant', 'Fortune Plant'],
    description: 'The ultimate indestructible houseplant. Waxy, mirror-gloss emerald leaflets emerge like wands from thick water-storing rhizomes. Symbolizes financial abundance, steady career prosperity, and serene resilience in low-light condos.',
    quick_answer: 'ZZ Plant tolerates extreme neglect, surviving weeks without water in dark office corners. Water once every 2-3 weeks only when bone-dry; overwatering is its sole vulnerability.',
    growth_time: 'Shoots up vigorous new lime-green spears in spring and summer',
    seasonality: {
      north: 'Evergreen all 12 months; drastically reduce water during cold damp winters',
      central: 'Ideal for indoor offices away from humid monsoons',
      south: 'Perennial hardy grower in ambient room temperatures',
      best_months: [1, 2, 3, 4, 10, 11]
    },
    botanical_details: {
      family: 'Araceae (Arum Family)',
      native_range: 'Drought-prone Eastern Africa (Kenya to South Africa)',
      soil_ph: '6.0 - 7.0',
      ideal_temp: '16°C - 32°C',
      pot_size: '25cm - 35cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Free Draining Soil', instruction: 'Use a succulent-grade potting mix amended with 30% perlite to protect bulbous rhizomes.' }
    ],
    faqs: [
      { question: 'Can ZZ Plant survive in rooms with no windows?', answer: 'Yes, it thrives comfortably under standard fluorescent or LED office lighting.' }
    ],
    monetization_tips: ['Divide rhizome clusters into feng-shui desktop arrangements for housewarming gifts.'],
    tags: ['Indestructible', 'Low Light Champion', 'Wealth Attractor', 'Neglect Tolerant']
  },

  'orn-09': {
    common_name: 'Variegated Golden Snake Plant',
    aliases: ['Sansevieria Trifasciata Laurentii', 'Mother-in-Law Tongue', 'Luoi Ho Vang'],
    description: 'NASA’s top-ranked bedroom air purifier. Rigid sword-shaped upright leaves bordered with brilliant gold bands absorb carbon dioxide and emit clean oxygen during nighttime hours via Crassulacean Acid Metabolism (CAM).',
    quick_answer: 'Snake Plants thrive on minimal care. Place in any lighting from full sun to dim bedroom corners. Water once a month in winter and every 10 days in summer when soil is completely dry.',
    growth_time: 'Produces fresh underground rhizome pup clusters every 2-3 months',
    seasonality: {
      north: 'Zero leaf drop even during chilly northern winters',
      central: 'Thrives in dry airy indoor living rooms',
      south: 'Vigorous year-round pup propagation',
      best_months: [1, 2, 3, 4, 5, 10]
    },
    botanical_details: {
      family: 'Asparagaceae (Asparagus Family)',
      native_range: 'Tropical West Africa from Nigeria east to the Congo',
      soil_ph: '6.0 - 7.5',
      ideal_temp: '15°C - 35°C',
      pot_size: '20cm - 30cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Separate Pups', instruction: 'Slice daughter rhizome offsets with a clean knife and repot into fresh sandy loam.' }
    ],
    faqs: [
      { question: 'Is it true Snake Plants release oxygen at night?', answer: 'Yes, through CAM photosynthesis, stomata open exclusively at night to absorb CO2 and release oxygen.' }
    ],
    monetization_tips: ['Sell paired bedroom clean-air planter sets with care warranty cards.'],
    tags: ['Night Oxygen', 'NASA Air Purifier', 'Bedroom Plant', 'Zero Effort']
  },

  'orn-10': {
    common_name: 'Hydroponic Peace Lily',
    aliases: ['Spathiphyllum Wallisii', 'White Flag Lily', 'Lan Y Thuy Canh'],
    description: 'An elegant air purifier famous for scrubbing acetone, benzene, and trichloroethylene. Pure white sail-like spathes rise gracefully above emerald foliage, growing cleanly in glass vessels of nutrient water without soil mess.',
    quick_answer: 'Hydroponic Peace Lilies require bright indirect light and clean dechlorinated water changed every 2 weeks. Add 2 drops of gentle hydroponic fertilizer monthly to trigger continuous white blooms.',
    growth_time: 'Produces striking white floral spathes every 6-8 weeks',
    seasonality: {
      north: 'Prefers warm room temperatures; keep away from icy winter draft windows',
      central: 'Flourishes indoors in coastal cities',
      south: 'Perennial year-round white blooms in air-conditioned apartments',
      best_months: [2, 3, 4, 9, 10, 11]
    },
    botanical_details: {
      family: 'Araceae (Arum Family)',
      native_range: 'Tropical Central and South America',
      soil_ph: 'Water pH 5.8 - 6.5',
      ideal_temp: '18°C - 28°C',
      pot_size: 'Clear glass hydroponic vase (20cm - 30cm)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Wash Roots Clean', instruction: 'Gently rinse all soil off roots under tepid running water before placing into clean glassware.' }
    ],
    faqs: [
      { question: 'Why are leaf tips drooping dramatically?', answer: 'Peace lilies are dramatic communicators. In water culture, ensure water level submerges 60% of roots; foliage perks back within 2 hours.' }
    ],
    monetization_tips: ['Create upscale hydroponic desk displays in Scandinavian-style glass decanters.'],
    tags: ['Hydroponic Clean', 'White Blossom', 'Formaldehyde Scrubber', 'Desktop Luxury']
  },

  'orn-11': {
    common_name: 'Burgundy Rubber Tree (Da Bup Do)',
    aliases: ['Ficus Elastica Burgundy', 'Black Prince Rubber Plant', 'Da Bup Do'],
    description: 'A striking ornamental tree boasting glossy deep burgundy-black leathery leaves. Young emerging leaves are sheathed in vibrant crimson caps, offering powerful feng-shui protection, grounding energy, and remarkable dust absorption.',
    quick_answer: 'Burgundy Rubber Plants thrive in bright, indirect sunlight which preserves their rich dark color. Water when the top half of soil feels dry, and prune tall stalks to encourage a bushy, branched canopy.',
    growth_time: 'Unfurls a fresh crimson-capped leaf every 10-14 days in warm weather',
    seasonality: {
      north: 'Rapid growth in spring and summer; holds thick foliage through winter',
      central: 'Ideal for bright balconies sheltered from monsoons',
      south: 'Year-round vigorous growth under bright balcony awnings',
      best_months: [2, 3, 4, 5, 8, 9]
    },
    botanical_details: {
      family: 'Moraceae (Fig Family)',
      native_range: 'Eastern South Asia and Southeast Asia',
      soil_ph: '6.0 - 7.0',
      ideal_temp: '18°C - 32°C',
      pot_size: '30cm - 45cm planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Notch for Branches', instruction: 'Make a shallow cut above a dormant node to stimulate lush lateral branches.' }
    ],
    faqs: [
      { question: 'Why are new leaves green instead of deep burgundy?', answer: 'Insufficient light. Move closer to a bright window to restore rich dark pigmentation.' }
    ],
    monetization_tips: ['Air-layer top branches to create rooted desktop rubber tree gifts.'],
    tags: ['Burgundy Drama', 'Feng Shui Shield', 'Dust Magnet', 'Hardy Foliage']
  },

  'orn-12': {
    common_name: 'China Doll Tree (Cay Hanh Phuc)',
    aliases: ['Radermachera Sinica', 'Emerald Tree', 'Happiness Tree'],
    description: 'The tree of joyful harmony and domestic bliss. Adorned with delicate, glossy emerald bipinnate leaves that form a dense, feathery canopy. Brings a tranquil forest ambiance into compact apartment living rooms.',
    quick_answer: 'China Doll Trees prefer bright, indirect sunlight and consistently moist but well-drained soil. They flourish when pruned lightly every couple of months to maintain a compact, bushy tree silhouette.',
    growth_time: 'Fast grower; dense emerald foliage flushes every 2-3 weeks',
    seasonality: {
      north: 'Lush spring flush; place in warm bright rooms in winter',
      central: 'Thrives in sheltered, humid verandas',
      south: 'Evergreen feathery canopy flourishing all 12 months',
      best_months: [2, 3, 4, 5, 9, 10]
    },
    botanical_details: {
      family: 'Bignoniaceae (Bignonia Family)',
      native_range: 'Subtropical mountainous regions of Southern China and Taiwan',
      soil_ph: '6.0 - 6.8',
      ideal_temp: '18°C - 28°C',
      pot_size: '25cm - 40cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Prune for Density', instruction: 'Snip leggy stems back by one-third to promote tight, lush emerald foliage.' }
    ],
    faqs: [
      { question: 'Why are leaves suddenly dropping when brought home?', answer: 'China Doll Trees react to sudden light changes. Keep in a consistent bright location and avoid drafts; new shoots emerge quickly.' }
    ],
    monetization_tips: ['Sell tabletop braided happiness bonsai trees for wedding and new home gifts.'],
    tags: ['Harmony Tree', 'Feathery Emerald', 'Living Room Bonsai', 'Air Cleanser']
  },

  'orn-13': {
    common_name: 'Chinese Evergreen (Ngoc Ngan)',
    aliases: ['Aglaonema Costatum', 'Valentine Plant', 'Silver Queen'],
    description: 'The romantic botanical token of pure love and career fortune. Oval leaves are artfully splashed with snowflake-white and creamy-ivory speckles across deep emerald borders. Extremely forgiving in low-light condo bedrooms.',
    quick_answer: 'Chinese Evergreen tolerates low ambient light and air-conditioned spaces easily. Water once a week when the soil surface is dry, and mist foliage occasionally to prevent dry tip edges.',
    growth_time: 'Sprouts fresh variegated cluster shoots continuously all year',
    seasonality: {
      north: 'Year-round indoor beauty; keep away from cold exterior windows in Dec-Jan',
      central: 'Thrives indoors without direct sun',
      south: 'Perennial lush variegation in room temperatures',
      best_months: [1, 2, 3, 4, 9, 10]
    },
    botanical_details: {
      family: 'Araceae (Arum Family)',
      native_range: 'Tropical rainforest floors of Southeast Asia',
      soil_ph: '5.5 - 6.5',
      ideal_temp: '18°C - 30°C',
      pot_size: '20cm - 30cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Divide Clumps', instruction: 'Separate rooted side shoots during spring repotting to multiply into new pots.' }
    ],
    faqs: [
      { question: 'Can Chinese Evergreen grow in water without soil?', answer: 'Yes, it adapts effortlessly to glass vase hydroponics with clean dechlorinated water.' }
    ],
    monetization_tips: ['Market paired Valentine desk arrangements with white ceramic pots.'],
    tags: ['Variegated Beauty', 'Pure Love Symbol', 'Condo Friendly', 'Low Light']
  },

  'orn-14': {
    common_name: 'Braided Money Tree (Kim Ngan Tam Tai)',
    aliases: ['Pachira Aquatica', 'Malabar Chestnut', 'Guiana Chestnut', 'Money Tree'],
    description: 'The quintessential symbol of wealth accumulation and harmonious fortune. Features five-fingered umbrella leaves representing the five natural elements (Metal, Wood, Water, Fire, Earth) atop an artfully braided three-stem trunk.',
    quick_answer: 'Money Trees store water in their swollen trunk bases and resent overwatering. Water thoroughly only when soil is completely dry (every 7-10 days). Place in bright, indirect light near entrance foyers.',
    growth_time: 'Unfurls fresh five-leafed emerald crowns continuously',
    seasonality: {
      north: 'Evergreen all year; minimize watering during cool damp winters',
      central: 'Ideal for indoor offices and living rooms',
      south: 'Lush canopy development year-round',
      best_months: [1, 2, 3, 4, 10, 11]
    },
    botanical_details: {
      family: 'Malvaceae (Mallow Family)',
      native_range: 'Central and South American wetlands',
      soil_ph: '6.0 - 7.0',
      ideal_temp: '18°C - 32°C',
      pot_size: '25cm - 40cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Keep Trunk Braided', instruction: 'Gently weave pliable young green stems as they grow upward to maintain the elegant braided trunk.' }
    ],
    faqs: [
      { question: 'Why is the trunk base feeling soft?', answer: 'Root and stem rot caused by chronic overwatering. Withhold water immediately and let soil aerate.' }
    ],
    monetization_tips: ['Supply braided fortune trees for business grand openings and corporate gifts.'],
    tags: ['Wealth Tree', 'Braided Trunk', 'Five Elements Balance', 'Feng Shui Essential']
  },

  'orn-15': {
    common_name: 'Lucky Bamboo (Truc Phu Quy)',
    aliases: ['Dracaena Sanderiana', 'Ribbon Dracaena', 'Water Bamboo'],
    description: 'An elegant Asian emblem of resilience, serene peace, and noble virtue. Slender segmented green stalks thrive in clear glass vases of water, unfurling delicate ribbon-like foliage that creates an instant Zen sanctuary on desks.',
    quick_answer: 'Lucky Bamboo in water culture is virtually effortless. Fill vase with clean filtered water, submerge roots, and refresh monthly. Add 2 drops of mild liquid fertilizer every month for rich green leaves.',
    growth_time: 'Roots vigorously in water within 10-14 days',
    seasonality: {
      north: 'Keep in warm interior rooms; avoid freezing window drafts in winter',
      central: 'Flourishes indoors in glass vases year-round',
      south: 'Perennial lush growth in room temperatures',
      best_months: [1, 2, 3, 4, 11, 12]
    },
    botanical_details: {
      family: 'Asparagaceae (Asparagus Family)',
      native_range: 'Central African rainforests',
      soil_ph: 'Water pH 6.0 - 6.5 (Clean dechlorinated water)',
      ideal_temp: '18°C - 30°C',
      pot_size: '25cm - 35cm tall glass vase'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Use Chlorine-Free Water', instruction: 'Let tap water stand for 24 hours before filling vases to let chlorine evaporate naturally.' }
    ],
    faqs: [
      { question: 'Why are stalks turning yellow from the bottom?', answer: 'Too much direct sunlight, chlorinated water, or excessive fertilizer. Switch to clean filtered water and indirect light.' }
    ],
    monetization_tips: ['Assemble tied red-ribbon lucky bamboo arrangements for Lunar New Year altars.'],
    tags: ['Zen Bamboo', 'Water Culture', 'Zero Soil', 'Prosperity Token']
  },

  // ==========================================
  // SPRINT 2 (BATCH 2): 15 NEW BOTANICAL ENCYCLOPEDIA ENTRIES
  // (herb-36 to herb-40, fruit-21 to fruit-25, orn-16 to orn-20)
  // ==========================================
  'herb-36': {
    common_name: 'Golden Eye-Grass (Sam Cau Do / Tien Mao)',
    aliases: ['Curculigo Orchioides', 'Black Musli', 'Kali Musli', 'Immortal Grass'],
    description: 'A prized indigenous Vietnamese tonic herb that warms kidney yang, dispels cold-dampness, strengthens tendons and bones, and boosts natural cellular immunity through curculigosides and triterpenoid saponins.',
    quick_answer: 'Features pleated palm-like leaves and bright yellow basal flowers. Thrives in 35-45cm deep balcony pots under dappled shade, yielding aromatic red-brown medicinal rhizomes after 10-12 months.',
    growth_time: '10 - 12 months to harvest mature medicinal rhizomes',
    seasonality: {
      north: 'Plant in spring (Feb-Apr); harvest mature tubers in late autumn to winter (Oct-Dec)',
      central: 'Grow under 40% shade netting or beneath larger balcony trees',
      south: 'Flourishes year-round on east-facing loggias',
      best_months: [2, 3, 4, 10, 11],
      warning: 'Avoid prolonged waterlogging to prevent basal tuber rot'
    },
    medical_info: {
      uses: ['Warms kidney yang and restores physical vitality', 'Dispels cold-dampness, relieving lower back pain, weak knees, and cold extremities', 'Modulates immunity and protects neural cells against oxidative stress'],
      folk_remedies: [
        'Soak 1kg fresh washed tubers overnight in thick rice-washing water to neutralize throat-irritating sap, slice and air-dry, then steep in 3L of 40% glutinous rice wine with 100ml wild honey for 90 days (15ml per meal).',
        'Decoct 10g golden-roasted Curculigo rhizome with 12g Epimedium and 12g Morinda officinalis to relieve cold lower back and knee ache.'
      ],
      preparation: ['Detoxify in rice-washing water before slicing and drying', 'Golden-roast for herbal decoction', 'Infuse in tonic rice wine'],
      toxicity_warning: 'Must be soaked thoroughly in rice-washing water before processing to remove irritating mucilage. Avoid high doses in individuals with yin-deficiency heat or dry mouth.',
      disclaimer: 'Warm-natured medicinal rhizome; use in accordance with traditional pharmacopoeia dosages.'
    },
    botanical_details: {
      family: 'Hypoxidaceae (Star-Grass Family)',
      native_range: 'Midland and mountainous regions of Northern Vietnam, Central Highlands, and South-Central Vietnam',
      active_compounds: ['Curculigoside A & B', 'Curculigine', 'Triterpenoid Saponins', 'Polysaccharides'],
      soil_ph: '5.5 - 6.8 (Rich, well-drained forest humus)',
      ideal_temp: '20°C - 32°C',
      pot_size: '35cm - 45cm deep container for vertical root development'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Deep Sandy Humus', instruction: 'Plant crowns in deep containers with 30% river sand and 40% leaf compost so tubers elongate straight down.' }
    ],
    faqs: [
      { question: 'Why soak tubers in rice water before drying?', answer: 'Rice water neutralizes calcium oxalate needles and acrid resins naturally present in raw tubers.' }
    ],
    monetization_tips: ['Propagate authentic highland seedlings and offer detoxified freeze-dried rhizome slices in glass jars.'],
    tags: ['Kidney Yang Tonic', 'Tendon Strength', 'Indigenous Ginseng', 'Dappled Shade']
  },

  'herb-37': {
    common_name: 'Vietnamese Poor Man’s Ginseng (Dang Sam Nam)',
    aliases: ['Codonopsis Javanica', 'Ngoc Linh Vine Ginseng', 'Campanumoea Javanica'],
    description: 'Revered as "Vietnamese Daily Ginseng", this graceful climbing vine bears delicate bell-shaped blossoms and sweet, aromatic tubers that replenish vital qi, fortify the spleen and lungs, and nourish blood.',
    quick_answer: 'A twining herbaceous vine ideal for 40cm deep pots with a balcony trellis. Harvest tender leaves for cooling soups after 4 months and sweet medicinal tubers after 12 months.',
    growth_time: '4 months for culinary leaves, 12 months for sweet ginseng tubers',
    seasonality: {
      north: 'Vigorous vine growth from spring through autumn; vines die back in winter to concentrate tuber energy',
      central: 'Prefers cool airy corners; provide shade cloth in peak summer',
      south: 'Grow on cool east-facing balconies with evening misting',
      best_months: [2, 3, 4, 9, 10]
    },
    medical_info: {
      uses: ['Replenishes central qi, strengthens digestion, and improves appetite and sleep', 'Promotes red blood cell production and relieves low blood pressure fatigue', 'Young leaves cooked in minced pork soup provide a cooling tonic for children and seniors'],
      folk_remedies: [
        'Steep 20g dried Codonopsis root, 10g goji berries, and 5 red dates in a 1L thermal flask for an all-day energy tea.',
        'Simmer 50g fresh tubers with black-bone chicken, lotus seeds, and Job’s tears for post-illness recovery.'
      ],
      preparation: ['Daily thermal flask herbal tea', 'Nourishing herbal chicken stew', 'Sun-dried and honey-roasted root slices'],
      toxicity_warning: 'Gentle and neutral in nature without raising blood pressure like red Panax ginseng. Do not combine with Veratrum (Le lo) in traditional formulas.',
      disclaimer: 'Official qi-tonifying botanical recorded in the Vietnamese Pharmacopoeia.'
    },
    botanical_details: {
      family: 'Campanulaceae (Bellflower Family)',
      native_range: 'Ngoc Linh highlands (Kon Tum, Quang Nam) and Northwestern Vietnam',
      active_compounds: ['Saponins', 'Tangshenoside', 'Polysaccharides', 'Inulin', '17 Amino Acids'],
      soil_ph: '5.5 - 6.5 (Loose humus with worm castings and charred rice husks)',
      ideal_temp: '16°C - 28°C',
      pot_size: '40cm - 50cm tall pot with A-frame trellis'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Trellis Support', instruction: 'Install a bamboo or wire trellis as soon as shoots reach 15cm so vines climb into filtered light.' }
    ],
    faqs: [
      { question: 'Can people with high blood pressure drink Codonopsis tea?', answer: 'Yes, unlike Korean Red Ginseng, Codonopsis javanica is mild and neutral, making it suitable for daily hydration.' }
    ],
    monetization_tips: ['Sell potted climbing ginseng vines and pre-packaged herbal chicken soup kits.'],
    tags: ['Qi & Blood Tonic', 'Ngoc Linh Herb', 'Balcony Climber', 'Edible Greens']
  },

  'herb-38': {
    common_name: 'Shiny Bush / Pepper Elder (Rau Cang Cua)',
    aliases: ['Peperomia Pellucida', 'SilverVein', 'Clearweed'],
    description: 'A crisp, translucent succulent herb with glossy heart-shaped leaves and tiny crab-claw flower spikes. Packed with bioavailable iron, potassium, magnesium, and natural anti-inflammatory compounds.',
    quick_answer: 'Thrives in cool, moist shade beneath larger fruit tree pots. Ready to harvest in just 25-30 days for tangy beef salads that cool the liver and help lower uric acid.',
    growth_time: '25 - 30 days to first harvest; self-seeds continuously',
    seasonality: {
      north: 'Most prolific from April to October during warm humid months',
      central: 'Grows year-round in shaded moist corners',
      south: 'Continuous year-round harvest with daily misting',
      best_months: [4, 5, 6, 7, 8, 9, 10]
    },
    medical_info: {
      uses: ['Helps excrete excess uric acid and soothes joint inflammation in gout sufferers', 'Clears heat, promotes diuresis, and relieves summer urinary discomfort', 'Provides plant-based iron and antioxidants with virtually zero calories'],
      folk_remedies: [
        'Toss 150g fresh washed Peperomia greens with olive oil, crispy garlic, and apple cider vinegar 3 times a week to cool the liver and support healthy uric acid levels.',
        'Crush fresh stems and leaves as a cooling poultice over minor burns or inflamed skin blemishes.'
      ],
      preparation: ['Fresh tangy salad with beef or boiled egg', 'Cooling green juice', 'Quick-simmered shrimp soup'],
      toxicity_warning: 'Completely non-toxic culinary green. Due to its cooling, high-water nature, eat in moderation if experiencing cold-stomach diarrhea.',
      disclaimer: 'Beloved functional salad green of Vietnamese home gardens.'
    },
    botanical_details: {
      family: 'Piperaceae (Pepper Family)',
      native_range: 'Tropical Americas, naturalized across moist shaded habitats in Vietnam',
      active_compounds: ['Pellucidin A', 'Patuloside A', 'Phytosterols', 'Organic Iron & Potassium', 'Vitamin C'],
      soil_ph: '6.0 - 7.0 (Moist humus-rich soil)',
      ideal_temp: '20°C - 30°C',
      pot_size: '15cm shallow tray or companion-planted under fruit tree containers'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Companion Underplanting', instruction: 'Scatter seeds on moist soil beneath guava, lemon, or pomelo pots to maximize balcony space.' }
    ],
    faqs: [
      { question: 'Why is it called Crab Claw herb?', answer: 'Its slender green flower spikes curve upward like miniature crab claws.' }
    ],
    monetization_tips: ['Grow zero-space companion crops under balcony fruit trees and sell fresh organic salad trays.'],
    tags: ['Iron Rich', 'Uric Acid Support', 'Companion Crop', 'Crisp Succulent']
  },

  'herb-39': {
    common_name: 'Stinking Passionflower / Bush Passionfruit (Lac Tien)',
    aliases: ['Passiflora Foetida', 'Wild Mossy Passionflower', 'Love-in-a-Mist'],
    description: 'Vietnam’s premier natural sedative and sleep-restoring botanical. A vigorous vine bearing lacy moss-bracted fruits, rich in harman alkaloids and vitexin flavonoids that calm anxious nerves and induce deep, restorative sleep.',
    quick_answer: 'Grows rapidly from seed or stem cuttings along sunny balcony railings. Boil tender shoot tips as a sweet vegetable or steep dried vines as an evening sleep tea 45 minutes before bed.',
    growth_time: '30 days to begin harvesting tender shoots and herbal vines',
    seasonality: {
      north: 'Explosive growth from March through October',
      central: 'Drought-resilient, flowering and fruiting year-round',
      south: 'Evergreen all 12 months; shoots surge after every rain',
      best_months: [3, 4, 5, 6, 7, 8, 9]
    },
    medical_info: {
      uses: ['Natural anxiolytic and sedative that relieves insomnia, restless dreams, and nervous exhaustion', 'Calms palpitations and stress-induced tachycardia', 'Clears liver heat when enjoyed as a traditional boiled green'],
      folk_remedies: [
        'Boil a handful of tender Passiflora shoots for dinner soup to promote effortless, unmedicated sleep.',
        'Classic Sleep Formula: Simmer 20g dried Passiflora foetida, 12g Erythrina leaves (La vong), 6g lotus plumule (Tam sen), and 10g mulberry leaves for evening consumption.'
      ],
      preparation: ['Boiled or soup-cooked tender shoots', 'Roasted dried vine herbal tea', 'Concentrated liquid herbal extract'],
      toxicity_warning: 'Only consume the fruit when fully ripe (golden-orange); unripe green fruits contain trace cyanogenic glycosides and should not be eaten raw.',
      disclaimer: 'Listed in the Ministry of Health’s Essential Traditional Medicines for insomnia relief.'
    },
    botanical_details: {
      family: 'Passifloraceae (Passionflower Family)',
      native_range: 'Tropical Americas, naturalized across all three regions of Vietnam',
      active_compounds: ['Passiflorin', 'Harman', 'Harmol', 'Harmine', 'Vitexin', 'Saponaretin'],
      soil_ph: '5.8 - 7.2 (Adaptable to most container soils)',
      ideal_temp: '22°C - 35°C',
      pot_size: '25cm - 35cm pot with railing trellis'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Railing Trellis', instruction: 'Guide main stems onto balcony railings and pinch shoot tips weekly for bushy lateral growth.' }
    ],
    faqs: [
      { question: 'Does it cause morning grogginess like sleeping pills?', answer: 'No, Passiflora foetida gently relaxes the nervous system so you wake up refreshed and clear-headed.' }
    ],
    monetization_tips: ['Craft artisanal sleep-support tea bags blending Passiflora, lotus heart, and jujube for office workers.'],
    tags: ['Insomnia Relief', 'Natural Sedative', 'Balcony Vine', 'Edible Shoots']
  },

  'herb-40': {
    common_name: 'Chinese Croton / Firestorm Shrub (Don La Do)',
    aliases: ['Excoecaria Cochinchinensis', 'Picara', 'Bicolor Red-Back Leaf'],
    description: 'A dual-purpose ornamental and dermatological herb featuring glossy emerald upper leaves and blazing crimson-purple undersides. Famous in Vietnamese herbal medicine for rapidly clearing hives, urticaria, allergies, and prickly heat.',
    quick_answer: 'A compact 60-90cm shrub that roots with 99% success from cuttings. Place in partial morning sun to intensify the ruby-red leaf undersides and maximize anti-allergic flavonoids.',
    growth_time: '35 days from stem cutting to first medicinal leaf harvest',
    seasonality: {
      north: 'Best leaf potency harvested from April to September in warm sun',
      central: 'Grown year-round as a colorful balcony border shrub',
      south: 'Vibrant emerald-and-crimson foliage all four seasons',
      best_months: [3, 4, 5, 6, 7, 8]
    },
    medical_info: {
      uses: ['Clears blood heat and resolves acute hives (urticaria), food allergies, and weather rashes', 'Relieves inflamed boils, atopic dermatitis, and children’s summer prickly heat', 'Golden-roasted leaf decoction soothes mild bacterial dysentery and diarrhea'],
      folk_remedies: [
        'Decoct 15g golden-roasted Excoecaria leaves with 10g honeysuckle flowers and 10g Xanthium fruit in 600ml water down to 200ml; drink twice daily to stop itching hives.',
        'Boil a handful of fresh leaves with a pinch of sea salt to prepare a soothing herbal bath for babies with prickly heat.'
      ],
      preparation: ['Golden-roasted leaf decoction', 'Soothing herbal bath wash'],
      toxicity_warning: 'Fresh stem latex can irritate eyes upon direct contact; always wash and boil or roast leaves before internal use. Avoid in individuals with bleeding disorders.',
      disclaimer: 'Traditional Vietnamese dermatological herb; ensure authentic identification.'
    },
    botanical_details: {
      family: 'Euphorbiaceae (Spurge Family)',
      native_range: 'Indigenous to Vietnam and mainland Southeast Asia',
      active_compounds: ['Flavonoids (1.5%)', 'Tannins', 'Coumarins', 'Polyphenols', 'Anthocyanins'],
      soil_ph: '5.5 - 6.8',
      ideal_temp: '20°C - 34°C',
      pot_size: '25cm - 35cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Morning Sun Exposure', instruction: 'Provide 3-4 hours of gentle morning sunlight so the lower leaf surface develops deep crimson anthocyanins.' }
    ],
    faqs: [
      { question: 'How to distinguish authentic Don La Do from ornamental crotons?', answer: 'Authentic Don La Do has opposite leaves with fine serrations, solid green tops, and uniform crimson-purple undersides without yellow spots.' }
    ],
    monetization_tips: ['Market Fire-element feng-shui pots and dried herbal baby-bath sachets with honeysuckle.'],
    tags: ['Hives & Allergy Relief', 'Blood Cooling', 'Crimson Foliage', 'Baby Bath Herb']
  },

  'fruit-21': {
    common_name: 'Australian Finger Lime (Chanh Ngon Tay Uc)',
    aliases: ['Citrus Australasica', 'Citrus Caviar', 'Caviar Lime'],
    description: 'Hailed by Michelin chefs as the "Caviar of the Plant Kingdom". Finger-shaped fruits split open to reveal hundreds of translucent, pearl-like juice vesicles that pop on the palate with an effervescent, herbal citrus burst.',
    quick_answer: 'A thorny micro-leaved shrub with a compact root system tailored for 35-45cm sunny balcony pots. Heat-resilient, pest-resistant, and commands the highest market value in the citrus family.',
    growth_time: '6 - 8 months from grafted sapling to first caviar fruit set',
    seasonality: {
      north: 'Main blossom flushes in spring (Mar-Apr) and autumn (Aug-Sep)',
      central: 'Vigorous grower; protect roots from typhoon waterlogging',
      south: 'Flowers and fruits year-round when given a 5-day light water stress',
      best_months: [3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Delivers 3x the Vitamin C and natural Folate of standard lemons', 'Essential oils and acidic pearls stimulate digestive enzymes and pair exquisitely with raw seafood', 'Rich in polyphenols and anthocyanins (in pink/red cultivars) that brighten skin'],
      folk_remedies: [
        'Spoon fresh finger lime pearls over oysters, sashimi, or sparkling water with wild honey for a liver-refreshing tonic.',
        'Steep halved finger limes in raw honey and fresh ginger slices to soothe sore throats.'
      ],
      preparation: ['Garnish directly onto fine-dining dishes', 'Craft sparkling mocktails and cocktails', 'Honey-citrus infusion'],
      toxicity_warning: 'Completely safe culinary fruit. Avoid consuming in excess on an empty stomach if prone to acute gastritis.',
      disclaimer: 'Ultra-premium gourmet citrus variety for modern urban container orchards.'
    },
    botanical_details: {
      family: 'Rutaceae (Citrus Family)',
      native_range: 'Subtropical rainforests of Eastern Australia, grafted for Vietnamese balconies',
      active_compounds: ['Citric Acid', 'Vitamin C', 'Limonene', 'Isocitric Acid', 'Anthocyanins'],
      soil_ph: '5.8 - 6.8 (Fast-draining mix with 20% perlite or pine bark)',
      ideal_temp: '20°C - 35°C',
      pot_size: '35cm - 45cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Porous Citrus Substrate', instruction: 'Blend loam with 20% perlite, 20% aged pine bark, and worm castings to prevent root suffocation.' }
    ],
    faqs: [
      { question: 'Why are Finger Limes so expensive?', answer: 'Slow compact growth and unique caviar-like vesicles that do not burst until chewed make them a prized luxury ingredient.' }
    ],
    monetization_tips: ['Supply fresh finger limes to upscale Japanese/European restaurants ($50-$80/kg) and sell grafted balcony trees.'],
    tags: ['Citrus Caviar', 'Gourmet Rarity', 'High Value', 'Balcony Citrus']
  },

  'fruit-22': {
    common_name: 'Dwarf Dien Pomelo in Pot (Buoi Dien Lun)',
    aliases: ['Citrus Maxima var. Dien', 'Hanoi Tet Bonsai Pomelo', 'Golden Heritage Pomelo'],
    description: 'Hanoi’s royal heirloom citrus miniaturized for urban rooftops. In spring, snow-white blossoms perfume the entire home; by Lunar New Year, golden lantern-like fruits ripen with honeyed, non-bitter shrimp-pink vesicles.',
    quick_answer: 'Choose air-layered or grafted dwarf trees in 50-65cm containers. Hand-pollinate blossoms with a soft brush in spring and feed organic potassium from autumn for intense sweetness.',
    growth_time: 'Blooms in Feb-Mar; golden fruit harvested for Lunar New Year',
    seasonality: {
      north: 'Fragrant blossoms in February; golden fruit ripens in Lunar November-December',
      central: 'Shield open blossoms from heavy unseasonal downpours',
      south: 'Fruits reliably on sunny rooftops with intoxicating floral fragrance',
      best_months: [1, 2, 3, 11, 12]
    },
    medical_info: {
      uses: ['Pulp rich in naringin helps lower blood lipids, reduce fatty liver, and support healthy metabolism', 'Pomelo blossoms distilled into neroli hydrosol calm nerves and scent tapioca starch', 'Peel decoctions stimulate thick hair growth and reduce postpartum hair loss'],
      folk_remedies: [
        'Simmer shredded pomelo peel with roasted soapberry (bo ket) and lemongrass for a traditional hair-strengthening wash.',
        'Candied pomelo peel simmered with rock sugar and honey relieves winter phlegm coughs.'
      ],
      preparation: ['Cure harvested fruit for 2 weeks until rind softens for peak sweetness', 'Pomelo blossom tea', 'Candied peel'],
      toxicity_warning: 'Contains furanocoumarins that may interact with statin or blood pressure medications; space consumption at least 2 hours apart from prescription drugs.',
      disclaimer: 'Iconic cultural and culinary heirloom of Northern Vietnam.'
    },
    botanical_details: {
      family: 'Rutaceae (Citrus Family)',
      native_range: 'Phu Dien Village (Tu Liem, Hanoi - Vietnam)',
      active_compounds: ['Naringin', 'Hesperidin', 'Vitamin C', 'Neroli Essential Oil', 'Pectin'],
      soil_ph: '5.5 - 6.5 (Alluvial loam mixed with composted manure and charred husk)',
      ideal_temp: '18°C - 32°C',
      pot_size: '50cm - 65cm (70L smart pot or ceramic planter)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Assisted Pollination', instruction: 'Dab pollen from freshly opened stamens onto the sticky stigma of strong blossoms on sunny mornings.' }
    ],
    faqs: [
      { question: 'Why is Dien Pomelo sweeter after storing for a few weeks?', answer: 'As the peel slightly wilts and loses moisture, starches convert into concentrated sugars without drying the pulp.' }
    ],
    monetization_tips: ['Rent or sell fruiting Tet bonsai pomelo pots ($60-$200) and harvest fresh spring blossoms for tea makers.'],
    tags: ['Fragrant Blossom', 'Tet Golden Fruit', 'Hanoi Heirloom', 'Lipid Support']
  },

  'fruit-23': {
    common_name: 'Sweet Purple Passionfruit (Chanh Leo Tim Ngot)',
    aliases: ['Passiflora Edulis', 'Da Lat Sweet Passionfruit', 'Granadilla'],
    description: 'The ultimate living heat-shield for sunny urban balconies and rooftops. Lush evergreen vines block up to 80% of solar radiation, unfurling intricate purple clock-like flowers followed by aromatic, honey-sweet purple fruit.',
    quick_answer: 'One grafted vine in a 40L planter covers 6-8m² of balcony cable trellis within 3 months. Pinch the main leader once it reaches the top wire to trigger dozens of fruiting secondary laterals.',
    growth_time: '4 - 5 months from grafted sapling to first sweet purple harvest',
    seasonality: {
      north: 'Plant in early spring (Feb-Mar); harvest continuously from summer through autumn',
      central: 'Provides exceptional balcony cooling during hot dry summer winds',
      south: 'Grows year-round; select heat-tolerant grafted cultivars for heavy fruit set',
      best_months: [2, 3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Boosts immunity and post-workout electrolyte recovery with high Vitamin C and Potassium', 'Piceatannol in passionfruit seeds protects skin collagen and improves insulin sensitivity', 'Natural floral esters calm the nervous system and promote restful sleep'],
      folk_remedies: [
        'Scoop 2 sweet purple passionfruits into warm water with 1 spoon of wild honey each morning for digestive cleansing and glowing skin.',
        'Simmer pulp with rock sugar to create concentrated passionfruit syrup for year-round refreshments.'
      ],
      preparation: ['Scoop and eat fresh with a spoon', 'Honey passionfruit cooler', 'Pastry & salad glaze'],
      toxicity_warning: 'Chew or blend seeds moderately; individuals with colonic diverticula should strain out whole hard seeds.',
      disclaimer: 'Dual-purpose green architecture vine that cools apartments and yields organic fruit.'
    },
    botanical_details: {
      family: 'Passifloraceae (Passionflower Family)',
      native_range: 'South America, widely cultivated in Vietnam’s Central Highlands and Northwest',
      active_compounds: ['Vitamin C', 'Beta-carotene', 'Polyphenols', 'Piceatannol', 'Potassium', 'Chrysin'],
      soil_ph: '5.5 - 6.8 (Rich, well-aerated organic soil)',
      ideal_temp: '18°C - 32°C',
      pot_size: '40L - 60L planter box with trellis net or wire cables'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Pinch Primary Leader', instruction: 'Snip the main vine tip once it reaches the trellis top to force vigorous fruiting side shoots.' }
    ],
    faqs: [
      { question: 'Can Sweet Purple Passionfruit be eaten raw without sugar?', answer: 'Yes, when the purple skin wrinkles slightly, acidity drops and sugar peaks for direct spoon enjoyment.' }
    ],
    monetization_tips: ['Sell disease-resistant grafted saplings and artisanal honey-fermented passionfruit jars.'],
    tags: ['Cooling Green Wall', 'Exotic Purple Bloom', 'Sweet Pulp', 'Vitamin C Power']
  },

  'fruit-24': {
    common_name: 'Vertical Trellis Mini Watermelon (Dua Hau Mini)',
    aliases: ['Citrullus Lanatus', 'Sugar Baby Watermelon', 'Pocket Balcony Melon'],
    description: 'Transform a compact balcony into a vertical wonderland with 1.2-1.8kg round Sugar Baby watermelons suspended in mesh hammocks. Ultra-thin rinds encase crisp, deep-red, sugar-sweet flesh kissed by high-rise sunshine.',
    quick_answer: 'Grow in a 25-30L pot and train vines vertically up a nylon trellis net. Hand-pollinate female flowers at nodes 12-16 between 7am-8am, and cradle swelling melons in mesh bags.',
    growth_time: '60 - 65 days from seed germination to sweet harvest',
    seasonality: {
      north: 'Spring-Summer crop (Feb-Jun) and Autumn crop (Aug-Nov)',
      central: 'Flourishes throughout the sunny season from February to August',
      south: 'Grown year-round; dry season crops achieve maximum Brix sweetness',
      best_months: [2, 3, 4, 5, 8, 9],
      warning: 'Reduce watering 4-5 days before harvest to concentrate sugars and prevent rind splitting'
    },
    medical_info: {
      uses: ['Replenishes hydration and electrolytes while supplying more heart-protective Lycopene than raw tomatoes', 'L-Citrulline in the white rind dilates blood vessels and relieves post-exercise muscle soreness', 'Clears summer heat and promotes gentle diuresis'],
      folk_remedies: [
        'Boil clean organic green peel and white rind (Xi Gua Pi) with corn silk to cool the kidneys and support healthy blood pressure.',
        'Blend chilled red flesh with fresh mint leaves to recover from summer heat exhaustion.'
      ],
      preparation: ['Chilled fresh wedges', 'Fresh pressed juice', 'Crisp pickled white rind salad or cooling rind tea'],
      toxicity_warning: 'Avoid eating large quantities of ice-cold watermelon late at night if prone to weak digestion.',
      disclaimer: 'An unforgettable farm-to-table educational project for children in city apartments.'
    },
    botanical_details: {
      family: 'Cucurbitaceae (Gourd Family)',
      native_range: 'Africa, bred into short-cycle F1 mini cultivars for urban vertical farming',
      active_compounds: ['Lycopene', 'L-Citrulline', 'Beta-carotene', 'Vitamins A & C', 'Potassium'],
      soil_ph: '6.0 - 6.8 (Loose mix with worm castings, charred rice husk, and agricultural lime)',
      ideal_temp: '24°C - 35°C',
      pot_size: '25L - 35L per vine (Minimum 30cm depth)'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Hammock Support', instruction: 'Slip a breathable nylon mesh sling under each melon once it reaches tennis-ball size and tie securely to the trellis.' }
    ],
    faqs: [
      { question: 'How many melons should I keep on one container vine?', answer: 'Keep 1 to 2 fruits per vine so the plant channels 100% of its photosynthates into making them intensely sweet.' }
    ],
    monetization_tips: ['Sell vertical balcony melon starter kits (seeds + mesh slings + organic fertilizer) and calligraphy-carved Tet mini melons.'],
    tags: ['60-Day Harvest', 'Vertical Trellis', 'Crisp Red Flesh', 'Kids Garden Project']
  },

  'fruit-25': {
    common_name: 'Golden Fragrant Persimmon Bonsai (Thi Vang Bonsai)',
    aliases: ['Diospyros Decandra', 'Fairy Tale Tam’s Fruit Tree', 'Aromatic Velvet Apple'],
    description: 'Brings the poetic nostalgia of Vietnamese folklore to urban balconies. Features rugged, charcoal-barked bonsai trunks, glossy evergreen leaves, and golden autumn fruits that perfumed entire apartments for weeks.',
    quick_answer: 'Select grafted dwarf "Thi Sap" bonsai trees (60-100cm tall). Exceptionally hardy, drought-tolerant in ceramic pots, and prized both as living sculpture and natural home aromatherapy.',
    growth_time: 'Blossoms in Mar-Apr; golden aromatic fruit ripens through autumn (Aug-Oct)',
    seasonality: {
      north: 'Golden fruit ripens in Lunar July-August in time for the Mid-Autumn Festival',
      central: 'Withstands intense sun and coastal winds; develops gnarled ancient bark',
      south: 'Evergreen year-round; apply light early-spring water stress to trigger floral buds',
      best_months: [3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Natural volatile esters from ripe golden skin calm the central nervous system, relieve tension headaches, and promote restful sleep', 'Fully ripened soft pulp gently nourishes the spleen and stomach', 'Traditional bark and root decoctions are used externally for skin allergies'],
      folk_remedies: [
        'Place 2-3 ripe golden fruits in a woven bamboo basket in the bedroom or study to naturally deodorize the air and soothe insomnia.',
        'Gently warm dried fruit peels as a subtle botanical incense to repel mosquitoes.'
      ],
      preparation: ['Display indoors for natural aromatherapy', 'Gently roll ripe fruit between palms until soft before savoring the sweet pulp'],
      toxicity_warning: 'Never eat unripe astringent fruit or consume on an empty stomach, as high tannins can coagulate stomach proteins and cause indigestion.',
      disclaimer: 'Sacred cultural heritage tree immortalized in Vietnam’s "Tam Cam" fairy tale.'
    },
    botanical_details: {
      family: 'Ebenaceae (Ebony / Persimmon Family)',
      native_range: 'Indigenous to Vietnam, iconic in ancient pagodas and village courtyards',
      active_compounds: ['Natural Aromatic Esters', 'Tannins', 'Flavonoids', 'Betulinic Acid', 'Vitamins A & C'],
      soil_ph: '5.5 - 7.0 (Sandy loam mixed with crushed cinder and worm castings)',
      ideal_temp: '18°C - 35°C',
      pot_size: '35cm - 55cm ceramic bonsai pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Wire & Shape Canopy', instruction: 'Use anodized aluminum bonsai wire in late autumn to shape horizontal cloud pads.' }
    ],
    faqs: [
      { question: 'Can a potted bonsai Thi tree really bear fruit on a balcony?', answer: 'Yes! Grafted branches from mature mother trees flower and set fragrant golden fruit even at 60cm height.' }
    ],
    monetization_tips: ['Craft fruiting heritage bonsai specimens ($60-$350) and sell mini golden fruits in hand-knitted Mid-Autumn pouches.'],
    tags: ['Folklore Aroma', 'Heritage Bonsai', 'Golden Autumn Fruit', 'Natural Aromatherapy']
  },

  'orn-16': {
    common_name: 'Swiss Cheese Plant (Trau Ba Nam My Monstera)',
    aliases: ['Monstera Deliciosa', 'Monstera King', 'Split-Leaf Monster'],
    description: 'The undisputed king of contemporary Urban Jungle interiors. Giant heart-shaped emerald leaves develop dramatic natural clefts and perforations (fenestrations), acting as living botanical sculpture while scrubbing indoor formaldehyde.',
    quick_answer: 'Monstera thrives in bright indirect light near large windows. Plant in chunky Aroid mix (pine bark + perlite + coco chunks + worm castings) with a moss pole for aerial roots to climb.',
    growth_time: 'Unfurls 1-2 larger, more fenestrated leaves every month',
    seasonality: {
      north: 'Peak growth from March to October; keep in warm rooms during winter',
      central: 'Shield from scorching midday sun to prevent leaf scorch',
      south: 'Unfurls giant perforated leaves year-round',
      best_months: [3, 4, 5, 6, 8, 9]
    },
    botanical_details: {
      family: 'Araceae (Arum Family)',
      native_range: 'Tropical rainforests from Southern Mexico to Panama',
      active_compounds: ['Dense Chlorophyll', 'Flavonoids'],
      soil_ph: '5.5 - 6.8 (Chunky, airy Aroid substrate)',
      ideal_temp: '18°C - 30°C',
      pot_size: '30cm - 45cm pot with sphagnum moss pole'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Chunky Aroid Mix', instruction: 'Blend 30% treated pine bark, 30% perlite/pumice, 20% coco chunks, and 20% worm castings for zero root rot.' },
      { step: 2, title: 'Attach to Moss Pole', instruction: 'Secure the back of the stem against a moist moss pole so aerial roots anchor and trigger giant mature leaves.' },
      { step: 3, title: 'Polish Leaves', instruction: 'Wipe broad leaves biweekly with a damp microfiber cloth to keep stomata open for air purification.' }
    ],
    faqs: [
      { question: 'Why aren’t my Monstera’s new leaves splitting?', answer: 'Lack of bright indirect light or juvenile age. Move closer to a bright window and give aerial roots a vertical pole to climb.' }
    ],
    monetization_tips: ['Propagate single-node stem cuttings in sphagnum moss and sell mature double-fenestrated statement plants.'],
    tags: ['Foliage King', 'Fenestrated Leaf', 'Urban Jungle', 'Formaldehyde Scrubber']
  },

  'orn-17': {
    common_name: 'China Doll / Happiness Tree (Cay Hanh Phuc)',
    aliases: ['Radermachera Sinica', 'Emerald Tree', 'Serpent Tree'],
    description: 'An indoor hardwood tree radiating feng-shui warmth, family togetherness, and domestic bliss. Hundreds of glossy emerald heart-shaped leaflets interlace into a lush, rounded canopy brimming with vitality.',
    quick_answer: 'Prefers airy living rooms with soft natural light. Water 2-3 times weekly to keep soil lightly moist and mist the emerald crown in the morning for jewel-like shine.',
    growth_time: 'Develops a dense, multi-tiered emerald canopy year-round',
    seasonality: {
      north: 'Evergreen indoors all four seasons; protect from freezing winter drafts',
      central: 'Ideal for cool living rooms or covered verandas',
      south: 'Flourishes in apartments and air-conditioned offices',
      best_months: [2, 3, 4, 8, 9, 10]
    },
    botanical_details: {
      family: 'Bignoniaceae (Trumpet Vine Family)',
      native_range: 'Subtropical highlands of Southern China and Northern Indochina',
      active_compounds: ['Mild antibacterial phytoncides', 'Chlorophyll'],
      soil_ph: '6.0 - 7.0 (Loose humus-rich loam)',
      ideal_temp: '18°C - 28°C (Thrives in air-conditioned rooms)',
      pot_size: '18cm desktop pot or 35cm - 45cm floor planter'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Airy Placement', instruction: 'Position near a living room sofa 1-2m from a window, away from direct air-conditioner vents.' },
      { step: 2, title: 'Shape the Crown', instruction: 'Lightly trim leggy shoots every 2 months to encourage dense lateral budding.' }
    ],
    faqs: [
      { question: 'Why does the Happiness Tree drop leaflets in closed rooms?', answer: 'It craves fresh air circulation and gentle morning light. Open windows weekly or give it 1-2 mornings of soft balcony sun.' }
    ],
    monetization_tips: ['Pot in premium ceramic planters as housewarming and wedding anniversary gifts ($15-$50).'],
    tags: ['Family Bliss', 'Housewarming Gift', 'Glossy Emerald', 'Luxury Interior']
  },

  'orn-18': {
    common_name: 'Song of India (Truc Bach Hop Vien Vang)',
    aliases: ['Dracaena Reflexa Variegata', 'Pleomele Reflexa', 'Golden-Edged Dracaena'],
    description: 'Honored by NASA as a top botanical scrubber of Trichloroethylene, Xylene, and Formaldehyde. Whorls of emerald leaves edged in luminous gold spiral around sculptural woody stems, symbolizing enduring prosperity.',
    quick_answer: 'Exceptionally resilient in both air-conditioned offices and dappled balconies. Water 1-2 times weekly when top soil dries; brighter indirect light intensifies the golden leaf margins.',
    growth_time: 'Long-lived woody shrub thriving over 10 years in containers',
    seasonality: {
      north: 'Evergreen year-round with better cold tolerance than most tropical foliage',
      central: 'Perfect for lobbies, porches, and covered balconies',
      south: 'Radiant golden-green foliage all 12 months',
      best_months: [1, 2, 3, 4, 9, 10]
    },
    botanical_details: {
      family: 'Asparagaceae (Asparagus Family)',
      native_range: 'Tropical Indian Ocean islands (Madagascar, Mauritius)',
      active_compounds: ['Botanical Saponins', 'Lutein', 'Chlorophyll'],
      soil_ph: '6.0 - 6.8 (Well-draining mix with coco coir and perlite)',
      ideal_temp: '18°C - 32°C',
      pot_size: '25cm - 40cm container'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Use Dechlorinated Water', instruction: 'Let tap water sit overnight before watering so chlorine and fluoride do not brown leaf tips.' },
      { step: 2, title: 'Top-Cut Propagation', instruction: 'Root 20cm top cuttings in moist soil or water; the mother stem will sprout 2-3 new side branches.' }
    ],
    faqs: [
      { question: 'Which feng-shui elements match Song of India?', answer: 'Its emerald-and-gold foliage harmonizes with Metal, Water, and Wood elements to attract career fortune.' }
    ],
    monetization_tips: ['Lease or sell 3-tiered lobby planters to offices and propagate desktop cuttings.'],
    tags: ['NASA Air Purifier', 'Golden Margin', '10-Year Hardy', 'Prosperity Feng Shui']
  },

  'orn-19': {
    common_name: 'Dwarf Buddhist Pine Bonsai (Tung Bong Lai)',
    aliases: ['Podocarpus Macrophyllus var. Maki', 'Fern Pine', 'Southern Yew Bonsai'],
    description: 'Captures the serene majesty of misty mountain peaks in a tabletop ceramic tray. Soft, deep-green needle pads arranged like floating clouds atop rock-clasping roots embody noble perseverance and longevity.',
    quick_answer: 'One of the few true conifers that thrives both on bright indoor desks and balconies. Features strong drought-tolerant roots; water when surface soil dries and mist the foliage pads.',
    growth_time: 'Lives for decades, gaining timeless bonsai character each year',
    seasonality: {
      north: 'Four-season evergreen that never drops needles even in winter frost',
      central: 'Withstands wind and partial sun with remarkable resilience',
      south: 'Pushes jade-green young needle flushes year-round',
      best_months: [1, 2, 3, 4, 9, 10, 11, 12]
    },
    botanical_details: {
      family: 'Podocarpaceae (Podocarp Conifer Family)',
      native_range: 'East Asia, dwarf Bong Lai cultivar adapted for Vietnamese bonsai trays',
      active_compounds: ['Air-cleansing Phytoncides', 'Pinene'],
      soil_ph: '5.5 - 6.5 (Bonsai mix: Akadama + Pumice + fired loam)',
      ideal_temp: '15°C - 32°C',
      pot_size: '15cm - 30cm Yixing clay or crackle-glaze bonsai tray'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Penjing Rock Scaping', instruction: 'Pair with miniature limestone peaks, velvet moss, and ceramic figurines on a tea-table tray.' },
      { step: 2, title: 'Cloud Pad Trimming', instruction: 'Shear upward shoots every 3 months to maintain flat, cloud-like foliage tiers.' }
    ],
    faqs: [
      { question: 'Does a desktop Buddhist Pine need outdoor sun?', answer: 'It adapts well to bright rooms, and giving it 1-2 mornings of gentle window sun each weekend keeps new shoots lush and compact.' }
    ],
    monetization_tips: ['Design rock-clasping Tùng Bồng Lai penjing trays on Bat Trang ceramics ($12-$40) as executive gifts.'],
    tags: ['Tea Table Bonsai', 'Longevity Symbol', 'Noble Conifer', 'Zen Penjing']
  },

  'orn-20': {
    common_name: 'Apple-Green Prayer Plant (Duoi Cong Tao Xanh)',
    aliases: ['Calathea Orbifolia', 'Peacock Prayer Plant', 'Silver-Striped Calathea'],
    description: 'The queen of living botanical art, showcasing wide, round leaves brushed with alternating strokes of metallic silver and apple green like a peacock fan. At nightfall, leaves fold upward in a tranquil prayer motion.',
    quick_answer: '100% Pet-Safe (non-toxic to cats, dogs, and babies). Flourishes in cool indoor shade with high ambient humidity and evenly moist, airy potting mix.',
    growth_time: 'Produces rolled flute-like new leaves from underground rhizomes',
    seasonality: {
      north: 'Peak beauty from spring to autumn; place near a humidifier during dry winter months',
      central: 'Keep in cool indoor rooms away from hot dry winds',
      south: 'Thrives year-round in living rooms and bedrooms',
      best_months: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    botanical_details: {
      family: 'Marantaceae (Arrowroot / Prayer Plant Family)',
      native_range: 'Tropical rainforests of Bolivia (South America)',
      active_compounds: ['Zero Calcium Oxalate crystals (100% ASPCA Pet-Safe)'],
      soil_ph: '6.0 - 6.5 (Moisture-retentive airy mix: Coco coir + Perlite + Worm castings + Fine bark)',
      ideal_temp: '18°C - 27°C',
      pot_size: '20cm - 30cm pot'
    },
    how_to_grow_steps: [
      { step: 1, title: 'Water with Filtered or Rain Water', instruction: 'Delicate Calathea leaves are sensitive to tap water salts; RO filtered water keeps leaf edges pristine green.' },
      { step: 2, title: 'Pebble Humidity Tray', instruction: 'Set the pot atop a tray of wet pebbles (above the water line) to bathe large leaves in gentle humidity.' }
    ],
    faqs: [
      { question: 'Is Calathea Orbifolia safe for homes with cats and toddlers?', answer: '100% safe! Unlike Araceae plants, the Marantaceae family is certified non-toxic to pets and children by the ASPCA.' }
    ],
    monetization_tips: ['Divide rhizome clumps into Nordic white ceramic pots for pet-friendly apartments and design studios ($8-$20).'],
    tags: ['100% Pet Safe', 'Night Prayer Motion', 'Silver Peacock Stripes', 'Nordic Interior']
  }
};

/**
 * Hàm địa phương hóa dữ liệu cây trồng:
 * - Khi lang === 'en': Thay thế toàn bộ dữ liệu văn bản bằng tiếng Anh chuẩn.
 * - Khi lang === 'vi': Giữ nguyên dữ liệu tiếng Việt gốc.
 */
export function localizePlant(plant: Plant, lang: 'vi' | 'en'): Plant {
  if (lang === 'vi') return plant;

  // 1. Kiểm tra nếu cây có dữ liệu dịch tự động ngầm từ Database MySQL
  const dbEn = typeof plant.translations_en === 'string'
    ? (() => { try { return JSON.parse(plant.translations_en); } catch { return null; } })()
    : plant.translations_en;

  if (dbEn && typeof dbEn === 'object') {
    return {
      ...plant,
      common_name: plant.common_name_en || dbEn.common_name || plant.scientific_name,
      description: plant.description_en || dbEn.description || plant.description,
      quick_answer: dbEn.quick_answer || plant.quick_answer,
      growth_time: dbEn.growth_time || plant.growth_time,
      medical_info: dbEn.medical_info ? { ...plant.medical_info, ...dbEn.medical_info } : plant.medical_info,
      how_to_grow_steps: dbEn.how_to_grow_steps || plant.how_to_grow_steps,
      faqs: dbEn.faqs || plant.faqs,
      monetization_tips: dbEn.monetization_tips || plant.monetization_tips,
      tags: dbEn.tags || plant.tags,
    };
  }

  // 2. Kiểm tra từ điển cây hạt giống có sẵn
  const enData = PLANT_ENGLISH_MAP[plant.id];
  if (!enData) {
    // Nếu không có bản dịch cụ thể, dùng tên tiếng Anh trong DB hoặc tên khoa học quốc tế
    return {
      ...plant,
      common_name: plant.common_name_en || plant.scientific_name,
      description: plant.description_en || plant.description,
    };
  }

  return {
    ...plant,
    common_name: enData.common_name,
    aliases: enData.aliases,
    description: enData.description,
    quick_answer: enData.quick_answer || plant.quick_answer,
    growth_time: enData.growth_time,
    seasonality: enData.seasonality
      ? {
          ...plant.seasonality,
          ...enData.seasonality,
        }
      : plant.seasonality,
    medical_info: enData.medical_info
      ? {
          ...plant.medical_info,
          ...enData.medical_info,
        }
      : plant.medical_info,
    botanical_details: enData.botanical_details
      ? {
          ...plant.botanical_details,
          ...enData.botanical_details,
        }
      : plant.botanical_details,
    how_to_grow_steps: enData.how_to_grow_steps || plant.how_to_grow_steps,
    faqs: enData.faqs || plant.faqs,
    monetization_tips: enData.monetization_tips || plant.monetization_tips,
    tags: enData.tags || plant.tags,
  };
}
