export const roomCategories = [
  "Executive Suite",
  "Deluxe Supreme",
  "Luxury Deluxe",
  "Luxury Twin",
  "Deluxe Twin",
  "Standard",
];

export const roomCategoryOptions = roomCategories.map((item) => ({
  value: item,
  label: item,
}));

export const roomCategories2 = {
  "Executive Suite, Deluxe Supreme, Luxury Deluxe": "2 adults, 1 infant",
  "Luxury Twin, Standard": "2 adults",
  "": "1 adult",
};

export const roomCategoryOptions2 = Object.keys(roomCategories2).map((item) => ({
  value: item,
  label: roomCategories2[item],
}));