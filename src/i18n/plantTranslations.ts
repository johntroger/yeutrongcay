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
