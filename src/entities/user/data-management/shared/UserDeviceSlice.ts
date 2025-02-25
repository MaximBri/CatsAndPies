import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userDeviceType } from '@/shared/types';
import { RootState } from '@/app/store';

const initialState: {
  device: userDeviceType;
} = {
  device: null,
};

const UserDeviceSlice = createSlice({
  name: 'userDevice',
  initialState,
  reducers: {
    setDevice(state, action: PayloadAction<userDeviceType>) {
      state.device = action.payload;
    },
  },
});
export const getUserDevice = (state: RootState) => state.userDevice.device;

export const { setDevice } = UserDeviceSlice.actions;
export default UserDeviceSlice.reducer;
