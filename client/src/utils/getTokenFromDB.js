export const getTokenFromDB = async (user, getToken) => {
  const userInfo = {
    email: user.email,
    name: user.displayName,
  };

  const res = await getToken(userInfo);
  const info = res.data.data;
  const userData = {
    user: {
      email: info.email,
      name: info.name,
      role: info.role,
    },
    token: res.data.token,
  };

  return userData;
};
