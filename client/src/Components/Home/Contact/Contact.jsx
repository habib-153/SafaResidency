import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../../redux/features/auth/authApi";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Form, message, Input } from "antd";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import Loading from "../../ui/Loading";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const ContactForm = () => {
  const { t } = useTranslation();
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
      message.success(t("Contact.messageSuccess"));
      form.resetFields();
    } catch (error) {
      message.error(t("Contact.messageError"));
      console.log(error);
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
        <Typography variant="h3" className="text-center mb-8">
          {t("Contact.title")}
        </Typography>
      </motion.div>
      <Helmet>
        <title>{`Contact | Safa Residency`}</title>
        <meta property="og:title" content={'Safa Residency Dhaka, Contact info'} />
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 shadow-xl">
            <Typography variant="h5" className="mb-6">
              {t("Contact.sendMessage")}
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
                label={<span className="text-base font-medium px-1">{t("Contact.fullName")}</span>}
                name="name"
                rules={[{ required: true, message: t("Contact.fullNameError") }]}
              >
                <Input
                  size="large"
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-medium px-1">{t("Contact.emailAddress")}</span>}
                name="email"
                rules={[
                  { required: true, message: t("Contact.emailError") },
                  { type: 'email', message: t("Contact.emailInvalid") }
                ]}
              >
                <Input
                  size="large"
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-medium px-1">{t("Contact.subject")}</span>}
                name="subject"
                rules={[{ required: true, message: t("Contact.subjectError") }]}
              >
                <Input
                  size="large"
                  className="rounded-lg px-4 py-2 border-2 focus:border-gold hover:border-gold transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-medium px-1">{t("Contact.yourMessage")}</span>}
                name="message"
                rules={[{ required: true, message: t("Contact.messageError") }]}
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
                  {t("Contact.sendMessageButton")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gold text-white h-full">
            <Typography variant="h5" className="mb-8">
              {t("Contact.contactInformation")}
            </Typography>

            <div className="space-y-8">
              <motion.div
                className="flex items-start gap-6"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MdEmail className="text-3xl mt-1" />
                <div>
                  <Typography variant="h6" className="mb-2">{t("Contact.emailUs")}</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                    info@safaresidency.com
                    <br />
                    {t("Contact.responseTime")}
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
                  <Typography variant="h6" className="mb-2">{t("Contact.callUs")}</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                    +8801831-335222
                    <br />
                    {t("Contact.mondayToFriday")}
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
                  <Typography variant="h6" className="mb-2">{t("Contact.visitUs")}</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                    {t("home.Footer.address")}
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
                  <Typography variant="h6" className="mb-2">{t("Contact.businessHours")}</Typography>
                  <Typography variant="paragraph" className="opacity-80">
                    {t("Contact.mondayToFriday")}
                    <br />
                    {t("Contact.saturday")}
                    <br />
                    {t("Contact.sunday")}
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