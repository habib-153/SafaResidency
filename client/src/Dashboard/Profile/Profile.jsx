import { useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import { motion } from "framer-motion";
import { Card, Typography, Badge } from "@material-tailwind/react";
import { Modal, Button, Avatar } from "antd";

import Loading from "../../Components/ui/Loading";
import UpdateProfile from "./UpdateProfile";
import { FcSettings } from "react-icons/fc";
import { FaGift } from "react-icons/fa6";
import { TbFileText } from "react-icons/tb";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(currentUser);
  const { data, isLoading } = useGetSingleUserQuery(user?.email);
  const userData = data?.data;
  
  const handleOpen = () => setOpen(!open);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <Typography variant="h2" className="text-center font-serif">
          Welcome to Profile, {userData?.name}
        </Typography>
      </motion.div>

      {/* Membership Info Bar */}
      <motion.div 
        className="bg-gray-50 p-4 rounded-lg mb-8"
        variants={itemVariants}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="small" color="blue-gray">
              Membership No
            </Typography>
            <Typography variant="h5">
              {userData?.email}
            </Typography>
          </div>
          
          <div className="flex flex-wrap text-start gap-6">
            <Button 
              type="ghost"
              icon={<FcSettings className="w-5 h-5" />}
              onClick={handleOpen}
            >
              MANAGE ACCOUNT
            </Button>
            
            <Button 
              type="ghost"
              icon={<FaGift className="w-5 h-5" />}
            >
              MY REWARDS
            </Button>
            
            <Button 
              type="ghost"
              icon={<TbFileText className="w-5 h-5" />}
            >
              STATEMENT SUMMARY
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Points Balance Card */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card className="p-6 md:shadow-none flex flex-col justify-between h-full">
            <Typography variant="h5" className="font-serif mb-4">
              Profile Points balance
            </Typography>
            <div className="text-center flex flex-col justify-between h-full">
              <Typography variant="h1" className="font-light">
                {userData?.points? userData?.points : 0}
              </Typography>
              <Typography variant="small" color="blue-gray" className="mt-2">
                Available balance
              </Typography>
              <Button type="default" block className="mt-4 hover:border-gold hover:text-gold">
                EXCHANGE POINTS
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tier Points Card */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card className="p-6 md:shadow-none">
            <Typography variant="h5" className="font-serif mb-4">
              Tier Points balance
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              0 points collected
            </Typography>
            
            <div className="flex justify-between mb-6">
              <div className="text-center">
                <motion.div 
                  className="w-8 h-8 bg-gold rounded-full mx-auto mb-2"
                  whileHover={{ scale: 1.1 }}
                />
                <Typography variant="small">MEMBER</Typography>
              </div>
              <div className="text-center">
                <motion.div 
                  className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"
                  whileHover={{ scale: 1.1 }}
                />
                <Typography variant="small">SILVER</Typography>
              </div>
              <div className="text-center">
                <motion.div 
                  className="w-8 h-8 bg-amber-600 rounded-full mx-auto mb-2"
                  whileHover={{ scale: 1.1 }}
                />
                <Typography variant="small">GOLD</Typography>
              </div>
              <div className="text-center">
                <motion.div 
                  className="w-8 h-8 bg-gray-700 rounded-full mx-auto mb-2"
                  whileHover={{ scale: 1.1 }}
                />
                <Typography variant="small">PLATINUM</Typography>
              </div>
            </div>

            {/* <Typography variant="small" className="text-center text-gray-600">
              Spend an additional USD 2,500 to collect 5,000 Tier Points to become a Silver member
            </Typography> */}
            
            <Button type="default" block className="mt-4 hover:border-gold hover:text-gold">
              MEMBER BENEFITS
            </Button>
          </Card>
        </motion.div>

        {/* E-Card Display */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card 
            className="p-6 min-h-[200px]"
            style={{
              background: "linear-gradient(to bottom right, rgb(180, 83, 9), rgb(234, 88, 12))"
            }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 0 }}
                >
                  <Typography variant="h1" className="font-serif">
                    O
                  </Typography>
                </motion.div>
                <Button 
                  type="ghost" 
                  className="mt-4 w-full text-white border-white hover:bg-white hover:text-gold"
                >
                  YOUR E-CARD
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Profile Badge */}
      <motion.div 
        variants={itemVariants}
        className="fixed bottom-4 right-4"
        whileHover={{ scale: 1.1 }}
      >
        <Badge content={user.status === 'PREMIUM' ? 'PREMIUM' : ''} color="red">
          <Avatar
            size={80}
            src={userData?.image || "/safa-logo.png"}
            alt="profile"
            className="border-4 border-white shadow-lg"
          />
        </Badge>
      </motion.div>

      {/* Modal */}
      <Modal
        open={open}
        onCancel={handleOpen}
        footer={null}
        className="rounded-lg"
      >
        <UpdateProfile />
      </Modal>
    </motion.div>
  );
};

export default Profile;