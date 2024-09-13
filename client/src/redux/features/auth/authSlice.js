import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';
import auth from '../../../utils/firebase.config';

const initialState = {
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;

export const createUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser({ user: userCredential.user, token: userCredential.user.accessToken }));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const logIn = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser({ user: userCredential.user, token: userCredential.user.accessToken }));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const googleSignIn = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    dispatch(setUser({ user: result.user, token: result.user.accessToken }));
  } catch (error) {
    console.error(error);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(logout());
    Swal.fire({
      title: 'Logout successful',
      text: "See you again",
      confirmButtonColor: 'teal'
    });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserProfile = (name, photo) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    dispatch(setUser({ user: auth.currentUser, token: auth.currentUser.accessToken }));
  } catch (error) {
    console.error(error);
  }
};

export const listenToAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ user, token: user.accessToken }));
    } else {
      dispatch(logout());
    }
  });
};

export default authSlice.reducer;

export const useCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
