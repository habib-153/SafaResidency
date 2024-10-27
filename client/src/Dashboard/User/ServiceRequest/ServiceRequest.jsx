import { Select, Input, Button, Form } from "antd";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useBookServiceMutation } from "../../../redux/features/service/serviceApi";
import { toast } from "react-hot-toast";

const { Option } = Select;
const { TextArea } = Input;

const ServiceRequest = () => {
  const [createServiceRequest] = useBookServiceMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log(values);
    const toastId = toast.loading("Submitting your request...");

    const res = await createServiceRequest(values);
    if (res?.error) {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 3000 });
    } else {
      toast.success(
        "Request submitted successfully!, we will contact with you soon",
        { id: toastId, duration: 3000 }
      );
      form.resetFields();
    }
  };

  return (
    <section>
      <Card className="mx-auto w-96 shadow-none">
        <CardBody className="text-center p-0 text-black">
          <Typography variant="h5" className="mb-2">
            Service Request
          </Typography>
          <Typography>
            Please select a service type and describe your request.
          </Typography>
          <Form
            form={form}
            name="service-request"
            onFinish={onFinish}
            layout="vertical"
            className="mt-2"
          >
            <Form.Item
              label="Room Number"
              name="room"
              rules={[{ required: true, message: "Please Enter Room Number!" }]}
            >
              <Input placeholder="Please Enter Room Number" />
            </Form.Item>
            <Form.Item
              label="Service Type"
              name="service"
              rules={[
                { required: true, message: "Please select a service type!" },
              ]}
            >
              <Select placeholder="Select service type">
                <Option value="Maintenance">Maintenance</Option>
                <Option value="Cleaning">Cleaning</Option>
                <Option value="IT Support">IT Support</Option>
                <Option value="Catering">Catering</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Request Details"
              name="description"
              rules={[
                { required: true, message: "Please describe your request!" },
              ]}
            >
              <TextArea
                placeholder="Please describe your request here..."
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
          </Form>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Button
            type="primary"
            className="btn mx-auto hover:text-gold hover:bg-white"
            onClick={() => form.submit()}
          >
            Submit Request
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ServiceRequest;
