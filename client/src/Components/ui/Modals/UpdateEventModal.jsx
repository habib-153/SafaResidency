/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Input, Select, DatePicker, TimePicker } from "antd";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useUpdateEventMutation } from "../../../redux/features/event/eventApi";
import dayjs from "dayjs";

const { TextArea } = Input;

const UpdateEventModal = ({ visible, onClose, event }) => {
  const [form, setForm] = useState({
    status: "",
    eventType: "",
    layout: "",
    date: null,
    startTime: null,
    endTime: null,
    guestCount: "",
    foodPreference: "",
    additionalRequirements: ""
  });

  const [updateEvent] = useUpdateEventMutation();

  useEffect(() => {
    if (event) {
      setForm({
        status: event.status,
        eventType: event.eventType,
        layout: event.layout,
        date: dayjs(event.date),
        startTime: dayjs(event.startTime, 'HH:mm'),
        endTime: dayjs(event.endTime, 'HH:mm'),
        guestCount: event.guestCount,
        foodPreference: event.foodPreference,
        additionalRequirements: event.additionalRequirements
      });
    }
  }, [event]);

  const handleSubmit = async () => {
    const toastId = toast.loading('Updating event...');
    try {
      const updateData = {
        ...form,
        date: form.date.format('YYYY-MM-DD'),
        startTime: form.startTime.format('HH:mm'),
        endTime: form.endTime.format('HH:mm')
      };

      const res = await updateEvent({ id: event._id, data: updateData });

      if (res.error) {
        toast.error(res.error.data.message || 'Update failed', { id: toastId });
      } else {
        toast.success('Event updated successfully', { id: toastId });
        onClose();
      }
    } catch (error) {
      toast.error('Failed to update event', { id: toastId });
    }
  };

  return (
    <Modal
      title="Update Event"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="space-y-4 py-4">
        <Select
          className="w-full"
          placeholder="Status"
          value={form.status}
          onChange={(value) => setForm({ ...form, status: value })}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
        />
        
        <Select
          className="w-full"
          placeholder="Event Type"
          value={form.eventType}
          onChange={(value) => setForm({ ...form, eventType: value })}
          options={[
            { value: 'Conference', label: 'Conference' },
            { value: 'Wedding', label: 'Wedding' },
            { value: 'Birthday', label: 'Birthday' },
            { value: 'Corporate', label: 'Corporate' },
            { value: 'Other', label: 'Other' }
          ]}
        />

        <Select
          className="w-full"
          placeholder="Layout"
          value={form.layout}
          onChange={(value) => setForm({ ...form, layout: value })}
          options={[
            { value: 'Classroom Setup', label: 'Classroom Setup' },
            { value: 'U-Shape Layout', label: 'U-Shape Layout' },
            { value: 'I-Shape Layout', label: 'I-Shape Layout' },
            { value: 'Theater Style', label: 'Theater Style' },
            { value: 'Custom Layout', label: 'Custom Layout' }
          ]}
        />

        <DatePicker
          className="w-full"
          value={form.date}
          onChange={(date) => setForm({ ...form, date })}
        />

        <TimePicker.RangePicker
          className="w-full"
          value={[form.startTime, form.endTime]}
          onChange={(times) => setForm({
            ...form,
            startTime: times?.[0],
            endTime: times?.[1]
          })}
        />

        <Input
          placeholder="Guest Count"
          type="number"
          value={form.guestCount}
          onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
        />

        <Select
          className="w-full"
          placeholder="Food Preference"
          value={form.foodPreference}
          onChange={(value) => setForm({ ...form, foodPreference: value })}
          options={[
            { value: 'buffet', label: 'Buffet Service' },
            { value: 'plated', label: 'Plated Service' },
            { value: 'snacks', label: 'Light Snacks & Beverages' },
            { value: 'none', label: 'No Food Required' }
          ]}
        />

        <TextArea
          rows={4}
          placeholder="Additional Requirements"
          value={form.additionalRequirements}
          onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}
        />

        <Button
          color="brown"
          className="w-full"
          onClick={handleSubmit}
        >
          Update Event
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateEventModal;