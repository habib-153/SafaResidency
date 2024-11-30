/* eslint-disable react/prop-types */
import { Modal, Descriptions, Image } from "antd";
import { Typography } from "@material-tailwind/react";

const EventDetailsModal = ({ visible, onClose, event }) => {
  if (!event) return null;

  return (
    <Modal
      title={
        <Typography className="font-semibold text-2xl text-gray-800">
          Event Details
        </Typography>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6 py-4">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Name" span={2}>
            {event?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {event?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {event?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Company" span={2}>
            {event?.company || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Event Type">
            {event?.eventType}
          </Descriptions.Item>
          <Descriptions.Item label="Layout">
            {event?.layout}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {new Date(event?.date).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Time">
            {event?.startTime} - {event?.endTime}
          </Descriptions.Item>
          <Descriptions.Item label="Guest Count">
            {event?.guestCount}
          </Descriptions.Item>
          <Descriptions.Item label="Food Preference">
            {event?.foodPreference}
          </Descriptions.Item>
          <Descriptions.Item label="Additional Requirements" span={2}>
            {event?.additionalRequirements || 'N/A'}
          </Descriptions.Item>
          {event?.preferenceImage && (
            <Descriptions.Item label="Reference Image" span={2}>
              <Image
                src={event?.preferenceImage}
                alt="Reference"
                width={200}
                className="rounded-lg"
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;