import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  updateProfile,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import auth from '../../../utils/firebase.config';
import { getTokenFromDB } from '../../../utils/getTokenFromDB';

const initialState = {
  user: null,
  token: '',
  isLoading: false,
  isError: false,
  error: '',
};

export const createUser = createAsyncThunk(
  'userSlice/createUser',
  async ({ email, password, image_url, name, getToken }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:image_url
    });
    
    const userData = await getTokenFromDB(userCredential.user, getToken);
    return userData;
  }
);

export const loginUser = createAsyncThunk(
  'userSlice/loginUser',
  async ({ email, password, getToken }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const userData = await getTokenFromDB(userCredential.user, getToken);
    return userData;
  }
);

export const loginWithGoogle = createAsyncThunk(
  'userSlice/loginWithGoogle',
  async (getToken) => {
    const provider = new GoogleAuthProvider(); 
    const result = await signInWithPopup(auth, provider);
    console.log(result)
    const userData = await getTokenFromDB(result.user, getToken);
    console.log(userData);
    return userData;
  }
);

export const logoutUser = createAsyncThunk(
  'userSlice/logoutUser',
  async () => {
    await signOut(auth);
  }
);

export const resetPassword = createAsyncThunk(
  'userSlice/resetPassword',
  async (email) => {
    await sendPasswordResetEmail(auth, email);
    return email;
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.user = '';
      state.token = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = '';
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.token = '';
        state.user = '';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = '';
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.token = '';
        state.user = '';
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = '';
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.token = '';
        state.user = '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = '';
        state.token = '';
        state.isLoading = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export const { setUser, toggleLoading, logout } = userSlice.actions;
export default userSlice.reducer;