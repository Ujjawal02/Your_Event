const events = [
  {
    title: "Rock Concert",
    description: "An electrifying night of rock music.",
    image: {
      filename: "rockconcert.jpg",
      url: "https://plus.unsplash.com/premium_photo-1681503973024-375f6e49b9f1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um9jayUyMENvbmNlcnR8ZW58MHx8MHx8fDA%3D"
    },
    price: 500,
    ticketsAvailable: 120,
    venue: "City Stadium",
    date: "2026-03-15"
  },
  {
    title: "Tech Conference",
    description: "Latest innovations in AI and software.",
    image: {
      filename: "techconf.jpg",
      url: "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVjaCUyMENvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D"
    },
    price: 1000,
    ticketsAvailable: 300,
    venue: "Convention Center",
    date: "2026-04-10"
  },
  {
    title: "Comedy Show",
    description: "Stand-up comedy with famous comedians.",
    image: {
      filename: "comedyshow.jpg",
      url: "https://images.unsplash.com/photo-1682632618859-47904338bea1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q29tZWR5JTIwU2hvd3xlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 350,
    ticketsAvailable: 200,
    venue: "Grand Theater",
    date: "2026-02-25"
  },
  {
    title: "Food Festival",
    description: "Taste cuisines from around the world.",
    image: {
      filename: "foodfest.jpg",
      url: "https://images.unsplash.com/photo-1675674683873-1232862e3c64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Rm9vZCUyMEZlc3RpdmFsfGVufDB8fDB8fHww"
    },
    price: 100,
    ticketsAvailable: 500,
    venue: "Central Park",
    date: "2026-05-05"
  },
  {
    title: "Cricket Match",
    description: "Exciting T20 cricket match.",
    image: {
      filename: "cricketmatch.jpg",
      url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3JpY2tldCUyME1hdGNofGVufDB8fDB8fHww"
    },
    price: 750,
    ticketsAvailable: 1000,
    venue: "National Stadium",
    date: "2026-03-20"
  },
  {
    title: "Art Exhibition",
    description: "Modern art and sculpture showcase.",
    image: {
      filename: "artexhibition.jpg",
      url: "https://images.unsplash.com/photo-1566954979172-eaba308acdf0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXJ0JTIwRXhoaWJpdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 200,
    ticketsAvailable: 150,
    venue: "Art Gallery",
    date: "2026-06-01"
  },
  {
    title: "Dance Workshop",
    description: "Learn contemporary dance styles.",
    image: {
      filename: "danceworkshop.jpg",
      url: "https://images.unsplash.com/photo-1706604342065-f36f34513a9f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGFuY2UlMjBXb3Jrc2hvcHxlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 250,
    ticketsAvailable: 80,
    venue: "Community Hall",
    date: "2026-02-18"
  },
  {
    title: "Startup Pitch Night",
    description: "Entrepreneurs pitch their ideas to investors.",
    image: {
      filename: "pitchnight.jpg",
      url: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3RhcnR1cCUyMFBpdGNoJTIwTmlnaHR8ZW58MHx8MHx8fDA%3D"
    },
    price: 400,
    ticketsAvailable: 100,
    venue: "Innovation Hub",
    date: "2026-04-25"
  },
  {
    title: "Book Fair",
    description: "Books from all genres and authors.",
    image: {
      filename: "bookfair.jpg",
      url: "https://images.unsplash.com/photo-1631888722728-1578b7ba6dee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qm9vayUyMEZhaXJ8ZW58MHx8MHx8fDA%3D"
    },
    price: 50,
    ticketsAvailable: 600,
    venue: "Library Grounds",
    date: "2026-07-12"
  },
  {
    title: "Film Festival",
    description: "Screening of award-winning films.",
    image: {
      filename: "filmfestival.jpg",
      url: "https://images.unsplash.com/photo-1527979809431-ea3d5c0c01c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmlsbSUyMEZlc3RpdmFsfGVufDB8fDB8fHww"
    },
    price: 600,
    ticketsAvailable: 250,
    venue: "Cinema Complex",
    date: "2026-08-20"
  },
  {
    title: "Luxury Fashion Gala",
    description: "Exclusive fashion showcase featuring world-class designers.",
    image: {
      filename: "fashiongala.jpg",
      url: "https://images.unsplash.com/photo-1768885560973-454bc193824d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8THV4dXJ5JTIwRmFzaGlvbiUyMEdhbGF8ZW58MHx8MHx8fDA%3D"
    },
    price: 5000,
    ticketsAvailable: 150,
    venue: "Grand Ballroom, Taj Hotel",
    date: "2026-09-15"
  },
  {
    title: "International Business Summit",
    description: "Global leaders discuss future of trade and technology.",
    image: {
      filename: "businesssummit.jpg",
      url: "https://media.istockphoto.com/id/1405593849/photo/brics-economy-and-policies-concept-flags-of-brics-or-group-of-five-major-emerging-national.webp?a=1&b=1&s=612x612&w=0&k=20&c=FFNxcQCq7UAWByG5PF8PpdnBJY-erf5icawxapGVaV4="
    },
    price: 8000,
    ticketsAvailable: 300,
    venue: "World Trade Center",
    date: "2026-10-20"
  },
  {
    title: "Opera Night",
    description: "A mesmerizing evening of classical opera performances.",
    image: {
      filename: "opera.jpg",
      url: "https://images.unsplash.com/photo-1681634990342-645b6ffd0f6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T3BlcmElMjBOaWdodHxlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 4000,
    ticketsAvailable: 200,
    venue: "Royal Opera House",
    date: "2026-11-05"
  },
  {
    title: "Luxury Wine Tasting",
    description: "Taste rare wines with expert sommeliers.",
    image: {
      filename: "winetasting.jpg",
      url: "https://images.unsplash.com/photo-1760856269357-e82ffeb240d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8THV4dXJ5JTIwV2luZSUyMFRhc3Rpbmd8ZW58MHx8MHx8fDA%3D"
    },
    price: 3500,
    ticketsAvailable: 100,
    venue: "Vineyard Estate",
    date: "2026-08-12"
  },
  {
    title: "International Film Premiere",
    description: "Exclusive red-carpet premiere of a blockbuster movie.",
    image: {
      filename: "filmpremiere.jpg",
      url: "https://images.unsplash.com/photo-1695470873064-332db8498a5e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW50ZXJuYXRpb25hbCUyMEZpbG0lMjBQcmVtaWVyZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 6000,
    ticketsAvailable: 250,
    venue: "IMAX Grand Cinema",
    date: "2026-07-30"
  },
  {
    title: "VIP Music Festival",
    description: "Front-row access to performances by global artists.",
    image: {
      filename: "vipmusic.jpg",
      url: "https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JTIyVklQJTIwTXVzaWMlMjBGZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 7000,
    ticketsAvailable: 500,
    venue: "Open Grounds, Mumbai",
    date: "2026-12-10"
  },
  {
    title: "Luxury Cruise Party",
    description: "An unforgettable evening aboard a luxury cruise ship.",
    image: {
      filename: "cruiseparty.jpg",
      url: "https://images.unsplash.com/photo-1678122878190-b8a567929f6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8THV4dXJ5JTIwQ3J1aXNlJTIwUGFydHl8ZW58MHx8MHx8fDA%3D"
    },
    price: 10000,
    ticketsAvailable: 80,
    venue: "Arabian Sea Cruise",
    date: "2026-06-25"
  },
  {
    title: "Exclusive Art Auction",
    description: "Bid on rare artworks from renowned artists.",
    image: {
      filename: "artauction.jpg",
      url: "https://plus.unsplash.com/premium_photo-1755101182831-bdd32345b9c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RXhjbHVzaXZlJTIwQXJ0JTIwQXVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 4500,
    ticketsAvailable: 120,
    venue: "National Art Gallery",
    date: "2026-09-02"
  },
  {
    title: "Luxury Sports Car Expo",
    description: "Showcase of the latest supercars and luxury vehicles.",
    image: {
      filename: "carexpo.jpg",
      url: "https://images.unsplash.com/photo-1749390267684-78cdc0251d97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8THV4dXJ5JTIwU3BvcnRzJTIwQ2FyJTIwRXhwb3xlbnwwfHwwfHx8MA%3D%3D"
    },
    price: 5500,
    ticketsAvailable: 400,
    venue: "Expo Center, Delhi",
    date: "2026-08-18"
  },
  {
    title: "Royal Banquet Dinner",
    description: "An exclusive dining experience with celebrity chefs.",
    image: {
      filename: "banquet.jpg",
      url: "https://images.unsplash.com/photo-1714773804930-56124267152b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Um95YWwlMjBCYW5xdWV0JTIwRGlubmVyfGVufDB8fDB8fHww"
    },
    price: 9000,
    ticketsAvailable: 100,
    venue: "Palace Grounds",
    date: "2026-11-22"
  }
];

module.exports = { data: events };




  

