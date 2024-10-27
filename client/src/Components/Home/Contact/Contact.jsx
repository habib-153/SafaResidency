
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../../redux/features/auth/authApi";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Form, message, Input } from "antd";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import Loading from "../../ui/Loading";

const { TextArea } = Input;

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
      await fetch("https://formsubmit.co/info@safaresidency.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      //email send er function ta diye dish
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
          <Card className="p-8 shadow-xl">
            <Typography variant="h4" className="mb-8">
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
              className="space-y-6"
            >
              <Form.Item
                label={
                  <span className="text-base font-medium px-1">
                    Full Name
                  </span>
                }
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  size="large"
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-base font-medium px-1">
                    Email Address
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  size="large"
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-base font-medium px-1">
                    Subject
                  </span>
                }
                name="subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input 
                  size="large"
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-base font-medium px-1">
                    Your Message
                  </span>
                }
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  rows={6}
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors resize-none"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 transition-all py-3 text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gold text-white h-full">
            <Typography variant="h4" className="mb-12">
              Contact Information
            </Typography>

            <div className="space-y-8">
              <motion.div
                className="flex items-start gap-6"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdEmail className="text-3xl mt-1" />
                <div>
                  <Typography variant="h6" className="mb-2">Email Us</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                    info@safaresidency.com
                    <br />
                    We`&apos;`ll respond within 24 hours
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-6"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdPhone className="text-3xl mt-1" />
                <div>
                  <Typography variant="h6" className="mb-2">Call Us</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                  +8801831-335222
                    <br />
                    Monday to Friday, 9am - 6pm
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-6"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdLocationOn className="text-3xl mt-1" />
                <div>
                  <Typography variant="h6" className="mb-2">Visit Us</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                    Commercial Area, Airport Road, Nikunja 2, Khilkhet
                  <br />
                    Dhaka,
                  Bangladesh, 1229
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-6"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdAccessTime className="text-3xl mt-1" />
                <div>
                  <Typography variant="h6" className="mb-2">Business Hours</Typography>
                  <Typography variant="paragraph" className="opacity-80">
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