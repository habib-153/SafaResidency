import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Select,
  Option,
  Textarea,
  Switch,
} from "@material-tailwind/react"; // Using Material Tailwind

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    category: "Muster Bedroom With Balcony",
    roomOverview: {
      name: "Deluxe King Room",
      description: "Spacious room with city view and modern amenities",
      size: "40 sq m / 430 sq ft",
      wireless_internet: "Complimentary high-speed WiFi",
      room_number: "332",
    },
    specialBenefits: ["Access to Executive Lounge", "Welcome fruit basket"],
    bedding: {
      maximum_occupancy: 2,
      beds: "1 King Bed",
      rollaway_beds_permitted: true,
      cribs_permitted: 1,
      duvet: true,
    },
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
      international_channels: ["All TV Channels", "Netflix"],
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
  const [newImage, setNewImage] = useState("");

  // Handle adding a new special benefit
  const handleAddBenefit = () => {
    if (newBenefit && !roomData.specialBenefits.includes(newBenefit)) {
      setRoomData((prev) => ({
        ...prev,
        specialBenefits: [...prev.specialBenefits, newBenefit],
      }));
      setNewBenefit(""); // Reset input
    }
  };

  // Handle adding a new image
  const handleAddImage = () => {
    if (newImage) {
      setRoomData((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }));
      setNewImage(""); // Reset the input after adding
    }
  };

  const handleSubmit = () => {
    console.log(roomData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center  font-bold text-black mb-6">
        Add New Room
      </h1>
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-black">
          Room Category
        </h2>
        <Input
          type="text"
          size="lg"
          value={roomData.category}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        />
      </div>
      {/* Room Name */}
      <div className="my-4">
        <h2 className="text-2xl font-semibold mb-3 text-black">
          Room Overview
        </h2>
        <label className="block mb-2 text-gray-700">Room Name:</label>
        <Input
          type="text"
          size="lg"
          value={roomData.roomOverview.name}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              roomOverview: {
                ...prev.roomOverview,
                name: e.target.value,
              },
            }))
          }
        />
      </div>
      {/* Room Description */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Description:</label>
        <Textarea
          size="lg"
          defaultValue={roomData?.roomOverview?.description}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              roomOverview: {
                ...prev.roomOverview,
                description: e.target.value,
              },
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
          value={roomData.roomOverview.size}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              roomOverview: {
                ...prev.roomOverview,
                size: e.target.value,
              },
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
          value={roomData.roomOverview.wireless_internet}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              roomOverview: {
                ...prev.roomOverview,
                wireless_internet: e.target.value,
              },
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
          value={roomData.roomOverview.room_number}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              roomOverview: {
                ...prev.roomOverview,
                room_number: e.target.value,
              },
            }))
          }
        />
      </div>

      {/* Special Benefits */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Special Benefits:</label>
        <div className="space-y-2">
          {roomData.specialBenefits.map((benefit, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-md">
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Add New Benefit */}
      <div className="mb-4 items-center space-x-3">
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

      <h2 className="text-2xl font-semibold mb-6 text-black">
        Bed and Bedding Information
      </h2>

      {/* Maximum Occupancy */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Maximum Occupancy:</label>
        <Input
          type="number"
          size="lg"
          value={roomData.bedding.maximum_occupancy}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              bedding: {
                ...prev.bedding,
                maximum_occupancy: Number(e.target.value),
              },
            }))
          }
        />
      </div>

      {/* Bed Selection */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Beds:</label>
        <Input
          type="text"
          size="lg"
          value={roomData.bedding.beds}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              bedding: {
                ...prev.bedding,
                beds: e.target.value,
              },
            }))
          }
        />
      </div>

      {/* Rollaway Beds Permitted */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">
          Rollaway Beds Permitted:
        </label>
        <Checkbox
          checked={roomData.bedding.rollaway_beds_permitted}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              bedding: {
                ...prev.bedding,
                rollaway_beds_permitted: e.target.checked,
              },
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
          value={roomData.bedding.cribs_permitted}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              bedding: {
                ...prev.bedding,
                cribs_permitted: Number(e.target.value),
              },
            }))
          }
        />
      </div>

      {/* Duvet */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Duvet:</label>
        <Checkbox
          checked={roomData.bedding.duvet}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              bedding: {
                ...prev.bedding,
                duvet: e.target.checked,
              },
            }))
          }
          label="Yes"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-black">Room Features</h2>

      {/* Room Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Room Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch
            label="Air Conditioned"
            checked={roomData.roomFeatures.air_conditioned}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                roomFeatures: {
                  ...prev.roomFeatures,
                  air_conditioned: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Non-Smoking"
            checked={roomData.roomFeatures.non_smoking}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                roomFeatures: {
                  ...prev.roomFeatures,
                  non_smoking: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Connecting Rooms Available"
            checked={roomData.roomFeatures.connecting_rooms_available}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                roomFeatures: {
                  ...prev.roomFeatures,
                  connecting_rooms_available: e.target.checked,
                },
              }))
            }
          />
          <div>
            <label className="block mb-2 text-gray-700">Windows:</label>
            <Input
              type="text"
              size="lg"
              value={roomData.roomFeatures.windows}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  roomFeatures: {
                    ...prev.roomFeatures,
                    windows: e.target.value,
                  },
                }))
              }
            />
          </div>
          <Switch
            label="Hooks"
            checked={roomData.roomFeatures.hooks}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                roomFeatures: {
                  ...prev.roomFeatures,
                  hooks: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="USB Outlets"
            checked={roomData.roomFeatures.usb_outlets}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                roomFeatures: {
                  ...prev.roomFeatures,
                  usb_outlets: e.target.checked,
                },
              }))
            }
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-black">
        Bath and Bathroom Features
      </h2>

      {/* Bath and Bathroom Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Bath and Bathroom Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch
            label="Separate Bathtub and Shower"
            checked={roomData.bathroomFeatures.separate_bathtub_and_shower}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bathroomFeatures: {
                  ...prev.bathroomFeatures,
                  separate_bathtub_and_shower: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Lighted Makeup Mirror"
            checked={roomData.bathroomFeatures.lighted_makeup_mirror}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bathroomFeatures: {
                  ...prev.bathroomFeatures,
                  lighted_makeup_mirror: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Hair Dryer"
            checked={roomData.bathroomFeatures.hair_dryer}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bathroomFeatures: {
                  ...prev.bathroomFeatures,
                  hair_dryer: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Robe"
            checked={roomData.bathroomFeatures.robe}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bathroomFeatures: {
                  ...prev.bathroomFeatures,
                  robe: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Slippers"
            checked={roomData.bathroomFeatures.slippers}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bathroomFeatures: {
                  ...prev.bathroomFeatures,
                  slippers: e.target.checked,
                },
              }))
            }
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-black">
        Furniture and Furnishings
      </h2>

      {/* Furniture and Furnishings */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Furniture and Furnishings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch
            label="Alarm Clock"
            checked={roomData.furnitureFeatures.alarm_clock}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  alarm_clock: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Safe in Room"
            checked={roomData.furnitureFeatures.safe_in_room}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  safe_in_room: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Safe Fee"
            checked={roomData.furnitureFeatures.safe_fee}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  safe_fee: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Desk"
            checked={roomData.furnitureFeatures.desk}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  desk: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Electrical Outlet"
            checked={roomData.furnitureFeatures.electrical_outlet}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  electrical_outlet: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Iron and Ironing Board"
            checked={roomData.furnitureFeatures.iron_and_ironing_board}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  iron_and_ironing_board: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Trouser Press"
            checked={roomData.furnitureFeatures.trouser_press}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furnitureFeatures: {
                  ...prev.furnitureFeatures,
                  trouser_press: e.target.checked,
                },
              }))
            }
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-black">
        Food and Beverages
      </h2>

      {/* Food and Beverages Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Food and Beverages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">Room Service:</label>
            <Input
              type="text"
              size="lg"
              value={roomData.foodBeverages.room_service}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  foodBeverages: {
                    ...prev.foodBeverages,
                    room_service: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Bottled Water:</label>
            <Input
              type="text"
              size="lg"
              value={roomData.foodBeverages.bottled_water}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  foodBeverages: {
                    ...prev.foodBeverages,
                    bottled_water: e.target.value,
                  },
                }))
              }
            />
          </div>
          <Switch
            label="Coffee/Tea Maker"
            checked={roomData.foodBeverages.coffee_tea_maker}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                foodBeverages: {
                  ...prev.foodBeverages,
                  coffee_tea_maker: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Instant Hot Water"
            checked={roomData.foodBeverages.instant_hot_water}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                foodBeverages: {
                  ...prev.foodBeverages,
                  instant_hot_water: e.target.checked,
                },
              }))
            }
          />
          <div>
            <label className="block mb-2 text-gray-700">Minibar:</label>
            <Input
              type="text"
              size="lg"
              value={roomData.foodBeverages.minibar}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  foodBeverages: {
                    ...prev.foodBeverages,
                    minibar: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-black">
        Internet and Phones
      </h2>

      {/* Internet and Phones Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Internet and Phones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">
              Number of Phones:
            </label>
            <Input
              type="number"
              size="lg"
              value={roomData.internetPhones.phones}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  internetPhones: {
                    ...prev.internetPhones,
                    phones: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">
              Wireless Internet:
            </label>
            <Input
              type="text"
              size="lg"
              value={roomData.internetPhones.wireless_internet}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  internetPhones: {
                    ...prev.internetPhones,
                    wireless_internet: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Phone Features:</label>
            <Input
              type="text"
              size="lg"
              value={roomData.internetPhones.phone_features.join(", ")} // Join the array for display
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  internetPhones: {
                    ...prev.internetPhones,
                    phone_features: e.target.value.split(", "),
                  },
                }))
              }
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-black">Entertainment</h2>

      {/* Entertainment Features */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Entertainment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch
            label="Plug-in High-Tech Room"
            checked={roomData.entertainment.plug_in_high_tech_room}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                entertainment: {
                  ...prev.entertainment,
                  plug_in_high_tech_room: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Cable/Satellite"
            checked={roomData.entertainment.cable_satellite}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                entertainment: {
                  ...prev.entertainment,
                  cable_satellite: e.target.checked,
                },
              }))
            }
          />
          <div>
            <label className="block mb-2 text-gray-700">
              International Channels & OTT:
            </label>
            <Input
              type="text"
              size="lg"
              value={roomData?.entertainment?.international_channels.join(", ")} // Join the array for display
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  entertainment: {
                    ...prev.entertainment,
                    international_channels: e.target.value.split(", "),
                  },
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Accessible Room Features */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold mb-3 text-black">
          Accessible Room Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch
            label="Mobility Accessible Rooms"
            checked={roomData?.accessibleRoom?.mobility_accessible_rooms}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                accessibleRoom: {
                  ...prev.accessibleRoom,
                  mobility_accessible_rooms: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Roll-in Shower"
            checked={roomData?.accessibleRoom?.roll_in_shower}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                accessibleRoom: {
                  ...prev.accessibleRoom,
                  roll_in_shower: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Hearing Accessible Rooms"
            checked={roomData?.accessibleRoom?.hearing_accessible_rooms}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                accessibleRoom: {
                  ...prev.accessibleRoom,
                  hearing_accessible_rooms: e.target.checked,
                },
              }))
            }
          />
        </div>
      </div>

      {/* Images Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Room Images
        </h3>

        <div className="flex flex-wrap gap-4">
          {roomData?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Room Image ${index + 1}`}
              className="w-1/2 rounded-lg"
            />
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
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Room Status and Price
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">Status:</label>
            <Select
              size="lg"
              onChange={(e) => setRoomData({ ...roomData, status: e })}
              value="available"
            >
              <Option value="available">Available</Option>
              <Option value="unavailable">Unavailable</Option>
              <Option value="maintenance">Maintenance</Option>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Price:</label>
            <Input
              type="number"
              size="lg"
              value={roomData?.price}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn mt-6 mb-4"
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Room
        </button>
      </div>
    </div>
  );
};

export default AddRoom;
