import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';
import Loading from '../../../Components/ui/Loading';
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery } from '../../../redux/features/coupon/couponApi';
import AddDiscountModal from './AddDiscountModal';
import { DeleteOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';

const DiscountManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createCoupon] = useCreateCouponMutation();
  const { data, isLoading } = useGetAllCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSaveCoupon = async (newCoupon) => {
    const toastId = toast.loading('Creating coupon...');
    try {
      await createCoupon(newCoupon).unwrap();
      toast.success('Coupon created successfully', { id: toastId });
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to create coupon', { id: toastId });
      console.log(error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const toastId = toast.loading('Deleting coupon...');
    try {
      await deleteCoupon(couponId).unwrap();
      toast.success('Coupon deleted successfully', { id: toastId });
    } catch (error) {
      toast.error('Failed to delete coupon', { id: toastId });
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="my-5 p-3">
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
        >
          <PlusOutlined />
          Add New Coupon
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((coupon) => (
          <div key={coupon?.code} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gold px-4 py-2 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">{coupon?.code}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${coupon?.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Discount:</span>
                  <span className="font-medium text-gray-900">
                    {coupon.discountType === 'percentage' ? `${coupon?.discountValue}%` : `$${coupon?.discountValue}`}
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

      <AddDiscountModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSaveCoupon}
      />
    </div>
  );
};

export default DiscountManagement;