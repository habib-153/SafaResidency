/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';

const { Option } = Select;

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
          label="Coupon Code"
          rules={[{ required: true, message: 'Please input the coupon code!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="discountType"
          label="Discount Type"
          rules={[{ required: true, message: 'Please select a discount type!' }]}
        >
          <Select placeholder="Select a discount type">
            <Option value="percentage">Percentage</Option>
            <Option value="fixed">Fixed Amount</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="discountValue"
          label="Discount Value"
          rules={[{ required: true, message: 'Please input the discount value!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="expirationDate"
          label="Expiration Date"
          rules={[{ required: true, message: 'Please select the expiration date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="minimumPurchaseAmount"
          label="Minimum Purchase Amount"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="usageLimit"
          label="Usage Limit"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Save Coupon
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDiscountModal;