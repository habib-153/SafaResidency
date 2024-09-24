import  { useRef } from 'react';

const AddRoom = () => {
    const categoryRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const sizeRef = useRef();
    const wifiRef = useRef();
    const roomNumberRef = useRef();
    const occupancyRef = useRef();
    const bedsRef = useRef();
    const rollawayBedsRef = useRef();
    const cribsRef = useRef();
    const duvetRef = useRef();
    const airConditionedRef = useRef();
    const nonSmokingRef = useRef();
    const connectingRoomsRef = useRef();
    const windowsRef = useRef();
    const hooksRef = useRef();
    const usbOutletsRef = useRef();
    const bathtubShowerRef = useRef();
    const makeupMirrorRef = useRef();
    const hairDryerRef = useRef();
    const robeRef = useRef();
    const slippersRef = useRef();
    const alarmClockRef = useRef();
    const safeRef = useRef();
    const safeFeeRef = useRef();
    const deskRef = useRef();
    const outletRef = useRef();
    const ironRef = useRef();
    const roomServiceRef = useRef();
    const bottledWaterRef = useRef();
    const coffeeTeaMakerRef = useRef();
    const hotWaterRef = useRef();
    const minibarRef = useRef();
    const phonesRef = useRef();
    const voicemailRef = useRef();
    const speakerRef = useRef();
    const cableSatelliteRef = useRef();
    const internationalChannelsRef = useRef();
    const hearingAccessibleRef = useRef();
    const priceRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRoom = {
            category: categoryRef.current.value,
            room_overview: {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                size: sizeRef.current.value,
                wireless_internet: wifiRef.current.value,
                room_number: roomNumberRef.current.value,
            },
            special_benefits: ['Access to Executive Lounge', 'Welcome fruit basket'], // Example benefits
            beds_and_bedding: {
                maximum_occupancy: occupancyRef.current.value,
                beds: bedsRef.current.value,
                rollaway_beds_permitted: rollawayBedsRef.current.checked,
                cribs_permitted: cribsRef.current.checked,
                duvet: duvetRef.current.checked,
            },
            room_features: {
                air_conditioned: airConditionedRef.current.checked,
                non_smoking: nonSmokingRef.current.checked,
                connecting_rooms_available: connectingRoomsRef.current.checked,
                windows: windowsRef.current.value,
                hooks: hooksRef.current.checked,
                usb_outlets: usbOutletsRef.current.checked,
            },
            bath_and_bathroom_features: {
                separate_bathtub_and_shower: bathtubShowerRef.current.checked,
                lighted_makeup_mirror: makeupMirrorRef.current.checked,
                hair_dryer: hairDryerRef.current.checked,
                robe: robeRef.current.checked,
                slippers: slippersRef.current.checked,
            },
            furniture_and_furnishings: {
                alarm_clock: alarmClockRef.current.checked,
                safe_in_room: safeRef.current.checked,
                safe_fee: safeFeeRef.current.checked,
                desk: deskRef.current.checked,
                electrical_outlet: outletRef.current.checked,
                iron_and_ironing_board: ironRef.current.checked,
            },
            food_and_beverages: {
                room_service: roomServiceRef.current.value,
                bottled_water: bottledWaterRef.current.value,
                coffee_tea_maker: coffeeTeaMakerRef.current.checked,
                instant_hot_water: hotWaterRef.current.checked,
                minibar: minibarRef.current.value,
            },
            internet_and_phones: {
                phones: phonesRef.current.value,
                phone_features: [
                    voicemailRef.current.checked ? 'Voicemail' : null,
                    speakerRef.current.checked ? 'Speaker' : null,
                ].filter(Boolean),
            },
            entertainment: {
                cable_satellite: cableSatelliteRef.current.checked,
                international_channels: internationalChannelsRef.current.value.split(','),
            },
            accessible_room_features: {
                hearing_accessible_rooms: hearingAccessibleRef.current.checked,
            },
            price: priceRef.current.value,
        };
        // addRoom(newRoom);
        console.log(newRoom);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Add New Room</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <label className="block">
                    Category:
                    <input type="text" ref={categoryRef} className="input-text" placeholder="Master bedroom with balcony" required />
                </label>
                {/* Room Overview */}
                <label className="block">
                    Room Name:
                    <input type="text" ref={nameRef} className="input-text" placeholder="Deluxe King Room" required />
                </label>
                <label className="block">
                    Description:
                    <input type="text" ref={descriptionRef} className="input-text" placeholder="Spacious room with city view" required />
                </label>
                <label className="block">
                    Size:
                    <input type="text" ref={sizeRef} className="input-text" placeholder="40 sq m / 430 sq ft" required />
                </label>
                <label className="block">
                    Wireless Internet:
                    <input type="text" ref={wifiRef} className="input-text" placeholder="Complimentary high-speed WiFi" required />
                </label>
                <label className="block">
                    Room Number:
                    <input type="text" ref={roomNumberRef} className="input-text" placeholder="332" required />
                </label>

                {/* Add inputs for other fields in a similar fashion */}

                {/* Price */}
                <label className="block">
                    Price:
                    <input type="number" ref={priceRef} className="input-text" placeholder="5500" required />
                </label>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
                        Add Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;
