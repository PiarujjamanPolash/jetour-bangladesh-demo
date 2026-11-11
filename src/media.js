// All photos and video are loaded from Jetour's official websites
// (jetourglobal.com and jetour.co.za). To host them yourself later, download each
// file into /public/media and replace the URL here with '/media/<file-name>'.

const G = 'https://www.jetourglobal.com/new-static'
const ZA = 'https://jetour.co.za/wp-content/uploads/2026'
const T2G = `${G}/images/vehicles/cars/T2iDM`

export const media = {
  logo: `${ZA}/09/web-logo-white.png`,

  heroVideo: `${G}/images/home/home_2.mp4`,
  heroPoster: `${G}/images/home/culture2.jpg`,

  t2: {
    video: `${ZA}/10/Jetour-T2-iDM-Desktop.mp4`,
    videoMobile: `${ZA}/10/Jetour-T2-iDM-Mobile.mp4`,
    card: `${G}/images/vehicles/image/T2iDM.png`,
    side: `${G}/images/home/vehicles/T2iDM/car.png`,
    body: `${T2G}/p1_1.png`,
    sunroof: `${T2G}/p1_2.png`,
    headlights: `${T2G}/p1_3.png`,
    engine: `${T2G}/p2_1.png`,
    transmission: `${T2G}/p2_2.png`,
    battery: `${T2G}/p2_3.png`,
    audio: `${T2G}/p3_1.png`,
    cabin: `${T2G}/p3_2.png`,
    charging: `${T2G}/p3_3.png`,
    cage: `${T2G}/p3_4.png`,
    roof: `${T2G}/p3_5.png`,
    adas: `${T2G}/p4_1.png`,
    camera: `${T2G}/p4_2.png`,
    screen: `${T2G}/p4_3.png`,
    forest: `${T2G}/p5_1.png`,
    mountain: `${T2G}/p5_2.png`,
    night: `${T2G}/p5_3.png`,
    // Kept for backwards compatibility with the first homepage version
    tech: `${T2G}/p4_1.png`,
    // 36-frame 360° spin, frames 00.png to 35.png
    spinFrame: (i) => `${G}/exterior/T2iDM/snow_white/${String(i).padStart(2, '0')}.png`,
    spinFrames: 36,
  },

  dashing: {
    video: `${ZA}/10/Jetour-Dashing-Desktop.mp4`,
    videoMobile: `${ZA}/10/Jetour-Dashing-Mobile.mp4`,
    card: `${ZA}/07/NEW-Dashing-Slider1-1.webp`,
    rear34: `${ZA}/07/New-Dashing-Slider1-2.webp`,
    street: `${ZA}/07/NEW-Dashing-Slider1-3.webp`,
    interior: `${ZA}/07/NEW-Dashing-Slider2-1.webp`,
    charging: `${ZA}/07/NEW-Dashing-Slider2-2.webp`,
    seats: `${ZA}/07/NEW-Dashing-Slider2-3.webp`,
    screens: `${ZA}/07/NEW-Dashing-Slider2-4.webp`,
    headlights: `${ZA}/07/NEW-Dashing-Grid-1.png`,
    boot: `${ZA}/07/NEW-Dashing-Grid-2.png`,
    wheels: `${ZA}/07/NEW-Dashing-Grid-3.png`,
    climate: `${ZA}/07/NEW-Dashing-Grid-4.png`,
    handles: `${ZA}/07/NEW-Dashing-Grid-5.png`,
    key: `${ZA}/07/NEW-Dashing-Grid-6.png`,
    airbags: `${ZA}/07/NEW-Dashing-Safety-1.webp`,
    fcw: `${ZA}/07/NEW-Dashing-Safety-2.webp`,
    lka: `${ZA}/07/NEW-Dashing-Safety-3.webp`,
    dow: `${ZA}/07/NEW-Dashing-Safety-4.webp`,
    lifestyle: `${ZA}/07/NEW-Dashing-Lifestyle-Left.webp`,
    lifestyle2: `${ZA}/07/NEW-Dashing-Lifestyle-2.webp`,
    rear: `${ZA}/07/NEW-Dashing-Lifestyle-3.webp`,
  },

  x70: {
    video: `${ZA}/10/Jetour-X70-Desktop.mp4`,
    videoMobile: `${ZA}/10/Jetour-X70-Mobile.mp4`,
    card: `${ZA}/07/NEW-X70-Slider-1-1.webp`,
    rear34: `${ZA}/07/NEW-X70-Sldier-1-2.webp`,
    side: `${ZA}/07/NEW-X70-Slider-1-3.webp`,
    interior: `${ZA}/07/NEW-X70-Slider-2-1.webp`,
    charging: `${ZA}/07/NEW-X70-Slider-2-2.webp`,
    sunroof: `${ZA}/07/NEW-X70-Slider-2-3.webp`,
    seats: `${ZA}/07/NEW-X70-Slider-2-4.webp`,
    headlights: `${ZA}/07/New-X70-Grid-1.png`,
    tailgate: `${ZA}/08/Power-Tailgate.webp`,
    wheels: `${ZA}/07/New-X70-Grid-3.png`,
    climate: `${ZA}/07/New-X70-Grid-4.png`,
    cockpit: `${ZA}/07/New-X70-Grid-5.png`,
    cluster: `${ZA}/07/New-X70-Grid-6.png`,
    ldw: `${ZA}/06/X70-Plus-Tech-1.png`,
    bsm: `${ZA}/06/X70-Plus-Tech-2.png`,
    aeb: `${ZA}/06/X70-Plus-Tech-3.png`,
    lifestyle: `${ZA}/07/NEW-X70-Lifestyle-Left.webp`,
    rear: `${ZA}/07/NEW-X70-Lifestyle-2.webp`,
    family: `${ZA}/07/NEW-X70-Lifestyle-3.webp`,
  },

  travel: {
    river: `${G}/images/home/culture1.jpg`,
    coast: `${G}/images/home/culture2.jpg`,
    crowd: `${G}/images/home/culture3.jpg`,
    savanna: `${G}/images/home/culture4.jpg`,
  },
}

export const contact = {
  phoneDisplay: '+880 1328-774422',
  phoneTel: '+8801328774422',
  whatsapp: '8801328774422',
  email: 'jetour.bangladesh@gmail.com',
  address: '218/B Bir Uttam Mir Shawkat Sarak, Tejgaon-Gulshan Link Road, Dhaka',
  mapQuery: '218/B Bir Uttam Mir Shawkat Sarak, Tejgaon-Gulshan Link Road, Dhaka',
  facebook: 'https://www.facebook.com/p/Jetour-Bangladesh-61575238544197/',
  instagram: 'https://www.instagram.com/jetourbd/',
}

export const waLink = (text) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
