import { ClinicQuestion, SwapOffer } from '../types/index.ts';

export const CLINIC_ENGLISH_MAP: Record<string, Partial<ClinicQuestion>> = {
  'case-01': {
    title: '50L potted guava tree infested with white powdery pests under leaves and dropping young buds',
    description: 'I cultivate this tree in a 50L pot on an intense sunny rooftop. Recently, small white powdery bugs have coated leaf undersides, black ants are congregating near shoot tips, and young fruit buds are turning black and dropping.',
    plant_name_hint: 'Taiwan Guava',
    symptoms: ['White cottony mealybugs on stem', 'Premature flower/fruit drop'],
    ai_instant_diagnosis: 'Preliminary AI Diagnosis (Southern Region): 95% likelihood of mealybug infestation (Pseudococcidae) living symbiotically with black ants. The pests deplete sap from tender shoots, triggering blossom drop. Rapid organic intervention: Spray a solution of organic castile soap or 70% rubbing alcohol directly onto pest colonies in late afternoon; rinse foliage with clean water the following morning.',
    answers: [
      {
        id: 'ans-101',
        question_id: 'case-01',
        author_name: 'Agronomist Lam',
        author_badge: 'Master Orchardist',
        content: 'Crush 1 garlic bulb + 3 hot chili peppers + 1 ginger piece and macerate in 1 liter of clear grain alcohol for 2 days. Filter the liquid and dilute 1:20 in water with 1 drop of mild eco soap. Spray twice 3 days apart; mealybugs will be eliminated safely without chemical residues!',
        upvotes: 18,
        created_at: '2 hours ago',
        is_verified: true,
      },
      {
        id: 'ans-102',
        question_id: 'case-01',
        author_name: 'Minh Thao (District 7)',
        author_badge: 'Active Member',
        content: 'Remember to dust a ring of agricultural lime around the container rim to prevent black ants from carrying new mealybugs up from the patio floor!',
        upvotes: 7,
        created_at: '1 hour ago',
      }
    ],
    created_at: '3 hours ago',
  },

  'case-02': {
    title: 'Freshly rooted Ming Aralia cutting wilting with yellow base leaves despite waterlogged soil',
    description: 'I planted fresh stem cuttings into heavy garden soil mixed with manure, watering thoroughly twice a day. After one week, the lower leaves turned bright yellow and the buried stem section is blackened with a rot odor.',
    plant_name_hint: 'Small-Leaf Ming Aralia',
    symptoms: ['Wilted leaves despite moist soil', 'Yellow leaves with brown rot'],
    ai_instant_diagnosis: 'Preliminary AI Diagnosis (Northern Region): Black stem collar rot caused by waterlogging (Pythium fungal pathogen). Heavy soil compacted oxygen flow, and overwatering suffocated root emergence. Action: Unpot cutting, trim away black rotting tissue, sanitize in diluted lime water, and re-strike into coarse coco peat and perlite.',
    answers: [
      {
        id: 'ans-201',
        question_id: 'case-02',
        author_name: 'Traditional Herbalist Cuong',
        author_badge: 'Herbal Medicine Specialist',
        content: 'A classic mistake during cutting propagation is using manured garden soil. Unrooted cuttings should never receive fertilizer. Strike cuttings into clean moist construction sand or sphagnum moss in bright shade; fresh white rootlets will burst out within 20 days!',
        upvotes: 24,
        created_at: '5 hours ago',
        is_verified: true,
      }
    ],
    created_at: '6 hours ago',
  }
};

