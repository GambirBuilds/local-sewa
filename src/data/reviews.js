/**
 * Local Sewa - Customer Reviews Dataset
 */

export const initialReviews = [
  {
    id: "rev1",
    providerId: "p1",
    customerName: "Aayush Sharma",
    location: "New Baneshwor, Kathmandu",
    rating: 5,
    date: "2026-09-28",
    serviceName: "Ceiling Fan Installation / Repair",
    comment: "Ram dai reached within 20 minutes of my request! Very polite, diagnosed the burnt capacitor in no time, and replaced it cleanly. No hidden charges.",
    verifiedBooking: true
  },
  {
    id: "rev2",
    providerId: "p1",
    customerName: "Prashant K.C.",
    location: "Min Bhawan, Kathmandu",
    rating: 5,
    date: "2026-09-15",
    serviceName: "Inverter & Battery Wiring",
    comment: "Extremely skilled electrician. He re-routed our old wiring so the load shedding backup switches smoothly without tripping the breaker. Highly recommend!",
    verifiedBooking: true
  },
  {
    id: "rev3",
    providerId: "p1",
    customerName: "Shristi Pradhan",
    location: "Shantinagar, Kathmandu",
    rating: 4,
    date: "2026-08-30",
    serviceName: "Switchboard & Socket Replacement",
    comment: "Quick work and fair pricing. Cleaned up the plastic wire clippings before leaving. Will call him again.",
    verifiedBooking: true
  },
  {
    id: "rev4",
    providerId: "p2",
    customerName: "Rajeev Manandhar",
    location: "Pulchowk, Lalitpur",
    rating: 5,
    date: "2026-09-22",
    serviceName: "Water Pump / Motor Installation",
    comment: "Bijay dai is the most dependable plumber in Patan. Our boring water pump was sucking air for two days. He fixed the check valve and primed it in an hour.",
    verifiedBooking: true
  },
  {
    id: "rev5",
    providerId: "p2",
    customerName: "Sujata Joshi",
    location: "Sanepa, Lalitpur",
    rating: 5,
    date: "2026-09-10",
    serviceName: "Tap & Basin Leak Repair",
    comment: "Prompt response. Fixed two leaky mixers in the kitchen and master bath. Courteous and brought his own spare washers.",
    verifiedBooking: true
  },
  {
    id: "rev6",
    providerId: "p6",
    customerName: "Bibek Neupane",
    location: "Baluwatar, Kathmandu",
    rating: 5,
    date: "2026-09-25",
    serviceName: "Laptop Screen / Keyboard Replacement",
    comment: "Rohan brought a replacement display to my home and changed it in front of me in 25 minutes. Tested color calibration too. Top-notch service!",
    verifiedBooking: true
  },
  {
    id: "rev7",
    providerId: "p7",
    customerName: "Nabin Thapa",
    location: "Kalanki, Kathmandu",
    rating: 5,
    date: "2026-09-29",
    serviceName: "Tubeless Tyre Puncture On-Spot",
    comment: "Got stuck with a flat tyre near Kalanki underpass on my way to office. Requested Gopal dai on Local Sewa and he reached on his scooter within 12 minutes with portable air compressor. Lifesaver!",
    verifiedBooking: true
  },
  {
    id: "rev8",
    providerId: "p10",
    customerName: "Dikshya Gurung",
    location: "Boudha, Kathmandu",
    rating: 5,
    date: "2026-09-18",
    serviceName: "Emergency Door Lockout Unlock",
    comment: "Door locked from inside with keys on dining table. Narayan dai unlocked the deadbolt without any damage or scratches to the teak door. Very grateful.",
    verifiedBooking: true
  }
];

export function getReviewsByProviderId(providerId) {
  return initialReviews.filter(r => r.providerId === providerId);
}
