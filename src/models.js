import { media } from './media.js'

// Bilingual helper: every piece of model copy has an English and a Bangla version.
const L = (en, bn) => ({ en, bn })

// Specs come from Jetour global information: the global T2 i-DM specification page
// and Jetour South Africa's Dashing and X70 Plus pages. Bangladesh specs may differ.
export const models = [
  {
    id: 't2',
    slug: 't2-idm',
    name: 'T2 i-DM',
    badge: 'Plug-in Hybrid',
    image: media.t2.card,
    m: media.t2,
    tag: L('Plug-in hybrid travel SUV', 'প্লাগ-ইন হাইব্রিড ট্রাভেল এসইউভি'),
    blurb: L(
      'Boxy, go-anywhere design with a hybrid system that runs the daily commute on electricity alone.',
      'যেকোনো পথে যাওয়ার মতো বলিষ্ঠ ডিজাইন, আর এমন হাইব্রিড সিস্টেম যা প্রতিদিনের যাতায়াত শুধু বিদ্যুতেই চালায়।'
    ),
    headline: L('Built for the road less travelled.', 'অচেনা পথের জন্য তৈরি।'),
    intro: L(
      'The T2 i-DM pairs a rugged, box-styled body with Jetour\'s i-DM plug-in hybrid system. Drive the city on battery, then take the long way home on fuel, with 205 mm of ground clearance for broken roads and monsoon puddles.',
      'T2 i-DM-এ আছে বলিষ্ঠ বক্স-স্টাইল বডি আর জেটুরের i-DM প্লাগ-ইন হাইব্রিড সিস্টেম। শহরে চালান ব্যাটারিতে, দূরের পথে জ্বালানিতে। ভাঙা রাস্তা আর বর্ষার পানির জন্য আছে ২০৫ মিমি গ্রাউন্ড ক্লিয়ারেন্স।'
    ),
    specs: [
      { value: '139', unit: 'km', key: 'evRange' },
      { value: '1,000+', unit: 'km', key: 'combined' },
      { value: '610', unit: 'Nm', key: 'torque' },
    ],
    stats: [
      { value: '139', unit: 'km', label: L('Electric range (NEDC)', 'ইলেকট্রিক রেঞ্জ (NEDC)') },
      { value: '26.7', unit: 'kWh', label: L('LFP battery', 'এলএফপি ব্যাটারি') },
      { value: '0.8', unit: 'L/100km', label: L('NEDC combined fuel use', 'NEDC সম্মিলিত জ্বালানি খরচ') },
      { value: '205', unit: 'mm', label: L('Ground clearance', 'গ্রাউন্ড ক্লিয়ারেন্স') },
    ],
    design: {
      title: L('Rugged simplicity.', 'বলিষ্ঠ সরলতা।'),
      items: [
        { img: media.t2.body, title: L('Hardcore style body', 'হার্ডকোর স্টাইল বডি'), text: L('Square shoulders, short overhangs and a 28° approach angle.', 'চওড়া কাঁধ, ছোট ওভারহ্যাং আর ২৮° অ্যাপ্রোচ অ্যাঙ্গেল।') },
        { img: media.t2.sunroof, title: L('64-inch panoramic sunroof', '৬৪ ইঞ্চি প্যানোরামিক সানরুফ'), text: L('The whole sky over both rows of seats.', 'দুই সারি আসনের ওপর পুরো আকাশ।') },
        { img: media.t2.headlights, title: L('Matrix headlights', 'ম্যাট্রিক্স হেডলাইট'), text: L('Clear night vision on unlit highways.', 'আলোহীন হাইওয়েতেও রাতে পরিষ্কার দেখা।') },
      ],
    },
    power: {
      title: L('Agile power.', 'চটপটে শক্তি।'),
      items: [
        { img: media.t2.engine, title: L('5th-gen 1.5 TGDI hybrid engine', '৫ম প্রজন্মের ১.৫ TGDI হাইব্রিড ইঞ্জিন'), text: L('115 kW and 220 Nm, built specifically for hybrid use.', '১১৫ কিলোওয়াট ও ২২০ নিউটন-মিটার, বিশেষভাবে হাইব্রিডের জন্য তৈরি।') },
        { img: media.t2.transmission, title: L('Three-speed super hybrid transmission', 'থ্রি-স্পিড সুপার হাইব্রিড ট্রান্সমিশন'), text: L('Two motors with 165 kW and 390 Nm, working with the engine.', 'দুটি মোটর, ১৬৫ কিলোওয়াট ও ৩৯০ নিউটন-মিটার, ইঞ্জিনের সঙ্গে কাজ করে।') },
        { img: media.t2.battery, title: L('High-capacity hybrid battery', 'উচ্চ ক্ষমতার হাইব্রিড ব্যাটারি'), text: L('26.7 kWh lithium iron phosphate, for 139 km on electricity (NEDC).', '২৬.৭ কিলোওয়াট-আওয়ার লিথিয়াম আয়রন ফসফেট, বিদ্যুতে ১৩৯ কিমি (NEDC)।') },
      ],
    },
    idm: {
      modes: [
        { key: 'ev', title: L('Electric', 'ইলেকট্রিক'), text: L('Silent, zero-fuel driving for the daily commute. Up to 139 km (NEDC).', 'প্রতিদিনের যাতায়াতে নিঃশব্দ, জ্বালানিহীন চলা। সর্বোচ্চ ১৩৯ কিমি (NEDC)।') },
        { key: 'hev', title: L('Hybrid', 'হাইব্রিড'), text: L('Engine and motors share the work on highways and hills.', 'হাইওয়ে আর পাহাড়ি পথে ইঞ্জিন ও মোটর একসঙ্গে কাজ করে।') },
        { key: 'charge', title: L('Charging', 'চার্জিং'), text: L('Fast charge 30% to 80% in about 30 minutes. Slow charge 30% to 100% in under 4 hours.', 'ফাস্ট চার্জে ৩০% থেকে ৮০% প্রায় ৩০ মিনিটে। স্লো চার্জে ৩০% থেকে ১০০% ৪ ঘণ্টার কমে।') },
      ],
    },
    interior: {
      title: L('A cabin for long days on the road.', 'রাস্তায় লম্বা দিনের জন্য কেবিন।'),
      items: [
        { img: media.t2.screen, title: L('15.6-inch central screen', '১৫.৬ ইঞ্চি সেন্ট্রাল স্ক্রিন') },
        { img: media.t2.audio, title: L('Concert hall-level surround sound', 'কনসার্ট হল মানের সারাউন্ড সাউন্ড') },
        { img: media.t2.cabin, title: L('Five-star health cabin', 'ফাইভ-স্টার হেলথ কেবিন') },
        { img: media.t2.charging, title: L('50W wireless phone charging', '৫০ ওয়াট ওয়্যারলেস ফোন চার্জিং') },
      ],
    },
    features: {
      title: L('Intelligent technology.', 'বুদ্ধিমান প্রযুক্তি।'),
      items: [
        { img: media.t2.adas, title: L('L2 driving assistance', 'L2 ড্রাইভিং অ্যাসিস্ট্যান্স'), text: L('Help with steering, speed and distance on long drives.', 'লম্বা যাত্রায় স্টিয়ারিং, গতি ও দূরত্বে সহায়তা।') },
        { img: media.t2.camera, title: L('540° panoramic camera', '৫৪০° প্যানোরামিক ক্যামেরা'), text: L('See around and under the car in tight Dhaka lanes.', 'ঢাকার সরু গলিতে গাড়ির চারপাশ ও নিচ দেখুন।') },
        { img: media.t2.roof, title: L('Arrayed high-density roof', 'অ্যারেড হাই-ডেনসিটি রুফ'), text: L('Built to carry roof gear for trips out of town.', 'শহরের বাইরের যাত্রায় ছাদে মালপত্র বহনের জন্য তৈরি।') },
      ],
    },
    safety: {
      title: L('Be your safety guard.', 'আপনার নিরাপত্তার পাহারাদার।'),
      items: [
        { img: media.t2.cage, title: L('Steel cage body structure', 'স্টিল কেজ বডি স্ট্রাকচার'), text: L('A rigid safety cell around everyone inside.', 'ভেতরের সবার চারপাশে শক্ত নিরাপত্তা খাঁচা।') },
        { img: media.t2.adas, title: L('Front, side and curtain airbags', 'সামনের, পাশের ও কার্টেন এয়ারব্যাগ'), text: L('Driver and passenger front airbags, a driver side airbag and front and rear curtain airbags.', 'চালক ও যাত্রীর সামনের এয়ারব্যাগ, চালকের পাশের এয়ারব্যাগ এবং সামনে-পেছনে কার্টেন এয়ারব্যাগ।') },
      ],
    },
    gallery: [media.t2.forest, media.t2.mountain, media.t2.night],
    colours: ['Black', 'Satin Silver', 'Misty Cyan', 'Aviation Silver', 'Khaki White', 'Electroplated Green'],
    specTable: [
      {
        group: L('Dimensions', 'মাপ'),
        rows: [
          [L('Length', 'দৈর্ঘ্য'), '4,785 mm'],
          [L('Width', 'প্রস্থ'), '2,006 mm'],
          [L('Height', 'উচ্চতা'), '1,875 mm'],
          [L('Wheelbase', 'হুইলবেস'), '2,800 mm'],
          [L('Ground clearance', 'গ্রাউন্ড ক্লিয়ারেন্স'), '205 mm'],
          [L('Approach / departure angle', 'অ্যাপ্রোচ / ডিপারচার অ্যাঙ্গেল'), '28° / 30°'],
          [L('Seats', 'আসন'), '5'],
          [L('Fuel tank', 'জ্বালানি ট্যাংক'), '70 L'],
          [L('Towing (braked)', 'টোয়িং (ব্রেকসহ)'), '1,600 kg'],
        ],
      },
      {
        group: L('Powertrain', 'পাওয়ারট্রেন'),
        rows: [
          [L('Engine', 'ইঞ্জিন'), '1.5 L turbo, 115 kW, 220 Nm'],
          [L('Electric motors', 'ইলেকট্রিক মোটর'), '2 front motors, 165 kW, 390 Nm'],
          [L('Transmission', 'ট্রান্সমিশন'), '3-speed DHT'],
          [L('Drive', 'ড্রাইভ'), 'Front-wheel drive'],
          [L('Top speed', 'সর্বোচ্চ গতি'), '190 km/h'],
          [L('Fuel use, NEDC combined', 'জ্বালানি খরচ, NEDC সম্মিলিত'), '0.8 L/100 km'],
          [L('Fuel use, battery low (NEDC)', 'জ্বালানি খরচ, ব্যাটারি কম (NEDC)'), '5.4 L/100 km'],
        ],
      },
      {
        group: L('Battery and charging', 'ব্যাটারি ও চার্জিং'),
        rows: [
          [L('Battery', 'ব্যাটারি'), '26.7 kWh LiFePO₄'],
          [L('Electric range (NEDC)', 'ইলেকট্রিক রেঞ্জ (NEDC)'), '139 km'],
          [L('Fast charging', 'ফাস্ট চার্জিং'), '30–80% in 0.5 h'],
          [L('Slow charging', 'স্লো চার্জিং'), '30–100% in under 4 h'],
        ],
      },
      {
        group: L('Chassis', 'চ্যাসিস'),
        rows: [
          [L('Suspension', 'সাসপেনশন'), 'MacPherson front, multi-link rear'],
          [L('Tyres', 'টায়ার'), '255/55 R20'],
          [L('Brakes', 'ব্রেক'), 'Ventilated front discs, rear discs, EPB'],
        ],
      },
    ],
  },

  {
    id: 'dashing',
    slug: 'dashing',
    name: 'Dashing',
    badge: '5 Seats',
    image: media.dashing.card,
    m: media.dashing,
    tag: L('Five-seat urban SUV', 'পাঁচ আসনের আরবান এসইউভি'),
    blurb: L(
      'Sharp coupé lines, a tech-filled cabin and the turbo power to match Dhaka traffic and highways alike.',
      'কুপে স্টাইলের ধারালো লাইন, প্রযুক্তিতে ভরা কেবিন আর ঢাকার জ্যাম থেকে হাইওয়ে, সবখানে মানানসই টার্বো শক্তি।'
    ),
    headline: L('A statement of intent.', 'আত্মবিশ্বাসের ঘোষণা।'),
    intro: L(
      'Jetour calls the Dashing its vanguard technology SUV. It has sharp lines, hidden door handles and a cabin built around two 10.25-inch screens, all on a 2,720 mm wheelbase that leaves real room in the back.',
      'জেটুর ড্যাশিংকে বলে তাদের ভ্যানগার্ড টেকনোলজি এসইউভি। ধারালো লাইন, লুকানো দরজার হাতল আর দুটি ১০.২৫ ইঞ্চি স্ক্রিন ঘিরে সাজানো কেবিন, ২,৭২০ মিমি হুইলবেসে পেছনেও সত্যিকারের জায়গা।'
    ),
    specs: [
      { value: '1.5', unit: 'T', key: 'engine' },
      { value: '5', unit: '', key: 'seats' },
      { value: '2×10.25', unit: 'in', key: 'screens' },
    ],
    stats: [
      { value: '1.5', unit: 'TD', label: L('Turbo petrol engine', 'টার্বো পেট্রোল ইঞ্জিন') },
      { value: '2,720', unit: 'mm', label: L('Wheelbase', 'হুইলবেস') },
      { value: '2×10.25', unit: 'in', label: L('Digital screens', 'ডিজিটাল স্ক্রিন') },
      { value: '6', unit: '', label: L('Airbags', 'এয়ারব্যাগ') },
    ],
    design: {
      title: L('Ultimate fun.', 'আনন্দের চূড়ান্ত রূপ।'),
      items: [
        { img: media.dashing.card, title: L('A statement of intent', 'আত্মবিশ্বাসের ঘোষণা'), text: L('A wide, low stance and a bold signature grille.', 'চওড়া, নিচু ভঙ্গি আর সাহসী সিগনেচার গ্রিল।') },
        { img: media.dashing.rear34, title: L('Meticulous craftsmanship', 'নিখুঁত কারিগরি'), text: L('A full-width tail light and clean, sharp surfaces.', 'পুরো প্রস্থজুড়ে টেইল লাইট আর পরিষ্কার, ধারালো সারফেস।') },
        { img: media.dashing.street, title: L('Power of design', 'ডিজাইনের শক্তি'), text: L('Coupé-style roofline on a practical SUV.', 'ব্যবহারিক এসইউভিতে কুপে স্টাইলের ছাদ।') },
      ],
    },
    interior: {
      title: L('Refined taste, adventurous spirit.', 'রুচিশীল, অভিযাত্রী মন।'),
      items: [
        { img: media.dashing.screens, title: L('Dual 10.25-inch displays', 'ডুয়াল ১০.২৫ ইঞ্চি ডিসপ্লে') },
        { img: media.dashing.seats, title: L('Spacious cabin', 'প্রশস্ত কেবিন') },
        { img: media.dashing.charging, title: L('50W wireless charging', '৫০ ওয়াট ওয়্যারলেস চার্জিং') },
        { img: media.dashing.interior, title: L('The place to be', 'থাকার মতো জায়গা') },
      ],
    },
    features: {
      title: L('Details that make the day easier.', 'যে খুঁটিনাটি দিনকে সহজ করে।'),
      items: [
        { img: media.dashing.headlights, title: L('LED headlights', 'এলইডি হেডলাইট'), text: L('Sharp light signature, day and night.', 'দিনে-রাতে ধারালো আলোর সিগনেচার।') },
        { img: media.dashing.boot, title: L('More room for travelling', 'ভ্রমণের জন্য বেশি জায়গা'), text: L('Fold the rear seats for big loads.', 'বড় মালপত্রের জন্য পেছনের আসন ভাঁজ করুন।') },
        { img: media.dashing.wheels, title: L('Sporty wheels', 'স্পোর্টি হুইল'), text: L('Two-tone alloys that finish the stance.', 'টু-টোন অ্যালয় যা ভঙ্গি সম্পূর্ণ করে।') },
        { img: media.dashing.climate, title: L('Dual climate control', 'ডুয়াল ক্লাইমেট কন্ট্রোল'), text: L('Separate temperatures for driver and passenger.', 'চালক ও যাত্রীর আলাদা তাপমাত্রা।') },
        { img: media.dashing.handles, title: L('Hidden door handles', 'লুকানো দরজার হাতল'), text: L('Flush with the body for a cleaner side.', 'বডির সঙ্গে মিশে থাকে, পাশটা দেখায় পরিষ্কার।') },
        { img: media.dashing.key, title: L('Smart key fob', 'স্মার্ট কি ফব'), text: L('Keyless entry and push-button start.', 'চাবি ছাড়া প্রবেশ আর বাটনে স্টার্ট।') },
      ],
    },
    safety: {
      title: L('Safety, as standard thinking.', 'নিরাপত্তা, স্বাভাবিক ভাবনায়।'),
      items: [
        { img: media.dashing.airbags, title: L('6 airbags', '৬টি এয়ারব্যাগ'), text: L('Front, side and curtain protection.', 'সামনে, পাশে ও কার্টেন সুরক্ষা।') },
        { img: media.dashing.fcw, title: L('Forward collision warning', 'ফরোয়ার্ড কলিশন ওয়ার্নিং'), text: L('Alerts you when the car ahead gets too close.', 'সামনের গাড়ি বেশি কাছে এলে সতর্ক করে।') },
        { img: media.dashing.lka, title: L('Lane keep assist', 'লেন কিপ অ্যাসিস্ট'), text: L('Gently steers you back into your lane.', 'আলতোভাবে আপনাকে লেনে ফিরিয়ে আনে।') },
        { img: media.dashing.dow, title: L('Door open warning', 'ডোর ওপেন ওয়ার্নিং'), text: L('Warns before a door opens into traffic or a rickshaw.', 'যানবাহন বা রিকশার দিকে দরজা খোলার আগে সতর্ক করে।') },
      ],
    },
    gallery: [media.dashing.lifestyle, media.dashing.lifestyle2, media.dashing.rear],
    colours: null,
    specTable: [
      {
        group: L('Dimensions', 'মাপ'),
        rows: [
          [L('Length', 'দৈর্ঘ্য'), '4,590 mm'],
          [L('Width', 'প্রস্থ'), '1,900 mm'],
          [L('Height', 'উচ্চতা'), '1,685 mm'],
          [L('Wheelbase', 'হুইলবেস'), '2,720 mm'],
          [L('Seats', 'আসন'), '5'],
        ],
      },
      {
        group: L('Powertrain', 'পাওয়ারট্রেন'),
        rows: [[L('Engine', 'ইঞ্জিন'), '1.5 L turbo petrol (1.5 TD)']],
      },
      {
        group: L('Comfort and technology', 'আরাম ও প্রযুক্তি'),
        rows: [
          [L('Screens', 'স্ক্রিন'), 'Dual 10.25-inch'],
          [L('Climate', 'ক্লাইমেট'), 'Dual-zone climate control'],
          [L('Phone charging', 'ফোন চার্জিং'), '50W wireless'],
          [L('Entry', 'প্রবেশ'), 'Smart key, hidden door handles'],
        ],
      },
      {
        group: L('Safety', 'নিরাপত্তা'),
        rows: [
          [L('Airbags', 'এয়ারব্যাগ'), '6'],
          [L('Driver assistance', 'ড্রাইভার অ্যাসিস্ট্যান্স'), 'Forward collision warning, lane keep assist, door open warning'],
        ],
      },
    ],
  },

  {
    id: 'x70',
    slug: 'x70-plus',
    name: 'X70 Plus',
    badge: '7 Seats',
    image: media.x70.card,
    m: media.x70,
    tag: L('Seven-seat family SUV', 'সাত আসনের ফ্যামিলি এসইউভি'),
    blurb: L(
      'Three rows, a panoramic roof and room for the whole family, the grandparents and the luggage.',
      'তিন সারি আসন, প্যানোরামিক ছাদ, আর পুরো পরিবার, দাদা-দাদি ও লাগেজের জন্য যথেষ্ট জায়গা।'
    ),
    headline: L('Room for everyone who matters.', 'প্রিয় সবার জন্য জায়গা।'),
    intro: L(
      'Jetour\'s big family SUV seats seven across three rows. A panoramic sunroof, a power tailgate and blind spot monitoring make the weekly school run and the Eid trip home just as easy.',
      'জেটুরের বড় ফ্যামিলি এসইউভিতে তিন সারিতে সাতজন বসতে পারেন। প্যানোরামিক সানরুফ, পাওয়ার টেইলগেট আর ব্লাইন্ড স্পট মনিটরিং, স্কুলে যাওয়া থেকে ঈদের বাড়ি ফেরা, সবই সহজ।'
    ),
    specs: [
      { value: '7', unit: '', key: 'seats' },
      { value: '1.5', unit: 'T', key: 'engine' },
      { value: '19', unit: 'in', key: 'wheels' },
    ],
    stats: [
      { value: '7', unit: '', label: L('Seats in three rows', 'তিন সারিতে আসন') },
      { value: '4,724', unit: 'mm', label: L('Length', 'দৈর্ঘ্য') },
      { value: '1.5', unit: 'TD', label: L('Turbo petrol engine', 'টার্বো পেট্রোল ইঞ্জিন') },
      { value: '2×10.25', unit: 'in', label: L('Cluster and infotainment', 'ক্লাস্টার ও ইনফোটেইনমেন্ট') },
    ],
    design: {
      title: L('Distinctive profile.', 'স্বতন্ত্র চেহারা।'),
      items: [
        { img: media.x70.card, title: L('Unsurpassed driveability', 'অতুলনীয় চালনা'), text: L('A confident, upright SUV that is easy to place in traffic.', 'আত্মবিশ্বাসী, খাড়া এসইউভি, ট্রাফিকে সহজে চালানো যায়।') },
        { img: media.x70.rear34, title: L('Crafted to stand apart', 'আলাদা হয়ে ওঠার জন্য তৈরি'), text: L('A wide rear with a full-width light bar.', 'চওড়া পেছন, পুরো প্রস্থজুড়ে লাইট বার।') },
        { img: media.x70.side, title: L('A visual masterpiece', 'দেখার মতো সৃষ্টি'), text: L('Long, clean lines over 4.7 metres.', '৪.৭ মিটারজুড়ে লম্বা, পরিষ্কার লাইন।') },
      ],
    },
    interior: {
      title: L('Modern elegance, for seven.', 'সাতজনের জন্য আধুনিক আভিজাত্য।'),
      items: [
        { img: media.x70.seats, title: L('Modern seven-seater', 'আধুনিক সাত আসনের গাড়ি') },
        { img: media.x70.sunroof, title: L('Ultra wide-angle panoramic sunroof', 'আল্ট্রা ওয়াইড-অ্যাঙ্গেল প্যানোরামিক সানরুফ') },
        { img: media.x70.charging, title: L('50W wireless charging', '৫০ ওয়াট ওয়্যারলেস চার্জিং') },
        { img: media.x70.cluster, title: L('Dual 10.25-inch cluster and infotainment', 'ডুয়াল ১০.২৫ ইঞ্চি ক্লাস্টার ও ইনফোটেইনমেন্ট') },
      ],
    },
    features: {
      title: L('Exclusivity, defined.', 'আভিজাত্যের সংজ্ঞা।'),
      items: [
        { img: media.x70.headlights, title: L('LED headlights', 'এলইডি হেডলাইট'), text: L('A wide light signature that reads at a distance.', 'চওড়া আলোর সিগনেচার, দূর থেকেও চোখে পড়ে।') },
        { img: media.x70.tailgate, title: L('Power tailgate', 'পাওয়ার টেইলগেট'), text: L('Opens with a kick when your hands are full.', 'হাত ভরা থাকলে পা দিয়েই খোলে।') },
        { img: media.x70.wheels, title: L('Sporty wheels', 'স্পোর্টি হুইল'), text: L('Two-tone alloys on a big footprint.', 'বড় আকারে টু-টোন অ্যালয়।') },
        { img: media.x70.climate, title: L('Dual climate control', 'ডুয়াল ক্লাইমেট কন্ট্রোল'), text: L('Keeps front and back comfortable in summer heat.', 'গরমেও সামনে-পেছনে আরাম রাখে।') },
        { img: media.x70.cockpit, title: L('All-around driving control', 'সব দিকের ড্রাইভিং নিয়ন্ত্রণ'), text: L('A clear, driver-focused cockpit.', 'পরিষ্কার, চালককেন্দ্রিক ককপিট।') },
        { img: media.x70.family, title: L('Made for family days', 'পারিবারিক দিনের জন্য তৈরি'), text: L('Easy to load, easy to live with.', 'সহজে মাল তোলা যায়, সহজে ব্যবহার করা যায়।') },
      ],
    },
    safety: {
      title: L('Technology that watches out.', 'যে প্রযুক্তি পাহারা দেয়।'),
      items: [
        { img: media.x70.ldw, title: L('Lane departure warning', 'লেন ডিপারচার ওয়ার্নিং'), text: L('Alerts you if you drift out of your lane.', 'লেন থেকে সরে গেলে সতর্ক করে।') },
        { img: media.x70.bsm, title: L('Blind spot monitoring', 'ব্লাইন্ড স্পট মনিটরিং'), text: L('Shows cars and bikes you cannot see in the mirror.', 'আয়নায় না দেখা গাড়ি ও বাইক দেখায়।') },
        { img: media.x70.aeb, title: L('Advanced emergency braking', 'অ্যাডভান্সড ইমার্জেন্সি ব্রেকিং'), text: L('Brakes automatically if a collision is close.', 'সংঘর্ষের ঝুঁকি হলে নিজেই ব্রেক করে।') },
      ],
    },
    gallery: [media.x70.lifestyle, media.x70.rear, media.x70.family],
    colours: null,
    specTable: [
      {
        group: L('Dimensions', 'মাপ'),
        rows: [
          [L('Length', 'দৈর্ঘ্য'), '4,724 mm'],
          [L('Width', 'প্রস্থ'), '1,900 mm'],
          [L('Height', 'উচ্চতা'), '1,720 mm'],
          [L('Wheelbase', 'হুইলবেস'), '2,720 mm'],
          [L('Seats', 'আসন'), '7 (2 + 3 + 2)'],
        ],
      },
      {
        group: L('Powertrain', 'পাওয়ারট্রেন'),
        rows: [[L('Engine', 'ইঞ্জিন'), '1.5 L turbo petrol (1.5 TD)']],
      },
      {
        group: L('Comfort and technology', 'আরাম ও প্রযুক্তি'),
        rows: [
          [L('Screens', 'স্ক্রিন'), 'Dual 10.25-inch cluster and infotainment'],
          [L('Roof', 'ছাদ'), 'Panoramic sunroof'],
          [L('Tailgate', 'টেইলগেট'), 'Power tailgate'],
          [L('Climate', 'ক্লাইমেট'), 'Dual-zone climate control'],
          [L('Phone charging', 'ফোন চার্জিং'), '50W wireless'],
        ],
      },
      {
        group: L('Safety', 'নিরাপত্তা'),
        rows: [[L('Driver assistance', 'ড্রাইভার অ্যাসিস্ট্যান্স'), 'Lane departure warning, blind spot monitoring, advanced emergency braking']],
      },
    ],
  },
]

