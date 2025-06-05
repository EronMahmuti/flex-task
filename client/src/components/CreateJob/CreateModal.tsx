import { ModalFooter } from '../shared/Modal/ModalFooter';
import type { CreateJobModalProps } from '../../lib/types/types';
import { CreateJobForm } from './CreateJobForm';
import { GenericModal } from '../shared/Modal/GenericModal';

export function CreateModal({
  isOpen,
  form,
  onOk,
  onCancel,
  onFinish,
  onFinishFailed,
}: CreateJobModalProps) {
  return (
    <GenericModal
      isOpen={isOpen}
      title="Create New Job"
      onOk={onOk}
      onCancel={onCancel}
      footer={<ModalFooter onCancel={onCancel} onOk={onOk} />}
    >
      <CreateJobForm
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </GenericModal>
  );
}
