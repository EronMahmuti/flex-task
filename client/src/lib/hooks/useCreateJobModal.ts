import { useModalForm } from './useModalForm';
import { useAppDispatch } from './useReduxHooks';
import { createJobsite } from '../../redux/slices/jobSlice';
import type { JobFormValues, UseCreateJobModalReturn } from '../types/types';

export const useCreateJobModal = (): UseCreateJobModalReturn => {
  const dispatch = useAppDispatch();

  const {
    isOpen: isModalOpen,
    form,
    showModal,
    hideModal: handleCancel,
    handleOk,
    onFinish,
    onFinishFailed,
  } = useModalForm<JobFormValues>({
    onSubmit: async (values) => {
      console.log('Form values submitted:', values);
      await dispatch(
        createJobsite({
          jobsiteName: values.jobsite,
          categories: values.category,
          status: values.status,
        })
      ).unwrap();
      console.log('✅ Jobsite created successfully');
    }
  });

  return {
    isModalOpen,
    form,
    showModal,
    handleOk,
    handleCancel,
    onFinish,
    onFinishFailed,
  };
};
