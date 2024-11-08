import { useState } from 'react';
import { Modal, Checkbox, DatePicker, message, Form } from 'antd';
import { DeleteOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';
import Loading from '../../../Components/ui/Loading';
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery } from '../../../redux/features/coupon/couponApi';
import { Button, Input, Option, Select } from '@material-tailwind/react';

const DiscountManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createCoupon] = useCreateCouponMutation();
  const { data, isLoading } = useGetAllCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleOpenModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      await createCoupon(values).unwrap();
      message.success('Coupon created successfully');
      handleCloseModal();
    } catch (error) {
      message.error('Failed to create coupon');
      console.error(error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const key = 'deletingCoupon';
    message.loading({ content: 'Deleting coupon...', key });
    try {
      await deleteCoupon(couponId).unwrap();
      message.success({ content: 'Coupon deleted successfully', key });
    } catch (error) {
      message.error({ content: 'Failed to delete coupon', key });
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <TagOutlined className="mr-2 text-gold" />
            Coupon Management
          </h1>
          <p className="text-gray-600">Create and manage your discount coupons</p>
        </div>
        
        <div className="w-full flex justify-end mb-6">
          <Button
            type="primary"
            onClick={handleOpenModal}
            className="bg-gold hover:bg-gold border-gold hover:border-gold rounded-lg flex items-center gap-1"
           
          ><PlusOutlined />
            Add New Coupon
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((coupon) => (
            <div key={coupon.code} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gold px-4 py-2 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">{coupon.code}</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${coupon.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Discount:</span>
                    <span className="font-medium text-gray-900">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Min. Purchase:</span>
                    <span className="font-medium text-gray-900">
                      {coupon.minimumPurchaseAmount ? `$${coupon.minimumPurchaseAmount}` : 'None'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Usage Limit:</span>
                    <span className="font-medium text-gray-900">
                      {coupon.usageLimit ? coupon.usageLimit : 'Unlimited'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Expires:</span>
                    <span className="font-medium text-gray-900">
                      {coupon.expirationDate ? new Date(coupon.expirationDate).toLocaleDateString() : 'No expiry'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    danger
                    onClick={() => handleDeleteCoupon(coupon._id)}
                    className="hover:bg-red-50 bg-red-50 rounded-lg flex items-center mr-4  border border-red-600 text-red-500"
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          title={<div className="text-xl font-semibold text-gray-900">Create New Coupon</div>}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          className="rounded-xl overflow-hidden"
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{
              code: '',
              discountType: 'percentage',
              discountValue: 0,
              expirationDate: null,
              minimumPurchaseAmount: 0,
              usageLimit: 0,
              isActive: true,
            }}
            className="mt-4"
          >
            <Form.Item
              name="code"
             
              rules={[{ required: true, message: 'Please enter coupon code' }]}
            >
              <Input
                 label="Coupon Code"
                placeholder="Enter coupon code"
                className="rounded-lg border-gray-300 hover:border-gold focus:border-gold"
              />
            </Form.Item>

            <Form.Item
              name="discountType"
             
              rules={[{ required: true, message: 'Please select discount type' }]}
            
            >
              <Select
                 label="Discount Type"
                className="rounded-lg"
                dropdownClassName="rounded-lg "
              >
                <Option value="percentage">Percentage</Option>
                <Option value="fixed">Fixed Amount</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="discountValue"
             
              rules={[{ required: true, message: 'Please enter discount value' }]}
            >
              <Input 
                 label="Discount Value"
                type="number"
                placeholder="Enter discount value"
                className="rounded-lg border-gray-300 hover:border-gold focus:border-gold"
              />
            </Form.Item>

            <Form.Item
              name="expirationDate"
             
            >
              <DatePicker 
                 label="Expiration Date"
                style={{ width: '100%' }}
                className="rounded-lg border-gray-300 hover:border-gold focus:border-gold"
              />
            </Form.Item>

            <Form.Item
              name="minimumPurchaseAmount"
             
            >
              <Input 
                 label="Minimum Purchase Amount"
                type="number"
                placeholder="Enter minimum purchase amount"
                className="rounded-lg border-gray-300 hover:border-gold focus:border-gold"
              />
            </Form.Item>

            <Form.Item
              name="usageLimit"
             
            >
              <Input 
                 label="Usage Limit"
                type="number"
                placeholder="Enter usage limit"
                className="rounded-lg border-gray-300 hover:border-gold focus:border-gold"
              />
            </Form.Item>

            <Form.Item
              name="isActive"
              valuePropName="checked"
            >
              <Checkbox>Active</Checkbox>
            </Form.Item>

            <Form.Item className="flex justify-end mb-0">
              <Button 
                onClick={handleCloseModal} 
                className="mr-4 rounded-lg border bg-red-50 border-red-600 text-red-500"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                className="bg-gold hover:bg-gold-600 border-gold hover:border-gold-600 rounded-lg"
              >
                Create Coupon
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default DiscountManagement;