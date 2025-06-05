import { Modal } from 'antd';
import type { GenericModalProps } from '../../../lib/types/types';

export function GenericModal({
  isOpen,
  onOk,
  onCancel,
  title,
  children,
  footer,
  width = 868,
  confirmLoading = false,
  okText = 'OK',
  cancelText = 'Cancel',
  ...rest
}: GenericModalProps) {
  return (
    <Modal
      open={isOpen}
      title={title}
      width={width}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      footer={footer}
      maskClosable={false}
      destroyOnHidden
      className="generic-modal"
      {...rest}
    >
      {children}
    </Modal>
  );
}
