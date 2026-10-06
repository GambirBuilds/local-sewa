/**
 * Local Sewa - 15 Service Categories for Nepal Market
 */

export const serviceCategories = [
  {
    id: "electrician",
    name: "Electrician",
    iconName: "Zap",
    nepaliName: "बिजुली मिस्त्री",
    description: "Wiring, switchboard fixes, ceiling fan installation, inverter setup, and complete home electrical diagnostics.",
    providersCount: 38,
    startingPrice: 300,
    emergencyAvailable: true,
    popularTasks: ["Ceiling Fan Installation", "Short Circuit Repair", "Inverter & Battery Setup", "House Re-wiring", "Switch & MCB Replacement"]
  },
  {
    id: "plumber",
    name: "Plumber",
    iconName: "Wrench",
    nepaliName: "धारा / प्लम्बर",
    description: "Tap leakage, pipe fittings, water motor installation, bathroom sanitary fittings, and overhead tank cleaning.",
    providersCount: 34,
    startingPrice: 350,
    emergencyAvailable: true,
    popularTasks: ["Tap & Basin Repair", "Water Tank Float Valve", "Water Pump Repair", "Drain Unclogging", "Geyser Connection"]
  },
  {
    id: "cleaner",
    name: "Cleaning",
    iconName: "Sparkles",
    nepaliName: "सफाइ सेवा",
    description: "Deep home cleaning, sofa and carpet shampooing, post-construction cleaning, and kitchen exhaust degreasing.",
    providersCount: 26,
    startingPrice: 800,
    emergencyAvailable: false,
    popularTasks: ["Full Flat Deep Clean", "Sofa & Carpet Wash", "Water Tank Scrubbing", "Kitchen Deep Clean", "Window & Glass Clean"]
  },
  {
    id: "carpenter",
    name: "Carpenter",
    iconName: "Hammer",
    nepaliName: "काठको काम / सिकर्मी",
    description: "Furniture repair, custom modular closets, door locks and hinges, wooden polishing, and kitchen cabinetry.",
    providersCount: 22,
    startingPrice: 500,
    emergencyAvailable: false,
    popularTasks: ["Door Lock & Hinge Fix", "Bed & Table Repair", "Wardrobe Fitting", "Wooden Polish", "Custom Shelving"]
  },
  {
    id: "painter",
    name: "Painter",
    iconName: "Paintbrush",
    nepaliName: "पेन्टर / रंगरोगन",
    description: "Interior and exterior wall painting, waterproof damp coating, putty finishing, and decorative texture design.",
    providersCount: 19,
    startingPrice: 1200,
    emergencyAvailable: false,
    popularTasks: ["Room Wall Repainting", "Damp & Seepage Treatment", "Exterior Weatherproof Paint", "Door & Window Enamel", "Putty & Primer Coat"]
  },
  {
    id: "computer-tech",
    name: "Computer Technician",
    iconName: "Monitor",
    nepaliName: "कम्प्युटर मर्मत",
    description: "Laptop screen replacement, Windows OS format, SSD upgrades, Wi-Fi router setup, and hardware troubleshooting.",
    providersCount: 25,
    startingPrice: 500,
    emergencyAvailable: true,
    popularTasks: ["Laptop Screen Repair", "SSD & RAM Upgrade", "OS Installation & Virus Clean", "Home Wi-Fi Setup", "Thermal Paste & Cleaning"]
  },
  {
    id: "mobile-repair",
    name: "Mobile Repair",
    iconName: "Smartphone",
    nepaliName: "मोबाइल मर्मत",
    description: "Smartphone screen replacement, battery renewal, charging port repair, and motherboard issue diagnostics.",
    providersCount: 21,
    startingPrice: 400,
    emergencyAvailable: true,
    popularTasks: ["Display Glass Change", "Battery Replacement", "Charging Port Fix", "Speaker/Mic Repair", "Water Damage Recovery"]
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    iconName: "Cpu",
    nepaliName: "घरायसी उपकरण मर्मत",
    description: "Microwave ovens, washing machines, induction cooktops, water purifiers, and mixer grinder servicing.",
    providersCount: 29,
    startingPrice: 450,
    emergencyAvailable: true,
    popularTasks: ["Washing Machine Drum Fix", "Microwave Magnetron Repair", "Induction Cooktop Service", "RO Water Purifier Filter Change", "Mixer Grinder Coil"]
  },
  {
    id: "ac-fridge",
    name: "AC / Fridge Technician",
    iconName: "Snowflake",
    nepaliName: "एसी तथा फ्रिज मर्मत",
    description: "Air conditioner servicing, gas refilling, cooling thermostat issues, and double-door refrigerator troubleshooting.",
    providersCount: 23,
    startingPrice: 600,
    emergencyAvailable: true,
    popularTasks: ["AC Deep Jet Wash", "Freon Gas Refill", "Refrigerator Compressor Fix", "Thermostat Replacement", "AC Installation / Relocation"]
  },
  {
    id: "mechanic",
    name: "Mechanic (Bike & Car)",
    iconName: "Cog",
    nepaliName: "गाडी तथा मोटरसाइकल मेकानिक",
    description: "Doorstep bike servicing, flat tyre puncture fix, battery jumpstart, brake shoe adjustment, and car emergency repair.",
    providersCount: 31,
    startingPrice: 350,
    emergencyAvailable: true,
    popularTasks: ["On-Spot Puncture & Air", "Battery Jumpstart", "Bike Engine Oil & Filter", "Car Brake Pad Service", "Clutch Cable Fix"]
  },
  {
    id: "locksmith",
    name: "Locksmith",
    iconName: "Key",
    nepaliName: "ताला चाबी सेवा",
    description: "Emergency door lockout assistance, duplicate master key cutting, safe opening, and high-security deadbolt installation.",
    providersCount: 14,
    startingPrice: 400,
    emergencyAvailable: true,
    popularTasks: ["Emergency Door Opening", "Key Duplication", "Godrej Lock Installation", "Shutter Lock Servicing", "Padlock Cylinder Fix"]
  },
  {
    id: "moving",
    name: "Moving Service",
    iconName: "Truck",
    nepaliName: "सराई सेवा / सिफ्टिङ",
    description: "Room shifting, apartment relocation, furniture packaging, pickup truck logistics, and fragile goods loading.",
    providersCount: 16,
    startingPrice: 2500,
    emergencyAvailable: false,
    popularTasks: ["1BHK Room Shifting", "Full House Relocation", "Office Desk & Chair Moving", "Fragile Bubble Wrap Packing", "Tata Ace Truck Haulage"]
  },
  {
    id: "gardener",
    name: "Gardener",
    iconName: "Flower2",
    nepaliName: "माली सेवा",
    description: "Lawn mowing, hedge trimming, rooftop kitchen garden setup, organic fertilizer feeding, and pest spraying.",
    providersCount: 12,
    startingPrice: 600,
    emergencyAvailable: false,
    popularTasks: ["Rooftop Garden Care", "Lawn Trimming & De-weeding", "Potted Plant Re-potting", "Fruit Tree Pruning", "Organic Soil Preparation"]
  },
  {
    id: "laundry",
    name: "Laundry & Dry Clean",
    iconName: "Shirt",
    nepaliName: "लुगा धुलाइ तथा आइरन",
    description: "Doorstep laundry pickup and drop-off, blazer dry cleaning, duvet wash, and steam pressing services.",
    providersCount: 18,
    startingPrice: 300,
    emergencyAvailable: false,
    popularTasks: ["Suit & Daura Suruwal Dry Clean", "Blanket & Quilt Wash", "Daily Wash & Steam Fold", "Curtain Cleaning", "Shoe & Sneaker Restoration"]
  },
  {
    id: "home-maintenance",
    name: "Home Maintenance",
    iconName: "Home",
    nepaliName: "घर मर्मत तथा रेखदेख",
    description: "Comprehensive home checkups, tile grouting, drywall crack patching, gutter cleaning, and miscellaneous handyman tasks.",
    providersCount: 20,
    startingPrice: 500,
    emergencyAvailable: true,
    popularTasks: ["Tile & Grout Repair", "Wall Patchwork & Caulking", "Curtain Rod & Mirror Mounting", "Roof Gutter Clearing", "General Handyman 2-hr Visit"]
  }
];

export function getServiceById(id) {
  return serviceCategories.find(s => s.id === id) || null;
}
