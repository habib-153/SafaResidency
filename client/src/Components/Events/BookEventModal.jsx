/* eslint-disable react/prop-types */
import { Modal, Input, Select, DatePicker, TimePicker } from "antd";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { MdCloudUpload } from "react-icons/md";

const { TextArea } = Input;

const BookEventModal = ({ isOpen, onClose, layouts }) => {
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
    additionalRequirements: "",
    preferenceImage: null
  });

  const eventTypes = [
    "Corporate Meeting",
    "Training Session",
    "Workshop",
    "Seminar",
    "Conference",
    "Product Launch",
    "Other"
  ];

  const handleSubmit = () => {
    console.log(form);
    onClose();
  };

  return (
    <Modal
      title={
        <Typography  className="font-semibold text-2xl text-gray-800 py-2">
          Book Your Event Space
        </Typography>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className=""
    >
      <div className="space-y-6 py-4">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-700">
            Personal Information
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              size="large"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="rounded-lg"
            />
            <Input
              size="large"
              placeholder="Company Name"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              className="rounded-lg"
            />
            <Input
              size="large"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="rounded-lg"
            />
            <Input
              size="large"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Event Details Section */}
        <div className="space-y-4">
          <Typography variant="h6" className="text-gray-700">
            Event Details
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              size="large"
              placeholder="Select Layout"
              className="w-full"
              value={form.layout}
              onChange={value => setForm({ ...form, layout: value })}
              options={layouts.map(layout => ({
                value: layout.id,
                label: layout.title
              }))}
            />
            <Select
              size="large"
              placeholder="Event Type"
              className="w-full"
              value={form.eventType}
              onChange={value => setForm({ ...form, eventType: value })}
              options={eventTypes.map(type => ({
                value: type,
                label: type
              }))}
            />
            <DatePicker
              size="large"
              className="w-full"
              placeholder="Select Date"
              onChange={(date) => setForm({ ...form, date })}
            />
            <Input
              size="large"
              placeholder="Expected Guest Count"
              type="number"
              value={form.guestCount}
              onChange={e => setForm({ ...form, guestCount: e.target.value })}
              className="rounded-lg"
            />
            <TimePicker.RangePicker
              size="large"
              className="w-full"
              placeholder={["Start Time", "End Time"]}
              onChange={(times) => setForm({ 
                ...form, 
                startTime: times?.[0], 
                endTime: times?.[1] 
              })}
            />
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
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={e => setForm({ ...form, preferenceImage: e.target.files[0] })}
              className="hidden"
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              <MdCloudUpload className="mx-auto text-4xl text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG up to 10MB
              </p>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          color="brown"
          size="lg"
          className="w-full py-3"
          onClick={handleSubmit}
        >
          Submit Booking Request
        </Button>
      </div>
    </Modal>
  );
};

export default BookEventModal;