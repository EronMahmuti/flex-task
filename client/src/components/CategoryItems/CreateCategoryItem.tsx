import { ModalFooter } from '../shared/Modal/ModalFooter';
import type { CategoryItemModalProps } from '../../lib/types/types';
import { CategoryItemForm } from './CategoryItemForm';
import { GenericModal } from '../shared/Modal/GenericModal';

export function CreateCategoryItem({
  isOpen,
  onOk,
  onCancel,
  form,
  creatingCategoryItem,
  onFinish,
  onFinishFailed,
}: CategoryItemModalProps) {
  return (
    <GenericModal
      isOpen={isOpen}
      title="Create Category Item"
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={creatingCategoryItem}
      footer={<ModalFooter onCancel={onCancel} onOk={onOk} />}
    >
      <CategoryItemForm
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isEditing={false}
      />
    </GenericModal>
  );
}
