import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { currentUser } from "../../redux/features/auth/authSlice";
import Loading from "../../Components/ui/Loading";
import { Card, Avatar, Button, Modal, Typography, Row, Col, Badge } from "antd";
import UpdateProfile from "./UpdateProfile";
import { FaEdit } from "react-icons/fa";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";

const { Title, Text } = Typography;

const Profile = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profilePromptOpen, setProfilePromptOpen] = useState(false);
  const user = useSelector(currentUser);
  const { data, isLoading } = useGetSingleUserQuery(user?.email);

  const userData = data?.data;

  const showUpdateProfileModal = location?.state?.showUpdateProfileModal;
  const showProfilePromptModal = location?.state?.showProfilePromptModal;

  const handleOpen = () => setOpen(!open);
  const handleProfilePromptOpen = () => setProfilePromptOpen(!profilePromptOpen);

  useEffect(() => {
    if (showUpdateProfileModal) {
      setOpen(true);
    }
    if (showProfilePromptModal) {
      setProfilePromptOpen(true);
    }
  }, [showUpdateProfileModal, showProfilePromptModal]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex">
      <Card className="rounded-lg w-full">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <div className="w-fit mx-auto text-center ">
              <Badge.Ribbon text={user.status === 'PREMIUM' ? 'PREMIUM' : ''} color="red">
                <Avatar
                  shape="circle"
                  size={150}
                  src={userData?.image || "/safa-logo.png"}
                  alt="profile"
                  className="rounded-full"
                />
              </Badge.Ribbon>
            </div>
          </Col>
          <Col xs={24} md={18}>
            <div className="flex justify-between">
              <div>
                <Title level={3}>{userData?.name}</Title>
                <Text>Email: {userData?.email}</Text>
                <br />
                <Text>Role: <span className="uppercase">{userData?.role} </span></Text>
                <br />
                <Text>
                  Member Since:{" "}
                  {new Date(userData?.createdAt).toLocaleDateString()}
                </Text>
                <br />
              </div>
              <div>
                <Button
                  type="default"
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    borderColor: "black",
                  }}
                  onClick={handleOpen}
                >
                  <FaEdit />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      <Modal
        open={open}
        onCancel={handleOpen}
        footer={null}
        className="rounded-lg ct-modal"
      >
        <UpdateProfile />
      </Modal>
      {/* Profile Update Prompt Modal */}
      <Modal
        open={profilePromptOpen}
        onCancel={handleProfilePromptOpen}
        footer={null}
        className="rounded-lg"
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>
          <p>Please update your profile to complete your registration.</p>
          <div className="mt-4">
            <Button onClick={handleProfilePromptOpen} className="mr-2">
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleProfilePromptOpen();
                handleOpen();
              }}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;