export const SWAP_ENGLISH_MAP: Record<string, Partial<SwapOffer>> = {
  'swap-01': {
    location_name: 'Hanoi - Cau Giay District (Near Nghia Do Park)',
    plant_name: 'Indian Borage & Magenta Plant Rooted Cuttings',
    scientific_name: 'Plectranthus amboinicus & Peristrophe bivalvis',
    item_type: 'Vigorous rooted stem cuttings',
    description: 'Pruning my autumn balcony garden and have around 30 juicy Indian borage cuttings and a dozen magenta plant roots. Free giveaway to anyone building a home herbal pharmacy.',
    contact_note: 'Pickup after 5 PM or send a message via garden chat',
    created_at: 'Today, 08:30',
  },
  'swap-02': {
    location_name: 'Ho Chi Minh City - Thu Duc City (Hiep Binh Chanh)',
    plant_name: 'Taiwan Guava Layered Cutting (Flowering)',
    scientific_name: 'Psidium guajava',
    item_type: 'Potted seedling in 5L grow bag',
    description: 'Air-layered from my mother tree with sweet crisp fruit. Plant is 60cm tall with dense white roots. Looking to exchange for a patio dwarf ambarella or sweet starfruit.',
    contact_note: 'Swap meetup at Gigamall Pham Van Dong gate on weekends',
    created_at: 'Yesterday, 15:45',
  },
  'swap-03': {
    location_name: 'Da Nang - Hai Chau District (September 2nd Street)',
    plant_name: 'Wild Forest Bitter Gourd & Winged Bean Heirloom Seeds',
    scientific_name: 'Momordica charantia var. muricata',
    item_type: 'Naturally sun-dried seeds',
    description: 'Freshly harvested batch of heirloom seeds with over 90% germination rate. Sharing 20 small seed packets (15 seeds each) for central region gardeners to green their balcony trellises.',
    contact_note: 'Postal shipping available for distant gardeners, recipient covers small postage',
    created_at: '2 days ago',
  },
  'swap-04': {
    location_name: 'Can Tho - Ninh Kieu District (Mau Than Embankment)',
    plant_name: 'Clinacanthus Nutans (Snake Grass) & Ming Aralia Seedlings',
    scientific_name: 'Clinacanthus nutans',
    item_type: 'Potted young seedlings',
    description: 'Medicinal garden nursery with rooted snake grass and fragrant ming aralia. Giving away to families needing herbal joint comfort or liver cooling support.',
    contact_note: 'Saturday morning pickup at Mau Than river walkway',
    created_at: '3 days ago',
  },
  'swap-05': {
    location_name: 'Ho Chi Minh City - Binh Thanh District (Thanh Da Area)',
    plant_name: 'Premna Serratifolia & Small-leaf Ming Aralia',
    scientific_name: 'Premna serratifolia',
    item_type: 'Potted nursery cuttings',
    description: 'Thanh Da ecological garden has 15 nursery pots of culinary Premna and Ming Aralia to spare. Looking to exchange for wild bird\'s eye chili or large-leaf moringa.',
    contact_note: 'Morning exchanges with complimentary lotus tea',
    created_at: '4 days ago',
  }
};

export function localizeClinicQuestion(q: ClinicQuestion, lang: 'vi' | 'en'): ClinicQuestion {
  if (lang === 'vi') return q;
  const enData = CLINIC_ENGLISH_MAP[q.id];
  if (!enData) return q;
  return {
    ...q,
    title: enData.title || q.title,
    description: enData.description || q.description,
    plant_name_hint: enData.plant_name_hint || q.plant_name_hint,
    symptoms: enData.symptoms || q.symptoms,
    ai_instant_diagnosis: enData.ai_instant_diagnosis || q.ai_instant_diagnosis,
    answers: enData.answers || q.answers,
    created_at: enData.created_at || q.created_at,
  };
}

export function localizeSwapOffer(offer: SwapOffer, lang: 'vi' | 'en'): SwapOffer {
  if (lang === 'vi') return offer;
  const enData = SWAP_ENGLISH_MAP[offer.id];
  if (!enData) return offer;
  return {
    ...offer,
    location_name: enData.location_name || offer.location_name,
    plant_name: enData.plant_name || offer.plant_name,
    item_type: enData.item_type || offer.item_type,
    description: enData.description || offer.description,
    contact_note: enData.contact_note || offer.contact_note,
    created_at: enData.created_at || offer.created_at,
  };
}
