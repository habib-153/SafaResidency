/* eslint-disable no-unused-vars */
import { Select, Input, Button, Form } from 'antd';
import { Card,  CardBody, CardFooter, Typography } from "@material-tailwind/react";

const { Option } = Select;
const { TextArea } = Input;

const ServiceRequest = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
       // console.log('Received values:', values);
        // Here you would typically send this data to your backend

        // ekhane room number, user name, ki chaice oita , requested on, status egula patahiya dish, services gula update kore dish 

        
        alert('Service request submitted!');
    };

    return (
        <section >
             <Card className="mx-auto w-96 shadow-none">
           
            <CardBody className="text-center text-black">
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
                    className="mt-4"
                >
                    <Form.Item
                        name="serviceType"
                        rules={[{ required: true, message: 'Please select a service type!' }]}
                    >
                        <Select placeholder="Select service type">
                            <Option value="maintenance">Maintenance</Option>
                            <Option value="cleaning">Cleaning</Option>
                            <Option value="it-support">IT Support</Option>
                            <Option value="catering">Catering</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="requestDetails"
                        rules={[{ required: true, message: 'Please describe your request!' }]}
                    >
                        <TextArea
                            placeholder="Please describe your request here..."
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                </Form>
            </CardBody>
            <CardFooter divider className="flex items-center justify-between py-3">
                <Button type="primary" className='btn mx-auto hover:text-gold hover:bg-white' onClick={() => form.submit()}>
                    Submit Request
                </Button>
            </CardFooter>
            </Card>
            

        </section>
       
    );
};

export default ServiceRequest;