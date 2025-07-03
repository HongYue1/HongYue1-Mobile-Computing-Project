export const fruits = [
  {
    id: "fruit-001",
    name: "orange pack",
    pieces: "7pcs",
    price: 7.99,
    img: "https://cdn.pixabay.com/photo/2016/02/23/17/42/orange-1218158_960_720.png",
    weight: "1 Kilogram",
  },
  {
    id: "fruit-002",
    name: "pine apple",
    pieces: "7pcs",
    price: 19.99,
    img: "https://static.vecteezy.com/system/resources/previews/008/848/362/non_2x/fresh-pineapple-free-png.png",
    weight: "1 Kilogram",
  },
  {
    id: "fruit-003",
    name: "apple pack",
    pieces: "7pcs",
    price: 8.99,
    img: "https://pngcore.com/files/preview/728x532/11688461164zbauk5b8wvfpzwvsadluebm07erksprzpctdvcisj7vn52runv0mcu77kytn8i06ycxosuqfmoenf1mtkutvjicrnvutnexjjzno.png",
    weight: "1 Kilogram",
  },
  {
    id: "fruit-004",
    name: "banana",
    pieces: "7pcs",
    price: 12.99,
    img: "https://pngcore.com/files/preview/1280x988/116895796714jv5d9xe39pzzhhzc7psswbzgcp2x5ycvxy1fhdazifkad66memsjet5u7mviicewxvpafh2tlzbbsispmdtmznxt2yhlecmka3h.png",
    weight: "1 Kilogram",
  },
];

export const dropdownData = [
  {
    id: "dropdown-001",
    title: "Product Details",
    content:
      "Apples are usually a good source of vitamins and minerals, including vitamin C and potassium. Vitamin C: Also called ascorbic acid, vitamin C is a common antioxidant in fruits. It's an essential dietary nutrient that has many important functions in your body",
  },
  {
    id: "dropdown-002",
    title: "Nutrition",
    content:
      "Apples are usually a good source of vitamins and minerals, including vitamin C and potassium. Vitamin C: Also called ascorbic acid, vitamin C is a common antioxidant in fruits. It's an essential dietary nutrient that has many important functions in your body",
  },
  {
    id: "dropdown-003",
    title: "Reviews",
    content: "4 reviews found",
  },
];

export const auctions = [
  {
    id: "auction-001",
    title: "Fresh Oranges (700kg)",
    image: "https://cdn.pixabay.com/photo/2016/02/23/17/42/orange-1218158_960_720.png",
    description: "Bid for a box of fresh Oranges from our latest harvest!",
    currentBid: 1550.0,
    endTime: "2025-07-10T18:00:00Z",
    bids: [
      { user: "Jane Doe", amount: 1550.0 },
      { user: "John Smith", amount: 1350.0 },
    ],
    owner: "merchant1@example.com",
  },
  {
    id: "auction-002",
    title: "Pineapples (650kg)",
    image: "https://static.vecteezy.com/system/resources/previews/008/848/362/non_2x/fresh-pineapple-free-png.png",
    description: "Auction for a batch of freshly imported Pineapples. Perfect for sweets!",
    currentBid: 1800.0,
    endTime: "2025-07-12T12:00:00Z",
    bids: [
      { user: "Alice", amount: 1800.0 },
      { user: "Bob", amount: 1750.0 },
    ],
    owner: "merchant2@example.com",
  },
  {
    id: "auction-003",
    title: "Eggs (900pcs)",
    image: "https://static.vecteezy.com/system/resources/previews/035/271/514/large_2x/ai-generated-chicken-eggs-pack-on-transparent-background-ai-generated-free-png.png",
    description: "Auction for a batch of freshly imported Pineapples. Perfect for sweets!",
    currentBid: 900.0,
    endTime: "2025-07-12T12:00:00Z",
    bids: [
      { user: "Alice", amount: 900.0 },
      { user: "Bob", amount: 720.0 },
    ],
    owner: "merchant2@example.com",
  },
];


