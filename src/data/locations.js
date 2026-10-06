/**
 * Kathmandu Valley Hierarchical Location System
 * Province -> District -> Municipality -> Area
 */

export const PROVINCE = "Bagmati Province";

export const locations = {
  Kathmandu: {
    district: "Kathmandu",
    province: PROVINCE,
    municipalities: [
      {
        name: "Kathmandu Metropolitan City",
        areas: [
          "Baneshwor",
          "New Baneshwor",
          "Old Baneshwor",
          "Shantinagar",
          "Min Bhawan",
          "Koteshwor",
          "Tinkune",
          "Sinamangal",
          "Gaushala",
          "Battisputali",
          "Chabahil",
          "Mitrapark",
          "Boudha",
          "Bouddhanath",
          "Jorpati",
          "Kalopul",
          "Dhumbarahi",
          "Maharajgunj",
          "Baluwatar",
          "Lazimpat",
          "Lainchaur",
          "Thamel",
          "Paknajol",
          "Sorhakhutte",
          "Gongabu",
          "Samakhusi",
          "Balaju",
          "Machhapokhari",
          "Kalanki",
          "Teku",
          "Tripureshwor",
          "Kalimati",
          "Kuleshwor",
          "Sitapaila",
          "Swayambhu",
          "Chhetrapati",
          "Naxal",
          "Gyaneshwor",
          "Maitidevi",
          "Putalisadak",
          "Dillibazar",
          "Bagbazar",
          "Anamnagar",
          "Ason",
          "Indra Chowk",
          "New Road",
          "Jamal",
          "Ratna Park",
          "Pashupati",
          "Basundhara",
          "Tokha Road",
          "Kapan",
          "Chunikhel"
        ]
      },
      {
        name: "Kirtipur Municipality",
        areas: [
          "Kirtipur",
          "Panga",
          "Nagaun",
          "Chobhar",
          "Balkhu",
          "Taudaha",
          "Machhegaun"
        ]
      },
      {
        name: "Chandragiri Municipality",
        areas: [
          "Kalanki Border",
          "Thankot",
          "Naikap",
          "Satungal",
          "Matatirtha",
          "Dahachok",
          "Balambu",
          "Chandragiri",
          "Tribhuvan Park area"
        ]
      },
      {
        name: "Budhanilkantha Municipality",
        areas: [
          "Budhanilkantha",
          "Hattigauda",
          "Golfutar",
          "Chapali",
          "Narayanthan",
          "Kapan",
          "Bhangal",
          "Khadka Bhadrakali"
        ]
      },
      {
        name: "Tokha Municipality",
        areas: [
          "Tokha",
          "Grande Hospital Area",
          "Jhor",
          "Samakhusi Border",
          "Gongabu",
          "Dhapasi",
          "Baniyatar"
        ]
      },
      {
        name: "Gokarneshwar Municipality",
        areas: [
          "Jorpati",
          "Gokarna",
          "Baluwa",
          "Nayapati",
          "Attarkhel",
          "Sundarijal"
        ]
      },
      {
        name: "Kageshwori Manohara Municipality",
        areas: [
          "Mulpani",
          "Pepsicola",
          "Gothatar",
          "Kageshwori",
          "Manohara",
          "Jagati",
          "Thali"
        ]
      },
      {
        name: "Nagarjun Municipality",
        areas: [
          "Sitapaila",
          "Ramkot",
          "Bhimdhunga",
          "Ichangu Narayan",
          "Nagarjun",
          "Raniban"
        ]
      },
      {
        name: "Tarakeshwar Municipality",
        areas: [
          "Gongabu North",
          "Tokha border areas",
          "Goldhunga",
          "Futung",
          "Jarankhu",
          "Dharmasthali",
          "Manamaiju"
        ]
      },
      {
        name: "Shankharapur Municipality",
        areas: [
          "Sankhu",
          "Jarsing Pauwa",
          "Pukhulachhi",
          "Nanglebhare",
          "Indrayani",
          "Patap"
        ]
      },
      {
        name: "Dakshinkali Municipality",
        areas: [
          "Pharping",
          "Dakshinkali",
          "Setidevi",
          "Chhaimale",
          "Talkot",
          "Kulekhani Road areas"
        ]
      }
    ]
  },
  Lalitpur: {
    district: "Lalitpur",
    province: PROVINCE,
    municipalities: [
      {
        name: "Lalitpur Metropolitan City",
        areas: [
          "Pulchowk",
          "Jawalakhel",
          "Kupondole",
          "Patan",
          "Mangal Bazaar",
          "Lagankhel",
          "Satdobato",
          "Ekantakuna",
          "Sanepa",
          "Jhamsikhel",
          "Bhaisepati",
          "Nakhu",
          "Dhobighat",
          "Balkumari",
          "Gwarko",
          "Imadol",
          "Tikathali",
          "Thaiba",
          "Bungamati",
          "Khokana",
          "Harisiddhi",
          "Lubhu",
          "Chapagaun Road",
          "Patan Dhoka",
          "Kumaripati",
          "Dhapakhel"
        ]
      },
      {
        name: "Godawari Municipality",
        areas: [
          "Godawari",
          "Thaiba",
          "Harisiddhi",
          "Thecho",
          "Badegaun",
          "Chapagaun",
          "Lele",
          "Bishankhunarayan",
          "Lamatar"
        ]
      },
      {
        name: "Mahalaxmi Municipality",
        areas: [
          "Imadol",
          "Tikathali",
          "Lubhu",
          "Siddhipur",
          "Lamatar",
          "Mahalaxmi"
        ]
      },
      {
        name: "Konjyosom Rural Municipality",
        areas: [
          "Chaughare",
          "Sankhu",
          "Dalchoki"
        ]
      },
      {
        name: "Mahankal Rural Municipality",
        areas: [
          "Gotikhel",
          "Manikhel",
          "Chandanpur"
        ]
      },
      {
        name: "Bagmati Rural Municipality",
        areas: [
          "Bhattaedanda",
          "Ashrang",
          "Gimdi"
        ]
      }
    ]
  },
  Bhaktapur: {
    district: "Bhaktapur",
    province: PROVINCE,
    municipalities: [
      {
        name: "Bhaktapur Municipality",
        areas: [
          "Bhaktapur Durbar Square",
          "Taumadhi",
          "Dattatreya",
          "Pottery Square",
          "Kamalbinayak",
          "Suryamadhi",
          "Byasi",
          "Sallaghari"
        ]
      },
      {
        name: "Madhyapur Thimi Municipality",
        areas: [
          "Thimi",
          "Lokanthali",
          "Gatthaghar",
          "Balkumari",
          "Sanothimi",
          "Radhe Radhe",
          "Nagadesh",
          "Bode",
          "Dadhikot"
        ]
      },
      {
        name: "Suryabinayak Municipality",
        areas: [
          "Suryabinayak",
          "Jagati",
          "Sallaghari",
          "Katunje",
          "Sipadol",
          "Duwakot",
          "Balkot",
          "Pilot Baba area",
          "Chitapol"
        ]
      },
      {
        name: "Changunarayan Municipality",
        areas: [
          "Changunarayan",
          "Nagarkot",
          "Telkot",
          "Duwakot",
          "Bhaktapur-Changunarayan Road areas",
          "Jhaukhel",
          "Chhaling"
        ]
      }
    ]
  }
};

export const districtsList = ["Kathmandu", "Lalitpur", "Bhaktapur"];

export function getMunicipalitiesByDistrict(districtName) {
  if (!districtName || !locations[districtName]) return [];
  return locations[districtName].municipalities.map(m => m.name);
}

export function getAreasByMunicipality(districtName, municipalityName) {
  if (!districtName || !municipalityName || !locations[districtName]) return [];
  const mun = locations[districtName].municipalities.find(m => m.name === municipalityName);
  return mun ? mun.areas : [];
}

export function getAllAreasList() {
  const areas = [];
  Object.values(locations).forEach(dist => {
    dist.municipalities.forEach(mun => {
      mun.areas.forEach(area => {
        if (!areas.includes(area)) areas.push(area);
      });
    });
  });
  return areas.sort();
}
