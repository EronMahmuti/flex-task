import { Empty } from 'antd';
import type { HeaderProps } from '../../lib/types/types';

function JobsiteEmptyState({ jobsite }: HeaderProps) {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        jobsite
          ? 'No categories assigned to this jobsite.'
          : 'Jobsite data not available.'
      }
      style={{ padding: '20px' }}
    />
  );
}

export default JobsiteEmptyState;
