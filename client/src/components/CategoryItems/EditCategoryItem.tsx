import { Spin } from 'antd';
import { ModalFooter } from '../shared/Modal/ModalFooter';
import type { EditCategoryItemModalProps } from '../../lib/types/types';
import { CategoryItemForm } from './CategoryItemForm';
import { GenericModal } from '../shared/Modal/GenericModal';

export function EditCategoryItem({
  isOpen,
  onOk,
  onCancel,
  form,
  selectedItem,
  confirmLoading,
  editError,
}: EditCategoryItemModalProps) {
  const handleFormFinishFailed = (errorInfo: unknown) => {
    console.error(
      'Form submission failed within EditCategoryItemModal:',
      errorInfo
    );
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      title="Edit Category Item"
      confirmLoading={confirmLoading}
      footer={<ModalFooter onOk={onOk} />}
    >
      <Spin spinning={confirmLoading}>
        {selectedItem ? (
          <CategoryItemForm
            form={form}
            onFinishFailed={handleFormFinishFailed}
            initialValues={{
              item: selectedItem.item,
              quantity: selectedItem.quantity,
              description: selectedItem.description || '',
              notes: selectedItem.notes || '',
            }}
            isEditing={true}
          />
        ) : (
          <p>No item selected for editing.</p>
        )}
        {editError && <p style={{ color: 'red' }}>{editError}</p>}
      </Spin>
    </GenericModal>
  );
}
