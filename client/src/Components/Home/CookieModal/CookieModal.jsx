import { useState, useEffect } from 'react';
import { Modal, Button, Typography } from 'antd';

const CookieConsentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show the modal if the user has not accepted cookies
      setIsModalVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Handle cookie acceptance logic here
    setIsModalVisible(false);
    // Set a cookie or local storage item to remember the user's choice
    localStorage.setItem('cookieConsent', 'true');
  };

  const handleDecline = () => {
    // Handle cookie decline logic here
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Safa Residency Cookie Policy"
      visible={isModalVisible}
      onCancel={handleDecline}
      footer={[
        <Button key="decline" onClick={handleDecline}>
          Decline
        </Button>,
        <Button key="accept" type="primary" onClick={handleAccept}>
          Accept
        </Button>,
      ]}
    >
      <Typography.Paragraph>
      We use cookies, pixels and other technology to collect information you provide to us and information about your interaction with our site to enhance site navigation, analyze site usage, and assist in our marketing efforts. If you are a mobile App user, we do not store cookies or other technologies on your device that track you across third-party apps or websites. For more information, please see our Privacy Notice.      </Typography.Paragraph>
      <Typography.Paragraph>
      Cookies Notice for  Safa Rediencey.
        </Typography.Paragraph>
      <Typography.Paragraph>
      This “Cookies Notice” (the “Notice”) explains how and why Safa Rediencey of PO Box House#08,Road No-18,Nikunja-02,Khilkhet, Dhaka-1229, Bangladesh (also referred to as also referred to as “ Safa Rediencey”, “we”, “our” and “us”) will use different types of cookies and similar technologies on any websites or apps (the “Site”) that we own or control. This Notice also explains how you can manage cookies and similar technologies.        </Typography.Paragraph>
    </Modal>
  );
};

export default CookieConsentModal;