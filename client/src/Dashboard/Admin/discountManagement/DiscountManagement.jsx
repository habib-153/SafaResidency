import { useState } from 'react';
import { Button, Modal, Input, Select, Checkbox, DatePicker } from "@material-tailwind/react";
import { Toaster, toast } from 'react-hot-toast';

import { BsTrash } from 'react-icons/bs';
import Loading from '../../../Components/ui/Loading';
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery } from '../../../redux/features/coupon/couponApi';

const DiscountManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createCoupon] = useCreateCouponMutation();
  const { data, isLoading } = useGetAllCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    expirationDate: new Date(),
    minimumPurchaseAmount: 0,
    usageLimit: 0,
    isActive: true,
  });

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCouponChange = (field, value) => {
    setNewCoupon((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveCoupon = async () => {
    try {
      await createCoupon(newCoupon).unwrap();
      toast.success('Coupon created successfully');
      handleCloseModal();
      setNewCoupon({
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        expirationDate: new Date(),
        minimumPurchaseAmount: 0,
        usageLimit: 0,
        isActive: true,
      });
    } catch (error) {
        toast.error('Failed to create coupon');
        console.log(error)
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const toastId = toast.loading('Deleting coupon...');
    try {
      await deleteCoupon(couponId).unwrap();
      toast.success('Coupon deleted successfully', { id: toastId });
    } catch (error) {
      toast.error('Failed to delete coupon', { id: toastId });
      console.log(error)
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
        <Button onClick={handleOpenModal} className="bg-gold text-white hover:bg-gray-800 hover:text-gold">
          Add Coupon
        </Button>
      </div>
          {/* Rest of the component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.data?.map((coupon) => (
          <div key={coupon.code} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-black">{coupon.code}</h3>
            <p className="text-gray-600">
              Discount: {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
            </p>
            <p className="text-gray-600">
              Minimum Purchase: {coupon.minimumPurchaseAmount ? `$${coupon.minimumPurchaseAmount}` : 'None'}
            </p>
            <p className="text-gray-600">
              Usage Limit: {coupon.usageLimit ? coupon.usageLimit : 'Unlimited'}
            </p>
            <p className="text-gray-600">
              Expiration: {new Date(coupon.expirationDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Used: {coupon.usedCount ? coupon.usedCount : 0} time(s)
            </p>
            <p className="text-gray-600">Status: {coupon.isActive ? 'Active' : 'Inactive'}</p>
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                variant="filled"
                className="bg-red-500 hover:bg-red-700 text-white"
                onClick={() => handleDeleteCoupon(coupon.code)}
              >
                <BsTrash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        size="md"
        open={isModalVisible}
        handler={handleCloseModal}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-black mb-4">Add New Coupon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="code" className="block text-black font-medium mb-2">
              Coupon Code
            </label>
            <Input
              id="code"
              value={newCoupon.code}
              onChange={(e) => handleCouponChange('code', e.target.value)}
              className="bg-gray-200 focus:bg-white focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="discountType" className="block text-black font-medium mb-2">
              Discount Type
            </label>
            <Select
              id="discountType"
              value={newCoupon.discountType}
              onChange={(value) => handleCouponChange('discountType', value)}
              className="bg-gray-200 focus:bg-white focus:border-black"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </Select>
          </div>
          <div>
            <label htmlFor="discountValue" className="block text-black font-medium mb-2">
              Discount Value
            </label>
            <Input
              id="discountValue"
              type="number"
              value={newCoupon.discountValue}
              onChange={(e) => handleCouponChange('discountValue', e.target.value)}
              className="bg-gray-200 focus:bg-white focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="expirationDate" className="block text-black font-medium mb-2">
              Expiration Date
            </label>
            <DatePicker
              id="expirationDate"
              value={newCoupon.expirationDate}
              onChange={(date) => handleCouponChange('expirationDate', date)}
              className="bg-gray-200 focus:bg-white focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="minimumPurchaseAmount" className="block text-black font-medium mb-2">
              Minimum Purchase Amount
            </label>
            <Input
              id="minimumPurchaseAmount"
              type="number"
              value={newCoupon.minimumPurchaseAmount}
              onChange={(e) => handleCouponChange('minimumPurchaseAmount', e.target.value)}
              className="bg-gray-200 focus:bg-white focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="usageLimit" className="block text-black font-medium mb-2">
              Usage Limit
            </label>
            <Input
              id="usageLimit"
              type="number"
              value={newCoupon.usageLimit}
              onChange={(e) => handleCouponChange('usageLimit', e.target.value)}
              className="bg-gray-200 focus:bg-white focus:border-black"
            />
          </div>
          <div className="col-span-2">
            <Checkbox
              id="isActive"
              checked={newCoupon.isActive}
              onChange={(checked) => handleCouponChange('isActive', checked)}
              className="text-black"
            >
              <span className="ml-2 text-black">Active</span>
            </Checkbox>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleCloseModal}
            className="bg-gray-400 hover:bg-gray-500 text-white mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCoupon}
            className="bg-gold hover:bg-gray-800 text-white"
          >
            Save Coupon
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DiscountManagement;