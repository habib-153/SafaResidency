import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';

const getToken = async (payload: Partial<TUser>) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    const lastUser = await User.findOne().sort({ membershipNumber: -1 });

    // Generate the next membership number
    let nextMembershipNumber = 'SAFA000001';
    if (lastUser && lastUser.membershipNumber) {
      const lastNumber = parseInt(lastUser.membershipNumber.replace('SAFA', ''), 10);
      nextMembershipNumber = `SAFA${String(lastNumber + 1).padStart(6, '0')}`;
    }

    // Create the new user with the generated membership number
    const newUser = await User.create({ ...payload, membershipNumber: nextMembershipNumber });

    const jwtPayload = {
      email: newUser.email,
      role: newUser.role,
    };
    const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: config.jwt_expires_in as string,
    });

    return { token, user: newUser };
  } else {
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: config.jwt_expires_in as string,
    });

    return { token, user };
  }
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'email', 'role'];
  const users = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await users.modelQuery;
  const meta = await users.countTotal();

  return { result, meta };
};

const getUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

const updateUserIntoDB = async (payload: Partial<TUser>, id: string) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
}

export const AuthService = {
  getToken,
  getAllUserFromDB,
  getUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB
};
