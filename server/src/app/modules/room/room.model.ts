import { model, Schema } from "mongoose";
import { STATUS, TAccessibleRoomFeatures, TBathAndBathroomFeatures, TBedsAndBedding, TEntertainment, TFoodAndBeverages, TFurnitureAndFurnishings, TInternetAndPhones, TRoom, TRoomFeatures, TRoomOverview } from "./room.interface";

const roomOverviewSchema = new Schema<TRoomOverview>({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    size: { type: String, required: [true, 'Size is required'] },
    wireless_internet: { type: String, required: [true, 'Wireless internet is required'] },
})

const bedsAndBeddingSchema = new Schema<TBedsAndBedding>({
    maximum_occupancy: { type: Number, required: [true, 'Maximum occupancy is required'] },
    beds: { type: String, required: [true, 'Beds are required'] },
    rollaway_beds_permitted: { type: Boolean, default: false },
    cribs_permitted: { type: Number, default: 0 },
    duvet: { type: Boolean, default: false }
})

const roomFeaturesSchema = new Schema<TRoomFeatures>({
    air_conditioned: { type: Boolean, default: false },
    non_smoking: { type: Boolean, default: false },
    connecting_rooms_available: { type: Boolean, default: false },
    windows: { type: String, required: [true, 'Windows are required'] },
    hooks: { type: Boolean, default: false },
    usb_outlets: { type: Boolean, default: false }
})

const bathAndBathroomFeaturesSchema = new Schema<TBathAndBathroomFeatures>({
    separate_bathtub_and_shower: { type: Boolean, default: false },
    lighted_makeup_mirror: { type: Boolean, default: false },
    hair_dryer: { type: Boolean, default: false },
    robe: { type: Boolean, default: false },
    slippers: { type: Boolean, default: false }
})

const furnitureAndFurnishingsSchema = new Schema<TFurnitureAndFurnishings>({
    alarm_clock: { type: Boolean, default: false },
    safe_in_room: { type: Boolean, default: false },
    safe_fee: { type: Boolean, default: false },
    desk: { type: Boolean, default: false },
    electrical_outlet: { type: Boolean, default: false },
    iron_and_ironing_board: { type: Boolean, default: false },
    trouser_press: { type: Boolean, default: false }
})

const foodAndBeveragesSchema = new Schema<TFoodAndBeverages>({
    room_service: { type: String, required: [true, 'Room service is required'] },
    bottled_water: { type: String, required: [true, 'Bottled water is required'] },
    coffee_tea_maker: { type: Boolean, default: false },
    instant_hot_water: { type: Boolean, default: false },
    minibar: { type: String, required: [true, 'Minibar is required'] }
})

const internetAndPhonesSchema = new Schema<TInternetAndPhones>({
    phones: { type: Number },
    phone_features: { type: [String] },
    wireless_internet: { type: String }
})

const entertainmentSchema = new Schema<TEntertainment>({
    plug_in_high_tech_room: { type: Boolean, default: false },
    cable_satellite: { type: Boolean, default: false },
    international_channels: { type: [String] }
})

const accessible_room_featuresSchema = new Schema<TAccessibleRoomFeatures>({
    mobility_accessible_rooms: { type: Boolean, default: false },
    hearing_accessible_rooms: { type: Boolean, default: false },
    roll_in_shower: { type: Boolean, default: false }
})

const roomSchema = new Schema<TRoom>({
    category: { type: String, required: [true, 'Category is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    room_overview: { type: roomOverviewSchema, required: [true, 'Room overview is required'] },
    special_benefits: { type: [String], required: [true, 'Special benefits are required'] },
    beds_and_bedding: { type: bedsAndBeddingSchema, required: [true, 'Beds and bedding are required'] },
    room_features: { type: roomFeaturesSchema, required: [true, 'Room features are required'] },
    bath_and_bathroom_features: { type: bathAndBathroomFeaturesSchema, required: [true, 'Bath and bathroom features are required'] },
    furniture_and_furnishings: { type: furnitureAndFurnishingsSchema, required: [true, 'Furniture and furnishings are required'] },
    food_and_beverages: { type: foodAndBeveragesSchema, required: [true, 'Food and beverages are required'] },
    internet_and_phones: { type: internetAndPhonesSchema, required: [true, 'Internet and phones are required'] },
    entertainment: { type: entertainmentSchema, required: [true, 'Entertainment is required'] },
    accessible_room_features: { type: accessible_room_featuresSchema, required: [true, 'Accessible room features are required'] },
    images: { type: [String], required: [true, 'Images are required'] },
    status: { type: String, enum: STATUS, required: [true, 'Status is required'] },
    isDeleted: { type: Boolean, default: false }
},
{
    toJSON: {
        virtuals: true,
    }
}
)

export const Room = model<TRoom>('Room', roomSchema);