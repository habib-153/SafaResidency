export const getTokenFromDB = async (user, getToken) => {
  const userInfo = {
    email: user?.email,
    name: user?.displayName,
    image: user?.photoURL
  };

  const res = await getToken(userInfo);
  const info = res.data.data;
  const userData = {
    user: {
      email: info.email,
      name: info.name,
      role: info.role,
      image: info.image,
    },
    token: res.data.token,
  };

  return userData;
};
