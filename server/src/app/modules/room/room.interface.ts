export const STATUS = ['available', 'booked', 'maintenance', 'cleaning', 'dirty'];
type TStatus = 'available' | 'booked' | 'maintenance' | 'cleaning' | 'dirty';

export type TRoomOverview = {
  name: string;
  description: string;
  size: string;
  wireless_internet: string;
};

export type TBedsAndBedding = {
  maximum_occupancy: number;
  beds: string;
  rollaway_beds_permitted: boolean;
  cribs_permitted: number;
  duvet: boolean;
};

export type TRoomFeatures = {
  air_conditioned: boolean;
  non_smoking: boolean;
  connecting_rooms_available: boolean;
  windows: string;
  hooks: boolean;
  usb_outlets: boolean;
};

export type TBathAndBathroomFeatures = {
  separate_bathtub_and_shower: boolean;
  lighted_makeup_mirror: boolean;
  hair_dryer: boolean;
  robe: boolean;
  slippers: boolean;
};

export type TFurnitureAndFurnishings = {
  alarm_clock: boolean;
  safe_in_room: boolean;
  safe_fee: boolean;
  desk: boolean;
  electrical_outlet: boolean;
  iron_and_ironing_board: boolean;
  trouser_press: boolean;
};

export type TFoodAndBeverages = {
  room_service: string;
  bottled_water: string;
  coffee_tea_maker: boolean;
  instant_hot_water: boolean;
  minibar: string;
};

export type TInternetAndPhones = {
  phones: number;
  phone_features: string[];
  wireless_internet: string;
};

export type TEntertainment = {
  plug_in_high_tech_room: boolean;
  cable_satellite: boolean;
  international_channels: string[];
};

export type TAccessibleRoomFeatures = {
  mobility_accessible_rooms: boolean;
  roll_in_shower: boolean;
  hearing_accessible_rooms: boolean;
};

export type TRoom = {
  category: string;
  price: number;
  room_overview: TRoomOverview;
  special_benefits: string[];
  beds_and_bedding: TBedsAndBedding;
  room_features: TRoomFeatures;
  bath_and_bathroom_features: TBathAndBathroomFeatures;
  furniture_and_furnishings: TFurnitureAndFurnishings;
  food_and_beverages: TFoodAndBeverages;
  internet_and_phones: TInternetAndPhones;
  entertainment: TEntertainment;
  accessible_room_features: TAccessibleRoomFeatures;
  images: string[];
  status: TStatus;
  isDeleted: boolean;
};
