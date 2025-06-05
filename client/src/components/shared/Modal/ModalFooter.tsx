import { Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { JobModalFooterProps } from '../../../lib/types/types';

export function ModalFooter({ onCancel, onOk }: JobModalFooterProps) {
  return (
    <>
      {onCancel && (
        <Button
          onClick={onCancel}
          className="modal-footer-cancel-button"
          icon={
            <span className="modal-footer-button-icon-wrapper">
              <CloseOutlined />
            </span>
          }
          iconPosition="end"
        >
          Cancel Changes
        </Button>
      )}
      <Button
        onClick={onOk}
        className="modal-footer-save-button"
        icon={
          <span className="modal-footer-button-icon-wrapper">
            <CheckOutlined />
          </span>
        }
        iconPosition="end"
      >
        Save Changes
      </Button>
    </>
  );
}
