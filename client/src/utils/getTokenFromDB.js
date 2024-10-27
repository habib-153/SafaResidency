export const getTokenFromDB = async (user, getToken, payload) => {
  const userInfo = {
    email: user?.email,
    name: user?.displayName,
    image: user?.photoURL ? user.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    phone: payload?.phoneNumber,
  };

  const res = await getToken(userInfo);

  const info = res?.data?.data;
  const userData = {
    user: {
      email: info.email,
      name: info.name,
      role: info.role,
      image: info.image,
      phone: info?.phone,
      membershipNumber: info?.membershipNumber,
    },
    token: res.data.token,
  };

  return userData;
};
