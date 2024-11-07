import { useState, useEffect } from "react";
import { Modal, Button, Typography } from "antd";

const CookieConsentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsModalVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setIsModalVisible(false);
    localStorage.setItem("cookieConsent", "true");
  };

  const handleDecline = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Safa Residency Cookie Policy"
      open={isModalVisible}
      onCancel={handleDecline}
      footer={[
        <Button key="decline" onClick={handleDecline}>
          Decline
        </Button>,
        <Button
          key="accept"
          style={{
            backgroundColor: "#c49a3b",
            color: isHovered ? "black" : "white",
          }}
          onClick={handleAccept}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Accept
        </Button>,
      ]}
    >
      <Typography.Paragraph>
        We use cookies, pixels and other technology to collect information you
        provide to us and information about your interaction with our site to
        enhance site navigation, analyze site usage, and assist in our marketing
        efforts. If you are a mobile App user, we do not store cookies or other
        technologies on your device that track you across third-party apps or
        websites. For more information, please see our Privacy Notice.{" "}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Cookies Notice for Safa Rediencey.
      </Typography.Paragraph>
    </Modal>
  );
};

export default CookieConsentModal;
