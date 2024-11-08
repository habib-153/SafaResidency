/* eslint-disable react/prop-types */
import { Button, Input, Option, Select } from '@material-tailwind/react';
import { Modal, Form, DatePicker } from 'antd';



const AddDiscountModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Add New Coupon"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="code"
         
          rules={[{ required: true, message: 'Please input the coupon code!' }]}
        >
          <Input  label="Coupon Code"/>
        </Form.Item>
        <Form.Item
          name="discountType"
          
          rules={[{ required: true, message: 'Please select a discount type!' }]}
        >
          <Select label="Discount Type" placeholder="Select a discount type">
            <Option value="percentage">Percentage</Option>
            <Option value="fixed">Fixed Amount</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="discountValue"
          
          rules={[{ required: true, message: 'Please input the discount value!' }]}
        >
          <Input type="number" label="Discount Value"/>
        </Form.Item>
        <Form.Item
          name="expirationDate"
          label="Expiration Date"
          rules={[{ required: true, message: 'Please select the expiration date!' }]}
        >
          <DatePicker className='w-full'/>
        </Form.Item>
        <Form.Item
          name="minimumPurchaseAmount"
         
        >
          <Input type="number"  label="Minimum Purchase Amount" />
        </Form.Item>
        <Form.Item
          name="usageLimit"
          label="Usage Limit"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button className='btn' htmlType="submit">
              Save Coupon
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDiscountModal;