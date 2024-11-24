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
import { imageUpload } from "../../../utils/uploadImage";
import toast from "react-hot-toast";
import { useCreateRoomMutation } from "../../../redux/features/room/roomApi";
import { roomCategoryOptions } from "../../../utils/constant";

const AddRoom = () => {
  const [addRoom] = useCreateRoomMutation();
  const [roomData, setRoomData] = useState({
    category: "Executive Suite",
    room_overview: {
      name: "Deluxe King Room",
      description: "Spacious room with city view and modern amenities",
      size: "40 sq m / 430 sq ft",
      wireless_internet: "Complimentary high-speed WiFi",
      room_number: "332",
    },
    special_benefits: ["Complimentary Breakfast"],
    beds_and_bedding: {
      maximum_occupancy: 2,
      maximum_adults: 2,
      maximum_children: 0,
      //maximum_infants: 1,
      extra_adult_charge: 0,
      beds: "1 King Bed",
      rollaway_beds_permitted: true,
      cribs_permitted: 1,
      duvet: true,
    },
    room_features: {
      air_conditioned: true,
      non_smoking: true,
      connecting_rooms_available: false,
      windows: "Floor-to-ceiling windows",
      hooks: true,
      usb_outlets: true,
    },
    bath_and_bathroom_features: {
      separate_bathtub_and_shower: true,
      lighted_makeup_mirror: true,
      hair_dryer: true,
      robe: true,
      slippers: true,
    },
    furniture_and_furnishings: {
      alarm_clock: true,
      safe_in_room: true,
      safe_fee: false,
      desk: true,
      electrical_outlet: true,
      iron_and_ironing_board: true,
      trouser_press: false,
    },
    food_and_beverages: {
      room_service: "24-hour",
      bottled_water: "Complimentary",
      coffee_tea_maker: true,
      instant_hot_water: true,
      minibar: "Stocked, charges apply",
    },
    internet_and_phones: {
      phones: 2,
      phone_features: ["Voicemail", "Speaker"],
      wireless_internet: "Complimentary high-speed WiFi",
    },
    entertainment: {
      plug_in_high_tech_room: true,
      cable_satellite: true,
      international_channels: ["All TV Channels", "Netflix"],
    },
    accessible_room_features: {
      mobility_accessible_rooms: false,
      roll_in_shower: false,
      hearing_accessible_rooms: true,
    },
    images: [],
    status: "available",
    price: 5500,
  });

  const validateGuestCapacity = (category) => {
    switch (category) {
      case "Executive Suite":
      case "Deluxe Supreme":
      case "Luxury Deluxe":
        setRoomData((prev) => ({
          ...prev,
          beds_and_bedding: {
            ...prev.beds_and_bedding,
            maximum_adults: 2,
            maximum_children: 1,
            extra_adult_charge: 0,
          },
        }));
        break;
      case "Luxury Twin":
        setRoomData((prev) => ({
          ...prev,
          beds_and_bedding: {
            ...prev.beds_and_bedding,
            maximum_adults: 3,
            maximum_children: 0,
            extra_adult_charge: 8,
          },
        }));
        break;
      default:
        break;
    }
  };

  const [newBenefit, setNewBenefit] = useState("");
  const [imageFiles, setImageFiles] = useState([null, null, null]);

  // Handle adding a new special benefit
  const handleAddBenefit = () => {
    if (newBenefit && !roomData.special_benefits.includes(newBenefit)) {
      setRoomData((prev) => ({
        ...prev,
        special_benefits: [...prev.special_benefits, newBenefit],
      }));
      setNewBenefit(""); // Reset input
    }
  };

  const handleRemoveBenefit = (index) => {
    setRoomData((prevData) => ({
      ...prevData,
      special_benefits: prevData.special_benefits.filter((_, i) => i !== index),
    }));
  };
  const handleFileChange = (index, file) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Uploading Images...");
    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => (file ? imageUpload(file) : null))
      );
      // console.log(imageUrls);

      if (imageUrls) {
        toast.loading("Adding Room Into Database...", { id: toastId });

        const filteredImageUrls = imageUrls.filter((url) => url !== null);

        // Update the roomData state with the filtered image URLs
        setRoomData((prevData) => ({
          ...prevData,
          images: filteredImageUrls,
        }));

        // Use the updated roomData for submission
        const updatedRoomData = {
          ...roomData,
          images: filteredImageUrls,
        };

        //console.log(updatedRoomData);

        //Uncomment the following lines to submit the form data
        const res = await addRoom(updatedRoomData);
        //console.log(res);
        if (res.error) {
          toast.error(res?.error?.data?.message, {
            id: toastId,
            duration: 5000,
          });
        } else {
          toast.success("Room Added Successfully", {
            id: toastId,
            duration: 5000,
          });
        }
      } else {
        toast.error("Failed to upload images", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images. Please try again.", { id: toastId });
    }
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
        <Select
          label="Select Room Category"
          value={roomData.category}
          onChange={(value) => {
            setRoomData((prev) => ({
              ...prev,
              category: value,
            }));
            validateGuestCapacity(value);
          }}
        >
          {roomCategoryOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      {/* Room Name */}
      <div className="my-4">
        <h2 className="text-2xl font-semibold mb-3 text-black">
          Room Overview
        </h2>
        <label className="block mb-2 text-gray-700">Room Name:</label>
        <Input
          type="text"
          required
          size="lg"
          value={roomData.room_overview.name}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              room_overview: {
                ...prev.room_overview,
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
          defaultValue={roomData?.room_overview?.description}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              room_overview: {
                ...prev.room_overview,
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
          value={roomData.room_overview.size}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              room_overview: {
                ...prev.room_overview,
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
          value={roomData.room_overview.wireless_internet}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              room_overview: {
                ...prev.room_overview,
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
          required
          value={roomData.room_overview.room_number}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              room_overview: {
                ...prev.room_overview,
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
          {roomData.special_benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-200 relative w-fit px-5 py-2 rounded-md"
            >
              {benefit}
              <button
                onClick={() => handleRemoveBenefit(index)}
                className="absolute -top-2 right-0 p-1 font-semibold text-2xl text-red-500"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Benefit */}
      <div className="mb-4 items-center space-x-3">
        <Input
          type="text"
          required
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
          value={roomData.beds_and_bedding.maximum_occupancy}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
                maximum_occupancy: Number(e.target.value),
              },
            }))
          }
        />
      </div>
      {/* Maximum Adults */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Maximum Adults:</label>
        <Input
          type="number"
          size="lg"
          value={roomData.beds_and_bedding.maximum_adults}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
                maximum_adults: Number(e.target.value),
              },
            }))
          }
        />
      </div>

      {/* Maximum Children */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Maximum Children:</label>
        <Input
          type="number"
          size="lg"
          value={roomData.beds_and_bedding.maximum_children}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
                maximum_children: Number(e.target.value),
              },
            }))
          }
        />
      </div>

      {/* Maximum Infants */}
      {/* <div className="mb-4">
    <label className="block mb-2 text-gray-700">Maximum Infants:</label>
    <Input
      type="number"
      size="lg"
      value={roomData.beds_and_bedding.maximum_infants}
      onChange={(e) =>
        setRoomData((prev) => ({
          ...prev,
          beds_and_bedding: {
            ...prev.beds_and_bedding,
            maximum_infants: Number(e.target.value),
          },
        }))
      }
    />
  </div> */}

      {/* Extra Adult Charge */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Extra Adult Charge:</label>
        <Input
          type="number"
          size="lg"
          value={roomData.beds_and_bedding.extra_adult_charge}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
                extra_adult_charge: Number(e.target.value),
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
          value={roomData.beds_and_bedding.beds}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
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
          checked={roomData.beds_and_bedding.rollaway_beds_permitted}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
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
          value={roomData.beds_and_bedding.cribs_permitted}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
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
          checked={roomData.beds_and_bedding.duvet}
          onChange={(e) =>
            setRoomData((prev) => ({
              ...prev,
              beds_and_bedding: {
                ...prev.beds_and_bedding,
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
            checked={roomData.room_features.air_conditioned}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                room_features: {
                  ...prev.room_features,
                  air_conditioned: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Non-Smoking"
            checked={roomData.room_features.non_smoking}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                room_features: {
                  ...prev.room_features,
                  non_smoking: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Connecting Rooms Available"
            checked={roomData.room_features.connecting_rooms_available}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                room_features: {
                  ...prev.room_features,
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
              value={roomData.room_features.windows}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  room_features: {
                    ...prev.room_features,
                    windows: e.target.value,
                  },
                }))
              }
            />
          </div>
          <Switch
            label="Hooks"
            checked={roomData.room_features.hooks}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                room_features: {
                  ...prev.room_features,
                  hooks: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="USB Outlets"
            checked={roomData.room_features.usb_outlets}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                room_features: {
                  ...prev.room_features,
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
            checked={
              roomData.bath_and_bathroom_features.separate_bathtub_and_shower
            }
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bath_and_bathroom_features: {
                  ...prev.bath_and_bathroom_features,
                  separate_bathtub_and_shower: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Lighted Makeup Mirror"
            checked={roomData.bath_and_bathroom_features.lighted_makeup_mirror}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bath_and_bathroom_features: {
                  ...prev.bath_and_bathroom_features,
                  lighted_makeup_mirror: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Hair Dryer"
            checked={roomData.bath_and_bathroom_features.hair_dryer}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bath_and_bathroom_features: {
                  ...prev.bath_and_bathroom_features,
                  hair_dryer: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Robe"
            checked={roomData.bath_and_bathroom_features.robe}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bath_and_bathroom_features: {
                  ...prev.bath_and_bathroom_features,
                  robe: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Slippers"
            checked={roomData.bath_and_bathroom_features.slippers}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                bath_and_bathroom_features: {
                  ...prev.bath_and_bathroom_features,
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
            checked={roomData.furniture_and_furnishings.alarm_clock}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
                  alarm_clock: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Safe in Room"
            checked={roomData.furniture_and_furnishings.safe_in_room}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
                  safe_in_room: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Safe Fee"
            checked={roomData.furniture_and_furnishings.safe_fee}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
                  safe_fee: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Desk"
            checked={roomData.furniture_and_furnishings.desk}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
                  desk: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Electrical Outlet"
            checked={roomData.furniture_and_furnishings.electrical_outlet}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
                  electrical_outlet: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Iron and Ironing Board"
            checked={roomData.furniture_and_furnishings.iron_and_ironing_board}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
                  iron_and_ironing_board: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Trouser Press"
            checked={roomData.furniture_and_furnishings.trouser_press}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                furniture_and_furnishings: {
                  ...prev.furniture_and_furnishings,
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
              value={roomData.food_and_beverages.room_service}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  food_and_beverages: {
                    ...prev.food_and_beverages,
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
              value={roomData.food_and_beverages.bottled_water}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  food_and_beverages: {
                    ...prev.food_and_beverages,
                    bottled_water: e.target.value,
                  },
                }))
              }
            />
          </div>
          <Switch
            label="Coffee/Tea Maker"
            checked={roomData.food_and_beverages.coffee_tea_maker}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                food_and_beverages: {
                  ...prev.food_and_beverages,
                  coffee_tea_maker: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Instant Hot Water"
            checked={roomData.food_and_beverages.instant_hot_water}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                food_and_beverages: {
                  ...prev.food_and_beverages,
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
              value={roomData.food_and_beverages.minibar}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  food_and_beverages: {
                    ...prev.food_and_beverages,
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
              value={roomData.internet_and_phones.phones}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  internet_and_phones: {
                    ...prev.internet_and_phones,
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
              value={roomData.internet_and_phones.wireless_internet}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  internet_and_phones: {
                    ...prev.internet_and_phones,
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
              value={roomData.internet_and_phones.phone_features.join(", ")} // Join the array for display
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  internet_and_phones: {
                    ...prev.internet_and_phones,
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
            checked={
              roomData?.accessible_room_features?.mobility_accessible_rooms
            }
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                accessible_room_features: {
                  ...prev.accessible_room_features,
                  mobility_accessible_rooms: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Roll-in Shower"
            checked={roomData?.accessible_room_features?.roll_in_shower}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                accessible_room_features: {
                  ...prev.accessible_room_features,
                  roll_in_shower: e.target.checked,
                },
              }))
            }
          />
          <Switch
            label="Hearing Accessible Rooms"
            checked={
              roomData?.accessible_room_features?.hearing_accessible_rooms
            }
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                accessible_room_features: {
                  ...prev.accessible_room_features,
                  hearing_accessible_rooms: e.target.checked,
                },
              }))
            }
          />
        </div>
      </div>

      {/* Images Section */}
      <div className="mb-3">
        <h3 className="text-xl font-semibold text-gray-700">Room Images</h3>
        <div className="my-2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image1"
            >
              Upload Image 1 (required)
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(0, e.target.files[0])}
              className=""
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="additionalImages"
            >
              Additional Images
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(1, e.target.files[0])}
                className=""
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(2, e.target.files[0])}
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status and Price Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700">
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
            <label className="block mb-2 text-gray-700">Price Per Night:</label>
            <Input
              type="number"
              size="lg"
              required
              value={roomData?.price}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  price: e.target.value,
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
