/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Modal } from "antd";
import { useGetSingleRoomQuery } from "../../../redux/features/room/roomApi";
import { CarouselCustomNavigation } from "./Carousel/Carousel";
import Loading from "../../ui/Loading";

const RoomModal = ({ id }) => {
  const { data,isLoading } = useGetSingleRoomQuery(id);
  const [isOpen, setIsOpen] = useState(false);

  const roomData = data?.data;
  if (isLoading) return <Loading />;

  
  const {
    room_overview,
    special_benefits,
    beds_and_bedding,
    room_features,
    bath_and_bathroom_features,
    furniture_and_furnishings,
    food_and_beverages,
    internet_and_phones,
    entertainment,
    accessible_room_features,
  } = roomData;

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>
        {children}
      </p>
      <hr className="my-3 md:mb-5 md:mt-4" />
    </div>
  );

  const List = ({ items }) => (
    <ul className="list-disc pl-5">
      {items.map((item, index) => (
        <li className="text-base" key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-screen-3xl text-center">

      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center transition-colors duration-300 hover:text-gold text-center mx-auto"
      >
        <span className="mr-2 mx-auto"> View Details</span>
        <FaArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
      </button>
      <Modal
        width="90%"
        height="content"
        style={{
          maxWidth: "1560px",
          border: "4px solid #fff395",
          borderRadius: "10px",
          padding: "0",

        }}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <CarouselCustomNavigation images={roomData?.images} />
        <div className="pt-6 md:p-4">

          <h2 className="text-3xl pb-4">{roomData?.room_overview?.name}</h2>
          <p className="text-base">
            {roomData?.beds_and_bedding?.beds}
          </p>
          <div className="flex flex-wrap pb-3 md:pb-6">
            <p className="">{room_overview.description}</p>
            <p>, {room_overview.size}</p>
            <p>{beds_and_bedding.beds}, {room_overview.wireless_internet}, {room_overview.coffee_tea_maker ? 'Coffee/tea maker.' : '.'}</p>
          </div>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:p-3">
              <Section title="Room Overview">
                <p>{room_overview.name}</p>
              </Section>

              <Section title="Special Benefits">
                <List items={special_benefits} />
              </Section>

              <Section title="Beds and Bedding">
                <p>Maximum occupancy: {beds_and_bedding.maximum_occupancy}</p>
                <p>{beds_and_bedding.beds}</p>
                <p>Rollaway beds: {beds_and_bedding.rollaway_beds_permitted ? 'Permitted' : 'Not permitted'}</p>
                <p>Cribs permitted: {beds_and_bedding.cribs_permitted}</p>
                {beds_and_bedding.duvet && <p>Duvet</p>}
              </Section>

              <Section title="Room Features">
                <p>{room_features.air_conditioned ? 'Air-conditioned' : 'Non air-conditioned'}</p>
                <p>{room_features.non_smoking ? 'This room is non-smoking' : 'Smoking allowed'}</p>
                <p>Connecting rooms: {room_features.connecting_rooms_available ? 'Available' : 'Not available'}</p>
                <p>{room_features.windows}</p>
                {room_features.hooks && <p>Hooks</p>}
                {room_features.usb_outlets && <p>USB outlets</p>}
              </Section>

            </div>
              <div className="md:p-3">
            <Section title="Bath and Bathroom Features">
              <List items={Object.keys(bath_and_bathroom_features).filter(key => bath_and_bathroom_features[key] && key !== '_id').map(key => key.replace(/_/g, ' '))} />
            </Section>

            <Section title="Furniture and Furnishings">
              <List items={Object.keys(furniture_and_furnishings).filter(key => furniture_and_furnishings[key] && key !== '_id' && key !== 'safe_fee').map(key => key.replace(/_/g, ' '))} />
            </Section>

            <Section title="Food & Beverages">
              <p>Room service: {food_and_beverages.room_service}</p>
              <p>Bottled water: {food_and_beverages.bottled_water}</p>
              {food_and_beverages.coffee_tea_maker && <p>Coffee/tea maker</p>}
              {food_and_beverages.instant_hot_water && <p>Instant hot water</p>}
              <p>Minibar: {food_and_beverages.minibar}</p>
            </Section>

          </div>
          <div className="md:p-3">
            <Section title="Internet and Phones">
              <p>Phones: {internet_and_phones.phones}</p>
              <p>Phone features: {internet_and_phones.phone_features.join(', ')}</p>
              <p>{internet_and_phones.wireless_internet}</p>
            </Section>

            <Section title="Entertainment">
              {entertainment.plug_in_high_tech_room && <p>Plug-in, high-tech room</p>}
              {entertainment.cable_satellite && <p>Cable/satellite</p>}
              <p>International channels: {entertainment.international_channels.join(', ')}</p>
            </Section>

            <Section title="Accessible Room Features">
              <p>Mobility accessible rooms: {accessible_room_features.mobility_accessible_rooms ? 'Available' : 'Not available'}</p>
              <p>Roll-in shower: {accessible_room_features.roll_in_shower ? 'Available' : 'Not available'}</p>
              <p>Hearing accessible rooms: {accessible_room_features.hearing_accessible_rooms ? 'Available' : 'Not available'}</p>
            </Section>

          </div>
          </div>
        



        </div>

      </Modal>
    </div>
  );
};

export default RoomModal;
