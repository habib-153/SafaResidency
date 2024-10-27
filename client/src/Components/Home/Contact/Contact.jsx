import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import { Card, Typography, Button, Input, Textarea } from "@material-tailwind/react";
import { Form, message } from "antd";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import Loading from "../../ui/Loading";


const ContactForm = () => {
  const [form] = Form.useForm();
  const user = useSelector(currentUser);
  const { data, isLoading } = useGetSingleUserQuery(user?.email);
  const userData = data?.data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Email submission logic here
      await fetch("https://formsubmit.co/info@safaresidency.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      
      message.success("Message sent successfully!");
      form.resetFields();
    } catch (error) {
        message.error("Failed to send message. Please try again.");
        console.log(error)
    }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Typography variant="h2" className="text-center mb-8">
          Get in Touch
        </Typography>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 shadow-xl">
            <Typography variant="h4" className="mb-6">
              Send Us a Message
            </Typography>
            
            <Form
              form={form}
              onFinish={handleSubmit}
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || ""
              }}
              layout="vertical"
              className="space-y-4"
            >
              <div>
                <Input
                  name="name"
                  label="Full Name"
                  size="lg"
                  className="!border-t-blue-gray-200 focus:!border-gold"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  size="lg"
                  className="!border-t-blue-gray-200 focus:!border-gold"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>

              <div>
                <Input
                  name="subject"
                  label="Subject"
                  size="lg"
                  className="!border-t-blue-gray-200 focus:!border-gold"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  label="Your Message"
                  size="lg"
                  rows={6}
                  className="!border-t-blue-gray-200 focus:!border-gold"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 transition-all"
                size="lg"
              >
                Send Message
              </Button>
            </Form>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gold text-white h-full">
            <Typography variant="h4" className="mb-8">
              Contact Information
            </Typography>

            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdEmail className="text-2xl mt-1" />
                <div>
                  <Typography variant="h6">Email Us</Typography>
                  <Typography variant="small">
                    info@safaresidency.com
                    <br />
                    We`&apos;`ll respond within 24 hours
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdPhone className="text-2xl mt-1" />
                <div>
                  <Typography variant="h6">Call Us</Typography>
                  <Typography variant="small">
                    +1 (555) 123-4567
                    <br />
                    Monday to Friday, 9am - 6pm
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdLocationOn className="text-2xl mt-1" />
                <div>
                  <Typography variant="h6">Visit Us</Typography>
                  <Typography variant="small">
                    123 Adventure Street
                    <br />
                    Explore City, EC 12345
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdAccessTime className="text-2xl mt-1" />
                <div>
                  <Typography variant="h6">Business Hours</Typography>
                  <Typography variant="small">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </Typography>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactForm;