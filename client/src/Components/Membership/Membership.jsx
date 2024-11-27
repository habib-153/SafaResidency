/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaInfoCircle, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Tooltip, Modal, Input, message } from 'antd';
import { Typography } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const LOCAL_STORAGE_KEY = 'membership_benefits_data';

const MembershipBenefits = () => {
  const user = useSelector(currentUser);
  const isAdmin = user?.role === 'admin';
  
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [tiers] = useState([
    { id: 'member', name: 'Member', price: '0', color: 'bg-gold' },
    { id: 'silver', name: 'Silver', price: '2,500', color: 'bg-gray-200' },
    { id: 'gold', name: 'Gold', price: '5,000', color: 'bg-amber-100' },
    { id: 'platinum', name: 'Platinum', price: '10,000', color: 'bg-gray-400' },
  ]);

  const initialBenefits = [
    {
      category: 'Stay Benefits',
      items: [
        { name: 'Member-only rates', member: true, silver: true, gold: true, platinum: true },
        { name: 'Complimentary WiFi', member: true, silver: true, gold: true, platinum: true },
        { name: 'Early check-in (subject to availability)', member: false, silver: false, gold: true, platinum: true },
        { name: 'Late check-out (subject to availability)', member: false, silver: false, gold: true, platinum: true },
        { name: 'Room upgrade', member: false, silver: false, gold: 'Upon availability', platinum: 'Guaranteed' },
        { name: 'Welcome amenity', member: false, silver: true, gold: true, platinum: true },
        { name: 'Birthday stay discount', member: false, silver: '10%', gold: '15%', platinum: '20%' },
        { name: 'Complimentary airport transfer', member: false, silver: false, gold: 'One-way', platinum: 'Round-trip' },
      ]
    },
    {
      category: 'Dining Benefits',
      items: [
        { name: 'Restaurant discount', member: '5%', silver: '10%', gold: '15%', platinum: '20%' },
        { name: 'Priority reservations', member: false, silver: false, gold: true, platinum: true },
        { name: 'Special dining events access', member: false, silver: false, gold: true, platinum: true },
        { name: "Chef's special welcome", member: false, silver: false, gold: true, platinum: true },
        { name: 'Complimentary birthday cake', member: false, silver: true, gold: true, platinum: true },
        { name: 'Private dining experience', member: false, silver: false, gold: 'Once/year', platinum: 'Twice/year' },
      ]
    },
    {
      category: 'Lifestyle Benefits',
      items: [
        { name: 'Spa treatments discount', member: '5%', silver: '10%', gold: '15%', platinum: '20%' },
        { name: 'Fitness center access', member: true, silver: true, gold: true, platinum: true },
        { name: 'Exclusive events invitation', member: false, silver: false, gold: true, platinum: true },
        { name: 'Partner privilege program', member: false, silver: false, gold: true, platinum: true },
        { name: 'Personal fitness consultation', member: false, silver: 'Once/stay', gold: 'Monthly', platinum: 'Weekly' },
      ]
    },
    {
      category: 'Rewards & Points',
      items: [
        { name: 'Points earning rate', member: '1x', silver: '1.5x', gold: '2x', platinum: '3x' },
        { name: 'Welcome bonus points', member: '500', silver: '2000', gold: '5000', platinum: '10000' },
        { name: 'Birthday bonus points', member: false, silver: '1000', gold: '2000', platinum: '5000' },
        { name: 'Points never expire', member: false, silver: false, gold: true, platinum: true },
      ]
    },
    {
      category: 'Business Services',
      items: [
        { name: 'Meeting room access', member: false, silver: '2 hrs/month', gold: '5 hrs/month', platinum: '10 hrs/month' },
        { name: 'Business center services', member: '10%', silver: '15%', gold: '20%', platinum: '25%' },
        { name: 'Video conferencing facilities', member: false, silver: false, gold: '2 hrs/stay', platinum: 'Unlimited' },
      ]
    }
  ];

  const [benefits, setBenefits] = useState(() => {
    const savedBenefits = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedBenefits ? JSON.parse(savedBenefits) : initialBenefits;
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(benefits));
    }
  }, [benefits, isAdmin]);

  const handleEditBenefit = (categoryIndex, itemIndex) => {
    setEditingItem({ 
      categoryIndex, 
      itemIndex, 
      ...benefits[categoryIndex].items[itemIndex],
      id: `${categoryIndex}-${itemIndex}` 
    });
    setShowModal(true);
  };

  const handleSaveBenefit = () => {
    if (editingItem) {
      const newBenefits = [...benefits];
      const { categoryIndex, itemIndex, ...itemData } = editingItem;
      newBenefits[categoryIndex].items[itemIndex] = itemData;
      setBenefits(newBenefits);
      setShowModal(false);
      setEditingItem(null);
      message.success('Benefit updated successfully');
    }
  };

  const handleAddBenefit = (categoryIndex) => {
    const newBenefit = {
      name: 'New Benefit',
      member: false,
      silver: false,
      gold: false,
      platinum: false
    };
    
    const newBenefits = [...benefits];
    newBenefits[categoryIndex].items.push(newBenefit);
    setBenefits(newBenefits);
    message.success('New benefit added');
  };

  const handleDeleteBenefit = (categoryIndex, itemIndex) => {
    const newBenefits = [...benefits];
    newBenefits[categoryIndex].items.splice(itemIndex, 1);
    setBenefits(newBenefits);
    message.success('Benefit deleted successfully');
  };

  const handleAddCategory = () => {
    const newCategory = {
      category: 'New Category',
      items: []
    };
    setBenefits([...benefits, newCategory]);
    message.success('New category added');
  };

  const handleDeleteCategory = (index) => {
    setCategoryToDelete(index);
    setDeleteConfirmVisible(true);
  };

  const confirmDeleteCategory = () => {
    const newBenefits = benefits.filter((_, index) => index !== categoryToDelete);
    setBenefits(newBenefits);
    setDeleteConfirmVisible(false);
    setCategoryToDelete(null);
    message.success('Category deleted successfully');
  };

  const handleEditCategory = (index) => {
    setEditingCategory({ index, name: benefits[index].category });
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      const newBenefits = [...benefits];
      newBenefits[editingCategory.index].category = editingCategory.name;
      setBenefits(newBenefits);
      setEditingCategory(null);
      message.success('Category updated successfully');
    }
  };
  const MobileTierCard = ({ tier }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className={`${tier.color} rounded-t-lg -mx-6 -mt-6 p-6 mb-6`}>
        <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
        <div className="text-lg">
          {tier.price === '0' ? 'Free' : `$ ${tier.price}`}
        </div>
      </div>

      {benefits.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6">
          <h4 className="font-semibold text-lg mb-3">{category.category}</h4>
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <span className="ml-2">
                  {typeof item[tier.id] === 'boolean' ? (
                    item[tier.id] ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )
                  ) : (
                    <span className="text-sm font-medium">{item[tier.id]}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Link to="/sign-up" className="block mt-6">
        <button className="w-full bg-gold text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors">
          Join {tier.name}
        </button>
      </Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Membership Benefits | Safa Residency</title>
        <meta name="description" content="Explore Safa Residency's membership tiers and exclusive benefits. From Member to Platinum, discover the perfect tier for your lifestyle." />
        <meta name="keywords" content="Safa Residency, membership benefits, hotel membership, luxury stays, exclusive benefits" />
        <meta property="og:title" content="Membership Benefits - Safa Residency" />
        <meta property="og:description" content="Discover exclusive benefits across our membership tiers at Safa Residency." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="w-full px-4 md:px-6 lg:max-w-7xl lg:mx-auto overflow-hidden">
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold"
            >
              {editMode ? 'View Mode' : 'Edit Mode'}
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Typography variant="h2" className="text-xl font-[Bebas Neue] md:text-2xl lg:text-3xl font-bold text-center mb-8">
            Safa Residency Membership Tiers
          </Typography>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="overflow-x-auto">
              <select 
                className="w-full p-2 border rounded-lg bg-white mb-6"
                onChange={(e) => {
                  const element = document.getElementById(`tier-${e.target.value}`);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tiers.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} - {tier.price === '0' ? 'Free' : `$ ${tier.price}`}
                  </option>
                ))}
              </select>

              {tiers.map((tier) => (
                <div key={tier.id} id={`tier-${tier.id}`}>
                  <MobileTierCard tier={tier} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View - Tier Grid */}
          <div className="hidden md:block">
            <div className="hidden md:grid md:grid-cols-5 gap-4 mb-8">
            <div className="sticky top-0 bg-white">
              <Typography variant="h6" className="font-medium p-4">
                Benefits
              </Typography>
            </div>
            
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                id={`tier-${tier.id}`}
                className={`${tier.color} rounded-lg p-4`}
                whileHover={{ scale: editMode ? 1 : 1.02 }}
              >
                <Typography variant="h5" className="font-bold text-sm lg:text-base">
                  {tier.name}
                </Typography>
                <Typography className="text-gray-700 text-sm">
                  {tier.price === '0' ? 'Free' : `$ ${tier.price}`}
                </Typography>
              </motion.div>
            ))}
            </div>
            
          {/* Benefits Categories */}
          {benefits.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <div className="flex items-center justify-between mb-4 px-2">
                {editingCategory?.index === categoryIndex ? (
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="flex-1"
                    />
                    <button
                      onClick={handleSaveCategory}
                      className="bg-gold text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <Typography variant="h6" className="font-medium text-lg">
                    {category.category}
                  </Typography>
                )}
                
                {editMode && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(categoryIndex)}
                      className="text-gold hover:text-gold"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleAddBenefit(categoryIndex)}
                      className="text-gold hover:text-gold"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(categoryIndex)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Mobile View - Benefits List */}
              <div className="md:hidden">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={`${categoryIndex}-${itemIndex}`}
                    className="mb-4 border-b pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Tooltip title={item.name}>
                        <div className="flex items-center gap-2">
                          <FaInfoCircle className="text-gray-400 h-4 w-4" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </Tooltip>
                      {editMode && (
                        <div className="flex gap-2">
                          <button onClick={() => handleEditBenefit(categoryIndex, itemIndex)}>
                            <FaEdit className="text-gold" />
                          </button>
                          <button onClick={() => handleDeleteBenefit(categoryIndex, itemIndex)}>
                            <FaTrash className="text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {tiers.map((tier) => (
                        <div key={tier.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{tier.name}:</span>
                          <span className="text-sm">
                            {typeof item[tier.id] === 'boolean' ? (
                              item[tier.id] ? (
                                <FaCheck className="text-green-500" />
                              ) : (
                                <FaTimes className="text-red-500" />
                              )
                            ) : (
                              item[tier.id]
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop View - Benefits Grid */}
              <div className="hidden md:block">
              <div className="grid md:grid-cols-5 gap-4 mb-8"></div>
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={`${categoryIndex}-${itemIndex}`}
                    className="grid grid-cols-5 gap-4 mb-2 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Tooltip title={item.name}>
                        <div className="flex items-center gap-2">
                          <FaInfoCircle className="text-gray-400 h-4 w-4" />
                          <span className="truncate text-wrap">{item.name}</span>
                        </div>
                      </Tooltip>
                      {editMode && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditBenefit(categoryIndex, itemIndex)}
                            className="text-gold hover:text-gold"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteBenefit(categoryIndex, itemIndex)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {tiers.map((tier) => (
                      <div 
                        key={tier.id} 
                        className={`text-center ${editMode ? 'cursor-pointer hover:bg-yellow-50' : ''}`}
                      >
                        {typeof item[tier.id] === 'boolean' ? (
                          item[tier.id] ? (
                            <FaCheck className="mx-auto text-green-500" />
                          ) : (
                            <FaTimes className="mx-auto text-red-500" />
                          )
                        ) : (
                          <span>{item[tier.id]}</span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          </div>
          


          {/* Action Buttons */}
          <div className="space-y-4 px-4 md:px-0">
            {editMode && (
              <button
                onClick={handleAddCategory}
                className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold w-full"
              >
                Add Category
              </button>
            )}
            {!editMode && (
              <Link to="/sign-up" className="block mb-4">
                <button className="btn w-full text-center py-3">
                  Join now
                </button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Modals remain unchanged */}
        <Modal
          title="Edit Benefit"
          open={showModal}
          onOk={handleSaveBenefit}
          onCancel={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          okButtonProps={{ className: 'bg-gold hover:bg-gold' }}
        >
          {/* ... [Modal content remains the same] ... */}
        </Modal>

        <Modal
          title="Confirm Delete"
          open={deleteConfirmVisible}
          onOk={confirmDeleteCategory}
          onCancel={() => {
            setDeleteConfirmVisible(false);
            setCategoryToDelete(null);
          }}
          okButtonProps={{ 
            className: 'bg-red-500 hover:bg-red-600',
            danger: true 
          }}
        >
          <p>Are you sure you want to delete this category and all its benefits? This action cannot be undone.</p>
        </Modal>
      </div>
    </>
  );
};

export default MembershipBenefits;


