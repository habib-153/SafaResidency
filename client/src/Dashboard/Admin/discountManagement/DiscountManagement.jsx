import  { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Toaster, toast } from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';
import Loading from '../../../Components/ui/Loading';
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery } from '../../../redux/features/coupon/couponApi';
import AddDiscountModal from './AddDiscountModal';

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
    try {
      await createCoupon(newCoupon).unwrap();
      toast.success('Coupon created successfully');
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to create coupon');
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
      <Toaster />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black">Coupon Management</h1>
        <p className="text-gray-600">Add, manage, and delete coupons</p>
      </div>
      <div className="w-full text-right mb-4">
        <Button onClick={handleOpenModal}>
          Add Coupon
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.data?.map((coupon) => (
          <div key={coupon.code} className="bg-white shadow-lg rounded-lg p-4 relative">
            <div className="absolute top-2 right-2">
              <Button
                size="sm"
                variant="filled"
                className="bg-red-500 hover:bg-red-700 text-white"
                onClick={() => handleDeleteCoupon(coupon.code)}
              >
                <BsTrash className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-lg font-bold text-black mb-2">{coupon.code}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Discount:</strong> {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Minimum Purchase:</strong> {coupon.minimumPurchaseAmount ? `$${coupon.minimumPurchaseAmount}` : 'None'}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Usage Limit:</strong> {coupon.usageLimit ? coupon.usageLimit : 'Unlimited'}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Expiration:</strong> {new Date(coupon.expirationDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Used:</strong> {coupon.usedCount ? coupon.usedCount : 0} time(s)
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Status:</strong> {coupon.isActive ? 'Active' : 'Inactive'}
            </p>
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