import { useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import Loading from "../../Components/ui/Loading";
import { Card, Avatar, Button, Modal, Typography, Row, Col, Badge } from "antd";
import UpdateProfile from "./UpdateProfile";
import { FaEdit } from "react-icons/fa";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";

const { Title, Text } = Typography;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(currentUser);
  const { data, isLoading } = useGetSingleUserQuery(user?.email);

  const userData = data?.data;

  const handleOpen = () => setOpen(!open);

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
        className="rounded-lg"
      >
        <UpdateProfile />
      </Modal>
    </div>
  );
};

export default Profile;
