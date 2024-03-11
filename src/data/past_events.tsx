export interface PastEvent {
  name: string;
  date: string;
  description: string;
  images: string[];
}

export const pastEvents: PastEvent[] = [
  {
    name: "KPIB X TASC Fundraising",
    date: "February 2nd 2024, University YMCA",
    description:
      '"Pasar Malam" was a premier event of the past Fall semester, featuring collaborations with RSOs like HKSA to offer a taste of authentic Indonesian cuisine and traditional performances.',
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
    description:
      '"Pasar Malam" was a premier event of the past Fall semester, featuring collaborations with RSOs like HKSA to offer a taste of authentic Indonesian cuisine and traditional performances.',
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
    name: "Pasar Malam",
    date: "November 11th 2023, University YMCA",
    description:
      '"Pasar Malam" was a premier event of the past Fall semester, featuring collaborations with RSOs like HKSA to offer a taste of authentic Indonesian cuisine and traditional performances.',
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
    description:
      "🎃 Getting spooky with a Pumpkin Potluck! Who's in for a gourd time? 🍂🥘  . Come and celebrate the magic of the season at our Pumpkin Halloween Potluck! 🎃✨",
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
    description: "We celebrated batik day with the Permias community",
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
