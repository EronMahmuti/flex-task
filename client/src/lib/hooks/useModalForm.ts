import { useState } from 'react';
import { Form } from 'antd';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { UseModalFormProps } from '../types/types';



export const useModalForm = <T extends object>({
  onSubmit,
  onCancel,
}: UseModalFormProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm<T>();

  const showModal = () => setIsOpen(true);

  const hideModal = () => {
    form.resetFields();
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  const handleOk = () => form.submit();

  const onFinish = async (values: T) => {
    try {
      await onSubmit(values);
      hideModal();
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<T>) => {
    console.warn('Form submission failed:', errorInfo);
    errorInfo.errorFields.forEach((field) => {
      console.log(
        `Field ${field.name.join('.')} failed with errors: ${field.errors.join(', ')}`
      );
    });
  };

  return {
    isOpen,
    form,
    showModal,
    hideModal,
    handleOk,
    onFinish,
    onFinishFailed,
  };
};
