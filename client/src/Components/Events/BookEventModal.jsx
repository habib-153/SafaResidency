/* eslint-disable react/prop-types */
import { Modal, Input, Select, DatePicker, TimePicker } from "antd";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils/uploadImage";
import { useCreateEventMutation } from "../../redux/features/event/eventApi";

const { TextArea } = Input;

const BookEventModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    layout: "",
    date: null,
    startTime: null,
    endTime: null,
    guestCount: "",
    eventType: "",
    foodPreference: "",
    additionalRequirements: "",
    preferenceImage: null
  });
  
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [createEvent] = useCreateEventMutation()

  const eventTypes = ["Conference", "Wedding", "Birthday", "Corporate", "Other"];
  const layouts = ["Classroom Setup", "U-Shape Layout", "I-Shape Layout", "Theater Style", "Custom Layout"];
  const foodOptions = [
    { value: "buffet", label: "Buffet Service" },
    { value: "plated", label: "Plated Service" },
    { value: "snacks", label: "Light Snacks & Beverages" },
    { value: "none", label: "No Food Required" }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.layout) newErrors.layout = "Layout is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.startTime || !form.endTime) newErrors.time = "Time is required";
    if (!form.eventType) newErrors.eventType = "Event type is required";
    if (!form.guestCount) newErrors.guestCount = "Guest count is required";
    if (!form.foodPreference) newErrors.foodPreference = "Food preference is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setForm({ ...form, preferenceImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm({ ...form, preferenceImage: null });
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const toastId = toast.loading('Submitting your request...');
      
      try {
        // Upload image if exists
        let imageUrl = null;
        if (form.preferenceImage) {
          toast.loading('Uploading Image...', { id: toastId });
          imageUrl = await imageUpload(form.preferenceImage);
        }
  
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          layout: form.layout,
          date: form.date,
          startTime: form.startTime.format('HH:mm'),
          endTime: form.endTime.format('HH:mm'),
          guestCount: Number(form.guestCount),
          eventType: form.eventType,
          foodPreference: form.foodPreference,
          additionalRequirements: form.additionalRequirements,
          preferenceImage: imageUrl
        };

        toast.loading('Creating Event Booking...', { id: toastId });
        const res = await createEvent(payload);
  
        if (res?.error) {
          toast.error(res?.error?.data?.message || 'Something went wrong', { 
            id: toastId,
            duration: 3000 
          });
        } else {
          toast.success('Event Booking Request Submitted Successfully, We will contact with you soon.', { 
            id: toastId,
            duration: 10000 
          });
          onClose();
        }
      } catch (error) {
        console.error('Error submitting event:', error);
        toast.error('Failed to submit event booking', { 
          id: toastId,
          duration: 3000 
        });
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const isFormValid = () => {
    return form.name && form.email && form.phone && form.layout && 
           form.date && form.startTime && form.endTime && 
           form.eventType && form.guestCount && form.foodPreference;
  };

  return (
    <Modal
      title={
        <Typography className="font-semibold text-2xl text-gray-800 py-2">
          Book Your Event Space
        </Typography>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6 py-4">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-700">
            Personal Information
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                size="large"
                placeholder="Full Name *"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                status={errors.name ? "error" : ""}
                className="rounded-lg"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <Input
              size="large"
              placeholder="Company Name"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              className="rounded-lg"
            />
            <div>
              <Input
                size="large"
                placeholder="Email *"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                status={errors.email ? "error" : ""}
                className="rounded-lg"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <Input
                size="large"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                status={errors.phone ? "error" : ""}
                className="rounded-lg"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Event Details Section */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-700">
            Event Details
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                size="large"
                placeholder="Select Layout *"
                className="w-full"
                status={errors.layout ? "error" : ""}
                onChange={value => setForm({ ...form, layout: value })}
                options={layouts.map(layout => ({
                  value: layout,
                  label: layout
                }))}
              />
              {errors.layout && <p className="text-red-500 text-xs mt-1">{errors.layout}</p>}
            </div>
            <div>
              <Select
                size="large"
                placeholder="Event Type *"
                className="w-full"
                status={errors.eventType ? "error" : ""}
                onChange={value => setForm({ ...form, eventType: value })}
                options={eventTypes.map(type => ({
                  value: type,
                  label: type
                }))}
              />
              {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
            </div>
            <div>
              <DatePicker
                size="large"
                className="w-full"
                placeholder="Select Date *"
                status={errors.date ? "error" : ""}
                onChange={(date) => setForm({ ...form, date })}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <Input
                size="large"
                placeholder="Expected Guest Count *"
                type="number"
                value={form.guestCount}
                status={errors.guestCount ? "error" : ""}
                onChange={e => setForm({ ...form, guestCount: e.target.value })}
                className="rounded-lg"
              />
              {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount}</p>}
            </div>
            <div>
              <TimePicker.RangePicker
                size="large"
                format="HH:mm"
                className="w-full"
                placeholder={["Start Time *", "End Time *"]}
                status={errors.time ? "error" : ""}
                onChange={(times) => setForm({ 
                  ...form, 
                  startTime: times?.[0], 
                  endTime: times?.[1] 
                })}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
            <div>
              <Select
                size="large"
                placeholder="Food Preference *"
                className="w-full"
                status={errors.foodPreference ? "error" : ""}
                onChange={value => setForm({ ...form, foodPreference: value })}
                options={foodOptions}
              />
              {errors.foodPreference && <p className="text-red-500 text-xs mt-1">{errors.foodPreference}</p>}
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-700">
            Additional Requirements
          </Typography>
          <TextArea
            rows={4}
            placeholder="Any specific requirements or preferences..."
            value={form.additionalRequirements}
            onChange={e => setForm({ ...form, additionalRequirements: e.target.value })}
            className="rounded-lg"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-700">
            Reference Image (Optional)
          </Typography>
          {imagePreview ? (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <MdDelete size={20} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <MdCloudUpload className="mx-auto text-4xl text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                Accepted file types: JPG, PNG, GIF, WebP, AVIF, SVG, BMP, TIFF (up to 10MB)
                </p>
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          color="brown"
          size="lg"
          className="w-full py-3"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Submit Booking Request
        </Button>
      </div>
    </Modal>
  );
};

export default BookEventModal;