export const products = [
  // Fruits & Vegetables
  { id: 'prod-001', name: 'Bananas', category: 'Fruits', price: 12.99, img: require('../assets/CropsAndFreshProduces/bananas.jpg'), weight: '1kg', pieces: '6pcs', color: '#FFE135' },
  { id: 'prod-002', name: 'Green Apple', category: 'Fruits', price: 14.99, img: require('../assets/CropsAndFreshProduces/greenApple.jpg'), weight: '1kg', pieces: '5pcs', color: '#8DB600' },
  { id: 'prod-003', name: 'Red Apple', category: 'Fruits', price: 13.99, img: require('../assets/CropsAndFreshProduces/redApple.jpg'), weight: '1kg', pieces: '5pcs', color: '#D7263D' },
  { id: 'prod-004', name: 'Grapes', category: 'Fruits', price: 10.99, img: require('../assets/CropsAndFreshProduces/grapes.jpg'), weight: '500g', pieces: '1 bunch', color: '#6F2DA8' },
  { id: 'prod-005', name: 'Strawberry', category: 'Fruits', price: 15.99, img: require('../assets/CropsAndFreshProduces/strawberry.jpg'), weight: '500g', pieces: '1 box', color: '#FC5A8D' },
  { id: 'prod-006', name: 'Carrot', category: 'Vegetables', price: 7.99, img: require('../assets/CropsAndFreshProduces/carrot1.jpg'), weight: '1kg', pieces: '8pcs', color: '#FFA500' },
  { id: 'prod-007', name: 'Cauliflower', category: 'Vegetables', price: 9.99, img: require('../assets/CropsAndFreshProduces/cauliflower.jpg'), weight: '1 head', pieces: '1pc', color: '#F6F7EB' },
  { id: 'prod-008', name: 'Chili Peppers', category: 'Vegetables', price: 6.99, img: require('../assets/CropsAndFreshProduces/chiliPeppers.jpg'), weight: '250g', pieces: '1 pack', color: '#D7263D' },
  { id: 'prod-009', name: 'Corn', category: 'Vegetables', price: 8.99, img: require('../assets/CropsAndFreshProduces/corn.jpg'), weight: '2 ears', pieces: '2pcs', color: '#FFD700' },
  { id: 'prod-010', name: 'Cucumbers', category: 'Vegetables', price: 7.99, img: require('../assets/CropsAndFreshProduces/cucumbers.jpg'), weight: '1kg', pieces: '6pcs', color: '#4CBB17' },
  { id: 'prod-011', name: 'Lemon', category: 'Fruits', price: 5.99, img: require('../assets/CropsAndFreshProduces/lemon.jpg'), weight: '500g', pieces: '4pcs', color: '#FFF44F' },
  { id: 'prod-012', name: 'Onion', category: 'Vegetables', price: 4.99, img: require('../assets/CropsAndFreshProduces/onion1.jpg'), weight: '1kg', pieces: '5pcs', color: '#E2C290' },
  { id: 'prod-013', name: 'Pears', category: 'Fruits', price: 11.99, img: require('../assets/CropsAndFreshProduces/pears.jpg'), weight: '1kg', pieces: '5pcs', color: '#D1E231' },
  { id: 'prod-014', name: 'Peas', category: 'Vegetables', price: 8.99, img: require('../assets/CropsAndFreshProduces/peas.jpg'), weight: '500g', pieces: '1 pack', color: '#7ED957' },
  { id: 'prod-015', name: 'Potato', category: 'Vegetables', price: 6.99, img: require('../assets/CropsAndFreshProduces/potato1.jpg'), weight: '1kg', pieces: '6pcs', color: '#E4D96F' },
  { id: 'prod-016', name: 'Tomato', category: 'Vegetables', price: 7.99, img: require('../assets/CropsAndFreshProduces/tomato1.jpg'), weight: '1kg', pieces: '6pcs', color: '#FF6347' },
  // Dairy & Livestock
  { id: 'prod-017', name: 'Milk', category: 'Dairy', price: 9.99, img: require('../assets/DairyAndLivestock/milk1.jpg'), weight: '1L', pieces: '1 bottle' },
  { id: 'prod-018', name: 'Eggs', category: 'Dairy', price: 12.99, img: require('../assets/DairyAndLivestock/egg1.jpg'), weight: '12pcs', pieces: '12pcs' },
  { id: 'prod-019', name: 'Butter', category: 'Dairy', price: 15.99, img: require('../assets/DairyAndLivestock/butter.jpg'), weight: '200g', pieces: '1 pack' },
  { id: 'prod-020', name: 'Feta Cheese', category: 'Dairy', price: 18.99, img: require('../assets/DairyAndLivestock/fetaCheese.jpg'), weight: '250g', pieces: '1 pack' },
  { id: 'prod-021', name: 'Chicken Breast', category: 'Meat', price: 29.99, img: require('../assets/DairyAndLivestock/chickenBreasts.jpg'), weight: '500g', pieces: '2pcs' },
  { id: 'prod-022', name: 'Sirloin Steak', category: 'Meat', price: 49.99, img: require('../assets/DairyAndLivestock/sirloinSteak.jpg'), weight: '400g', pieces: '1pc' },
  // Seeds & Saplings
  { id: 'prod-023', name: 'Carrot Seeds', category: 'Seeds', price: 5.99, img: require('../assets/SeedsAndSaplings/burpeeCarrotSeeds.webp'), weight: '1 pack', pieces: '1 pack' },
  { id: 'prod-024', name: 'Pea Seeds', category: 'Seeds', price: 5.99, img: require('../assets/SeedsAndSaplings/burpeePeaSeeds.webp'), weight: '1 pack', pieces: '1 pack' },
  { id: 'prod-025', name: 'Sweet Pepper Seeds', category: 'Seeds', price: 6.99, img: require('../assets/SeedsAndSaplings/burpeeSweetPepperSeeds.webp'), weight: '1 pack', pieces: '1 pack' },
  { id: 'prod-026', name: 'Watermelon Seeds', category: 'Seeds', price: 6.99, img: require('../assets/SeedsAndSaplings/burpeeWatermelonSeeds.webp'), weight: '1 pack', pieces: '1 pack' },
  // AgriTech
  { id: 'prod-027', name: 'Grain Header', category: 'AgriTech', price: 199.99, img: require('../assets/agriTech/product-image16-copyright.jpg'), weight: '1 unit', pieces: '1pc' },
  { id: 'prod-028', name: 'Tractor', category: 'AgriTech', price: 899.99, img: require('../assets/agriTech/product-image17-copyright.jpg'), weight: '1 unit', pieces: '1pc' },
  { id: 'prod-029', name: 'Meadow Roller', category: 'AgriTech', price: 249.99, img: require('../assets/agriTech/product-image18-copyright.jpg'), weight: '1 unit', pieces: '1pc' },
];
