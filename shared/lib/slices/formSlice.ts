import { createSlice } from "@reduxjs/toolkit";

const formslice = createSlice({
  name: "Form",
  initialState: {
    doctor_name: "",
    patient_name: "",
    patient_phone: "",
    date: "",
    start_time: "",
    duration: 15,
    reason: "",
  },
  reducers: {
    setDoctorName: (state, action) => {
      state.doctor_name = action.payload;
    },
    setPatientName: (state, action) => {
      state.patient_name = action.payload;
    },
    setPatientPhone: (state, action) => {
      state.patient_phone = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setStartTime: (state, action) => {
      state.start_time = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
  },
});

export const {
  setDoctorName,
  setPatientName,
  setPatientPhone,
  setDate,
  setDuration,
  setStartTime,
  setReason,
} = formslice.actions;
export default formslice.reducer;
