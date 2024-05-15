import assessmentTestSlice from './assessmentTest';
import authSlice from './auth';
import channelTalkSlice from './channelTalk';
import classroomSlice from './classroom';
import classroomExamSlice from './classroomExam';
import memberSlice from './members';
import modalSlice from './modal';
import pingSlice from './ping';
import toastSlice from './toast';

export const slices = {
  auth: authSlice,
  members: memberSlice,
  ping: pingSlice,
  toast: toastSlice,
  modal: modalSlice,
  classroom: classroomSlice,
  classroomExam: classroomExamSlice,
  channelTalk: channelTalkSlice,
  assessmentTest: assessmentTestSlice,
};

export default {
  reducers: {
    auth: slices.auth.reducer,
    members: slices.members.reducer,
    ping: slices.ping.reducer,
    toast: slices.toast.reducer,
    modal: slices.modal.reducer,
    classroom: slices.classroom.reducer,
    classroomExam: slices.classroomExam.reducer,
    channelTalk: slices.channelTalk.reducer,
    assessmentTest: slices.assessmentTest.reducer,
  },
  actions: {
    auth: { ...slices.auth.actions },
    members: { ...slices.members.actions },
    ping: { ...slices.ping.actions },
    toast: { ...slices.toast.actions },
    modal: { ...slices.modal.actions },
    classroom: { ...slices.classroom.actions },
    classroomExam: { ...slices.classroomExam.actions },
    channelTalk: { ...slices.channelTalk.actions },
    assessmentTest: { ...slices.assessmentTest.actions },
  },
};
