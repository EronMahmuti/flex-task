import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateJobModal } from '../../lib/hooks/useCreateJobModal';
import { CreateModal } from './CreateModal';

export default function CreateJob() {
  const {
    isModalOpen,
    form,
    showModal,
    handleOk,
    handleCancel,
    onFinish,
    onFinishFailed,
  } = useCreateJobModal();

  return (
    <>
      <Space>
        <Button
          onClick={showModal}
          className="create-job-button"
          icon={<PlusOutlined />}
          iconPosition="end"
        >
          Create
        </Button>
      </Space>
      <CreateModal
        isOpen={isModalOpen}
        form={form}
        onOk={handleOk}
        onCancel={handleCancel}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </>
  );
}