export const modelBySlug = (slug) => models.find((m) => m.slug === slug)

// Rows for the compare table on the Models page.
export const compareRows = [
  { label: L('Body', 'বডি'), values: { t2: L('Box-styled travel SUV', 'বক্স-স্টাইল ট্রাভেল এসইউভি'), dashing: L('Coupé-style SUV', 'কুপে-স্টাইল এসইউভি'), x70: L('Family SUV', 'ফ্যামিলি এসইউভি') } },
  { label: L('Seats', 'আসন'), values: { t2: '5', dashing: '5', x70: '7' } },
  { label: L('Powertrain', 'পাওয়ারট্রেন'), values: { t2: L('Plug-in hybrid, 1.5 L turbo + 2 motors', 'প্লাগ-ইন হাইব্রিড, ১.৫ লিটার টার্বো + ২টি মোটর'), dashing: L('1.5 L turbo petrol', '১.৫ লিটার টার্বো পেট্রোল'), x70: L('1.5 L turbo petrol', '১.৫ লিটার টার্বো পেট্রোল') } },
  { label: L('Electric range', 'ইলেকট্রিক রেঞ্জ'), values: { t2: '139 km (NEDC)', dashing: '—', x70: '—' } },
  { label: L('Length', 'দৈর্ঘ্য'), values: { t2: '4,785 mm', dashing: '4,590 mm', x70: '4,724 mm' } },
  { label: L('Wheelbase', 'হুইলবেস'), values: { t2: '2,800 mm', dashing: '2,720 mm', x70: '2,720 mm' } },
  { label: L('Main screen', 'প্রধান স্ক্রিন'), values: { t2: '15.6-inch', dashing: '2 × 10.25-inch', x70: '2 × 10.25-inch' } },
  { label: L('Sunroof', 'সানরুফ'), values: { t2: L('64-inch panoramic', '৬৪ ইঞ্চি প্যানোরামিক'), dashing: '—', x70: L('Panoramic', 'প্যানোরামিক') } },
  { label: L('Best for', 'যাদের জন্য সেরা'), values: { t2: L('Low running costs and weekend trips', 'কম খরচে চলা আর সপ্তাহান্তের ভ্রমণ'), dashing: L('City driving with style', 'স্টাইলে শহরে চলা'), x70: L('Big families', 'বড় পরিবার') } },
]

// Approximate road distances from Dhaka, in km.
export const routes = [
  { id: 'ctg', km: 250 },
  { id: 'syl', km: 240 },
  { id: 'sajek', km: 330 },
  { id: 'cox', km: 400 },
]

export const T2_EV_KM = 139
export const T2_COMBINED_KM = 1000
