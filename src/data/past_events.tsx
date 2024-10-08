export interface PastEvent {
  name: string;
  date: string;
  images: string[];
}

export const pastEvents: PastEvent[] = [
  {
    name: "Welcoming Event 2024 - Mingle & Connect",
    date: "August 31 2024, Scotts Park",
    images: [
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/one.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/two.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/three.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/four.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/five.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/six.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/seven.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/eight.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/nine.png",
      process.env.PUBLIC_URL + "/events/welcoming_event_2024/ten.png",
    ],
  },
  {
    name: "Buka Bersama Permias UIUC X Komunitas Pengajian Urbana-Champaign",
    date: "March 23 2024, Orchard Downs Community Center",
    images: [
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/one.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/five.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/seven.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/two.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/six.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/eight.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/nine.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/ten.jpg",
      process.env.PUBLIC_URL + "/events/buka_bersama_2024/eleven.jpg",
    ],
  },
  {
    name: "KPIB X TASC Fundraising",
    date: "February 2nd 2024, University YMCA",
    images: [
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/three.jpg",
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/one.jpg",
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/two.jpg",
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/four.jpg",
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/five.jpg",
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/six.jpg",
      process.env.PUBLIC_URL + "/events/kpib_fundraising_2024/seven.jpg",
    ],
  },
  {
    name: "Pasar Malam",
    date: "November 11th 2023, University YMCA",
    images: [
      process.env.PUBLIC_URL + "/events/pasmal_2023/three.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/one.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/two.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/four.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/five.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/six.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/seven.jpg",
      process.env.PUBLIC_URL + "/events/pasmal_2023/eight.jpg",
    ],
  },
  {
    name: "Pumpkin Potluck",
    date: "October 28th 2023, Hub on Campus",
    images: [
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/two.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/one.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/three.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/four.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/five.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/six.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/seven.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/eight.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/nine.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/ten.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/twelve.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/threeee.jpg",
      process.env.PUBLIC_URL + "/events/pumpkin_potluck_2023/fourteen.jpg",
    ],
  },
  {
    name: "Batik Day",
    date: "October 2nd 2023, Main Quad",
    images: [
      process.env.PUBLIC_URL + "/events/batik_day_2023/seven.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/five.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/one.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/two.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/six.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/eight.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/nine.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/ten.jpg",
      process.env.PUBLIC_URL + "/events/batik_day_2023/eleven.jpg",
    ],
  },
  // Add more past events here
];
