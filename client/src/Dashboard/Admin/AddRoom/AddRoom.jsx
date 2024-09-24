import  { useState } from "react";
import { Input, Checkbox, Button, Select, Option, Textarea, Switch } from "@material-tailwind/react"; // Using Material Tailwind

const AddRoom = () => {
    const [roomData, setRoomData] = useState({
        roomOverview: {
            name: "Deluxe King Room",
            description: "Spacious room with city view and modern amenities",
            size: "40 sq m / 430 sq ft",
            wireless_internet: "Complimentary high-speed WiFi",
            room_number: "332",
        },
        specialBenefits: [
            "Access to Executive Lounge",
            "Welcome fruit basket",
        ],
        bedding: {
            maximum_occupancy: 2,
            beds: "1 King Bed",
            rollaway_beds_permitted: true,
            cribs_permitted: 1,
            duvet: true,
        },
        selectedOptions: ["1 King Bed"],
        availableOptions: [
            "1 King Bed",
            "2 Queen Beds",
            "1 Sofa Bed",
        ],
        roomFeatures: {
            air_conditioned: true,
            non_smoking: true,
            connecting_rooms_available: false,
            windows: "Floor-to-ceiling windows",
            hooks: true,
            usb_outlets: true,
        },
        bathroomFeatures: {
            separate_bathtub_and_shower: true,
            lighted_makeup_mirror: true,
            hair_dryer: true,
            robe: true,
            slippers: true,
        },
        furnitureFeatures: {
            alarm_clock: true,
            safe_in_room: true,
            safe_fee: false,
            desk: true,
            electrical_outlet: true,
            iron_and_ironing_board: true,
            trouser_press: false,
        },
        foodBeverages: {
            room_service: "24-hour",
            bottled_water: "Complimentary",
            coffee_tea_maker: true,
            instant_hot_water: true,
            minibar: "Stocked, charges apply",
        },
        internetPhones: {
            phones: 2,
            phone_features: ["Voicemail", "Speaker"],
            wireless_internet: "Complimentary high-speed WiFi",
        },
        entertainment: {
            plug_in_high_tech_room: true,
            cable_satellite: true,
            international_channels: ["CNN", "BBC World", "NHK"],
        },
        accessibleRoom: {
            mobility_accessible_rooms: false,
            roll_in_shower: false,
            hearing_accessible_rooms: true,
        },
        images: [
            "https://res.cloudinary.com/drrhtmzpk/image/upload/v1726506250/vr2gi0m3wttcs9xazcxi.webp",
            "https://res.cloudinary.com/drrhtmzpk/image/upload/v1726506250/vr2gi0m3wttcs9xazcxi.webp",
        ],
        status: "available",
        price: 5500,
    });

    const [newBenefit, setNewBenefit] = useState("");
    const [newOption, setNewOption] = useState("");
    const [newImage, setNewImage] = useState("");

    // Handle adding a new special benefit
    const handleAddBenefit = () => {
        if (newBenefit && !roomData.specialBenefits.includes(newBenefit)) {
            setRoomData(prev => ({
                ...prev,
                specialBenefits: [...prev.specialBenefits, newBenefit]
            }));
            setNewBenefit(""); // Reset input
        }
    };

    // Handle selecting multiple options
    const handleSelectChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setRoomData(prev => ({
            ...prev,
            selectedOptions: selected,
            bedding: {
                ...prev.bedding,
                beds: selected.join(", "), // Save as a comma-separated string
            },
        }));
    };

    // Handle adding a new option
    const handleAddOption = () => {
        if (newOption && !roomData.availableOptions.includes(newOption)) {
            setRoomData(prev => ({
                ...prev,
                availableOptions: [...prev.availableOptions, newOption],
                selectedOptions: [...prev.selectedOptions, newOption],
                bedding: {
                    ...prev.bedding,
                    beds: [...prev.selectedOptions, newOption].join(", "), // Update the beds data
                },
            }));
            setNewOption(""); // Reset the input
        }
    };

    // Handle adding a new image
    const handleAddImage = () => {
        if (newImage) {
            setRoomData(prev => ({
                ...prev,
                images: [...prev.images, newImage]
            }));
            setNewImage(""); // Reset the input after adding
        }
    };

    // Reusable function to handle toggling for boolean values
    const handleToggle = (section, field, value) => {
        setRoomData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    // Handle change for phone features and international channels
    const handleArrayChange = (section, field, value) => {
        setRoomData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleSubmit = () => {
        console.log(roomData);
    }

    return (
       
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl text-center  font-bold text-black mb-6">Add New Room</h1>
            <h2 className="text-2xl font-semibold mb-6 text-black">Room Overview</h2>

            {/* Room Name */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Room Name:</label>
                <Input
                    type="text"
                    size="lg"
                    value={roomData?.roomOverviewData?.name}
                    onChange={(e) =>
                        roomData?.setRoomOverviewData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
            </div>

            {/* Room Description */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Description:</label>
                <Textarea
                    size="lg"
                    value={roomData?.roomOverviewData?.description}
                    onChange={(e) =>
                        roomData?.setRoomOverviewData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
            </div>

            {/* Room Size */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Size:</label>
                <Input
                    type="text"
                    size="lg"
                    value={roomData?.roomOverviewData?.size}
                    onChange={(e) =>
                        roomData?.setRoomOverviewData((prev) => ({
                            ...prev,
                            size: e.target.value,
                        }))
                    }
                />
            </div>

            {/* Wireless Internet */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Wireless Internet:</label>
                <Input
                    type="text"
                    size="lg"
                    value={roomData?.roomOverviewData?.wireless_internet}
                    onChange={(e) =>
                        roomData?.setRoomOverviewData((prev) => ({
                            ...prev,
                            wireless_internet: e.target.value,
                        }))
                    }
                />
            </div>

            {/* Room Number */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Room Number:</label>
                <Input
                    type="text"
                    size="lg"
                    value={roomData?.roomOverviewData?.room_number}
                    onChange={(e) =>
                        roomData?.setRoomOverviewData((prev) => ({
                            ...prev,
                            room_number: e.target.value,
                        }))
                    }
                />
            </div>

            {/* Special Benefits */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Special Benefits:</label>
                <div className="space-y-2">
                    {roomData?.specialBenefits.map((benefit, index) => (
                        <div key={index} className="bg-gray-200 p-2 rounded-md">
                            {benefit}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add New Benefit */}
            <div className="mb-4  items-center space-x-3">
                <Input
                    type="text"
                    placeholder="Add new benefit"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={handleAddBenefit} className="btn my-2">
                    Add Benefit
                </Button>
            </div>

            {/* Display Saved Data */}
            {/* <h3 className="text-lg font-semibold mt-6">Saved Data:</h3>
            <pre className="bg-gray-200 p-4 rounded-md">{JSON.stringify(roomData?.roomOverviewData, null, 2)}</pre>
            <pre className="bg-gray-200 p-4 rounded-md">{JSON.stringify(roomData?.specialBenefits, null, 2)}</pre> */}
            <h2 className="text-2xl font-semibold mb-6 text-black">Bed and Bedding Information</h2>

            {/* Maximum Occupancy */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Maximum Occupancy:</label>
                <Input
                    type="number"
                    size="lg"
                    value={roomData?.beddingData?.maximum_occupancy}
                    onChange={(e) =>
                        roomData?.setBeddingData((prev) => ({
                            ...prev,
                            maximum_occupancy: Number(e.target.value),
                        }))
                    }
                />
            </div>

            {/* Bed Selection */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Beds:</label>
                <Select multiple onChange={handleSelectChange} value={roomData?.selectedOptions}>
                    {roomData?.availableOptions.map((option) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Add New Option */}
            <div className="mb-4 items-center space-x-3">
                <Input
                    type="text"
                    placeholder="Add new bed option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={handleAddOption} className="btn mt-2">
                    Add Option
                </Button>
            </div>

            {/* Rollaway Beds Permitted */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Rollaway Beds Permitted:</label>
                <Checkbox
                    checked={roomData?.beddingData?.rollaway_beds_permitted}
                    onChange={(e) =>
                        roomData?.setBeddingData((prev) => ({
                            ...prev,
                            rollaway_beds_permitted: e.target.checked,
                        }))
                    }
                    label="Yes"
                />
            </div>

            {/* Cribs Permitted */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Cribs Permitted:</label>
                <Input
                    type="number"
                    size="lg"
                    value={roomData?.beddingData?.cribs_permitted}
                    onChange={(e) =>
                        roomData?.setBeddingData((prev) => ({
                            ...prev,
                            cribs_permitted: Number(e.target.value),
                        }))
                    }
                />
            </div>

            {/* Duvet */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Duvet:</label>
                <Checkbox
                    checked={roomData?.beddingData?.duvet}
                    onChange={(e) =>
                        roomData?.setBeddingData((prev) => ({
                            ...prev,
                            duvet: e.target.checked,
                        }))
                    }
                    label="Yes"
                />
            </div>

            {/* Display Saved Data */}
            {/* <h3 className="text-lg font-semibold mt-6">Saved Data:</h3>
            <pre className="bg-gray-200 p-4 rounded-md">{JSON.stringify(roomData?.beddingData, null, 2)}</pre> */}
            <h2 className="text-2xl font-semibold mb-6 text-black">Room Features</h2>

            {/* Room Features */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Room Features</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Air Conditioned"
                        checked={roomData?.roomFeaturesData?.air_conditioned}
                        onChange={(e) => handleToggle(roomData?.setRoomFeaturesData, "air_conditioned", e.target.checked)}
                    />
                    <Switch
                        label="Non-Smoking"
                        checked={roomData?.roomFeaturesData?.non_smoking}
                        onChange={(e) => handleToggle(roomData?.setRoomFeaturesData, "non_smoking", e.target.checked)}
                    />
                    <Switch
                        label="Connecting Rooms Available"
                        checked={roomData?.roomFeaturesData?.connecting_rooms_available}
                        onChange={(e) =>
                            handleToggle(roomData?.setRoomFeaturesData, "connecting_rooms_available", e.target.checked)
                        }
                    />
                    <div>
                        <label className="block mb-2 text-gray-700">Windows:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.roomFeaturesData?.windows}
                            onChange={(e) =>
                                roomData?.setRoomFeaturesData((prev) => ({
                                    ...prev,
                                    windows: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <Switch
                        label="Hooks"
                        checked={roomData?.roomFeaturesData?.hooks}
                        onChange={(e) => handleToggle(roomData?.setRoomFeaturesData, "hooks", e.target.checked)}
                    />
                    <Switch
                        label="USB Outlets"
                        checked={roomData?.roomFeaturesData?.usb_outlets}
                        onChange={(e) => handleToggle(roomData?.setRoomFeaturesData, "usb_outlets", e.target.checked)}
                    />
                </div>
            </div>

            {/* Bath and Bathroom Features */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Bath and Bathroom Features</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Separate Bathtub and Shower"
                        checked={roomData?.roomData?.bathroomData?.roomFeaturesData?.separate_bathtub_and_shower}
                        onChange={(e) =>
                            handleToggle(roomData?.setBathroomData?.roomFeaturesData, "separate_bathtub_and_shower", e.target.checked)
                        }
                    />
                    <Switch
                        label="Lighted Makeup Mirror"
                        checked={roomData?.roomData?.bathroomData?.roomFeaturesData?.lighted_makeup_mirror}
                        onChange={(e) =>
                            handleToggle(roomData?.setBathroomData?.roomFeaturesData, "lighted_makeup_mirror", e.target.checked)
                        }
                    />
                    <Switch
                        label="Hair Dryer"
                        checked={roomData?.roomData?.bathroomData?.roomFeaturesData?.hair_dryer}
                        onChange={(e) => handleToggle(roomData?.setBathroomData?.roomFeaturesData, "hair_dryer", e.target.checked)}
                    />
                    <Switch
                        label="Robe"
                        checked={roomData?.roomData?.bathroomData?.roomFeaturesData?.robe}
                        onChange={(e) => handleToggle(roomData?.setBathroomData?.roomFeaturesData, "robe", e.target.checked)}
                    />
                    <Switch
                        label="Slippers"
                        checked={roomData?.roomData?.bathroomData?.roomFeaturesData?.slippers}
                        onChange={(e) => handleToggle(roomData?.setBathroomData?.roomFeaturesData, "slippers", e.target.checked)}
                    />
                </div>
            </div>

            {/* Furniture and Furnishings */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Furniture and Furnishings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Alarm Clock"
                        checked={roomData?.furnitureFeaturesData?.alarm_clock}
                        onChange={(e) => handleToggle(roomData?.setFurnitureFeaturesData, "alarm_clock", e.target.checked)}
                    />
                    <Switch
                        label="Safe in Room"
                        checked={roomData?.furnitureFeaturesData?.safe_in_room}
                        onChange={(e) => handleToggle(roomData?.setFurnitureFeaturesData, "safe_in_room", e.target.checked)}
                    />
                    <Switch
                        label="Safe Fee"
                        checked={roomData?.furnitureFeaturesData?.safe_fee}
                        onChange={(e) => handleToggle(roomData?.setFurnitureFeaturesData, "safe_fee", e.target.checked)}
                    />
                    <Switch
                        label="Desk"
                        checked={roomData?.furnitureFeaturesData?.desk}
                        onChange={(e) => handleToggle(roomData?.setFurnitureFeaturesData, "desk", e.target.checked)}
                    />
                    <Switch
                        label="Electrical Outlet"
                        checked={roomData?.furnitureFeaturesData?.electrical_outlet}
                        onChange={(e) =>
                            handleToggle(roomData?.setFurnitureFeaturesData, "electrical_outlet", e.target.checked)
                        }
                    />
                    <Switch
                        label="Iron and Ironing Board"
                        checked={roomData?.furnitureFeaturesData?.iron_and_ironing_board}
                        onChange={(e) =>
                            handleToggle(roomData?.setFurnitureFeaturesData, "iron_and_ironing_board", e.target.checked)
                        }
                    />
                    <Switch
                        label="Trouser Press"
                        checked={roomData?.furnitureFeaturesData?.trouser_press}
                        onChange={(e) =>
                            handleToggle(roomData?.setFurnitureFeaturesData, "trouser_press", e.target.checked)
                        }
                    />
                </div>
            </div>

            {/* Display Saved Data */}
            {/* <h3 className="text-lg font-semibold mt-6">Saved Data:</h3>
            <pre className="bg-gray-200 p-4 rounded-md">
                {JSON.stringify(roomData?.roomFeaturesData, null, 2)}
            </pre>
            <pre className="bg-gray-200 p-4 rounded-md">
                {JSON.stringify(roomData?.bathroomData?.roomFeaturesData, null, 2)}
            </pre>
            <pre className="bg-gray-200 p-4 rounded-md">
                {JSON.stringify(roomData?.furnitureFeaturesData, null, 2)}
            </pre> */}
            <h2 className="text-2xl font-semibold mb-6 text-black">Food and Beverages</h2>

            {/* Food and Beverages Features */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Food and Beverages</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Room Service:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.furnitureFeaturesData?.room_service}
                            onChange={(e) =>
                               roomData?.setFoodBeveragesData((prev) => ({
                                    ...prev,
                                    room_service: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Bottled Water:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.furnitureFeaturesData?.bottled_water}
                            onChange={(e) =>
                               roomData?. setFoodBeveragesData((prev) => ({
                                    ...prev,
                                    bottled_water: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <Switch
                        label="Coffee/Tea Maker"
                        checked={roomData?.furnitureFeaturesData?.coffee_tea_maker}
                        onChange={(e) =>
                            handleToggle(roomData?.setFoodBeveragesData, "coffee_tea_maker", e.target.checked)
                        }
                    />
                    <Switch
                        label="Instant Hot Water"
                        checked={roomData?.furnitureFeaturesData?.instant_hot_water}
                        onChange={(e) =>
                            handleToggle(roomData?.setFoodBeveragesData, "instant_hot_water", e.target.checked)
                        }
                    />
                    <div>
                        <label className="block mb-2 text-gray-700">Minibar:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.furnitureFeaturesData?.minibar}
                            onChange={(e) =>
                               roomData?.setFoodBeveragesData((prev) => ({
                                    ...prev,
                                    minibar: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Internet and Phones Features */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Internet and Phones</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Number of Phones:</label>
                        <Input
                            type="number"
                            size="lg"
                            value={roomData?.internetPhonesData?.phones}
                            onChange={(e) =>
                                roomData?.setInternetPhonesData((prev) => ({
                                    ...prev,
                                    phones: Number(e.target.value),
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Wireless Internet:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.internetPhonesData?.wireless_internet}
                            onChange={(e) =>
                                roomData?.setInternetPhonesData((prev) => ({
                                    ...prev,
                                    wireless_internet: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Phone Features:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.internetPhonesData?.phone_features.join(", ")} // Join the array for display
                            onChange={(e) =>
                                handleArrayChange(roomData?.setInternetPhonesData, "phone_features", e.target.value.split(", "))
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Entertainment Features */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Entertainment</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Plug-in High-Tech Room"
                        checked={roomData?.entertainmentData?.plug_in_high_tech_room}
                        onChange={(e) =>
                            handleToggle(roomData?.setEntertainmentData, "plug_in_high_tech_room", e.target.checked)
                        }
                    />
                    <Switch
                        label="Cable/Satellite"
                        checked={roomData?.entertainmentData?.cable_satellite}
                        onChange={(e) =>
                            handleToggle(roomData?.setEntertainmentData, "cable_satellite", e.target.checked)
                        }
                    />
                    <div>
                        <label className="block mb-2 text-gray-700">International Channels:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={roomData?.entertainmentData?.international_channels.join(", ")} // Join the array for display
                            onChange={(e) =>
                                handleArrayChange(
                                    roomData?.setEntertainmentData,
                                    "international_channels",
                                    e.target.value.split(", ")
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Display Saved Data */}
            {/* <h3 className="text-lg font-semibold mt-6">Saved Data:</h3>
            <pre className="bg-gray-200 p-4 rounded-md">
                {JSON.stringify(roomData?.foodBeveragesData, null, 2)}
            </pre>
            <pre className="bg-gray-200 p-4 rounded-md">
                {JSON.stringify(roomData?.internetPhonesData, null, 2)}
            </pre>
            <pre className="bg-gray-200 p-4 rounded-md">
                {JSON.stringify(roomData?.entertainmentData, null, 2)}
            </pre> */}

            <h2 className="text-2xl font-semibold mb-6 text-black">Accessible Room Features</h2>

            {/* Accessible Room Features */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Room Accessibility</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Mobility Accessible Rooms"
                        checked={roomData?.entertainmentData?.mobility_accessible_rooms}
                        onChange={(e) =>
                            roomData?.setAccessibleRoomData((prev) => ({
                                ...prev,
                                mobility_accessible_rooms: e.target.checked,
                            }))
                        }
                    />
                    <Switch
                        label="Roll-in Shower"
                        checked={roomData?.entertainmentData?.roll_in_shower}
                        onChange={(e) =>
                            roomData?.setAccessibleRoomData((prev) => ({
                                ...prev,
                                roll_in_shower: e.target.checked,
                            }))
                        }
                    />
                    <Switch
                        label="Hearing Accessible Rooms"
                        checked={roomData?.entertainmentData?.hearing_accessible_rooms}
                        onChange={(e) =>
                            roomData?.setAccessibleRoomData((prev) => ({
                                ...prev,
                                hearing_accessible_rooms: e.target.checked,
                            }))
                        }
                    />
                </div>
            </div>

            {/* Images Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Room Images</h3>

                <div className="flex flex-wrap gap-4">
                    {roomData?.images.map((image, index) => (
                        <img key={index} src={image} alt={`Room Image ${index + 1}`} className="w-1/2 rounded-lg" />
                    ))}
                </div>
                {/* Input for New Image */}
                <div className=" my-4">
                    <Input
                        type="text"
                        placeholder="Add new image URL"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        className="mr-2"
                    />
                    <button
                        onClick={handleAddImage}
                        className="btn text-white mt-2 py-2 px-4 rounded"
                    >
                        Add Image
                    </button>
                </div>

            </div>

            {/* Status and Price Section */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Room Status and Price</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Status:</label>
                        <Input
                            type="text"
                            size="lg"
                            value={status}
                            onChange={(e) => roomData?.setStatus(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Price:</label>
                        <Input
                            type="number"
                            size="lg"
                            value={roomData?.price}
                            onChange={(e) => roomData?.setPrice(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn w-full mt-6 mb-4" onClick={() => {
                    handleSubmit()
                }}>
                    Add Room
                </button>
</div>
        </div>
    );
};

export default AddRoom;
