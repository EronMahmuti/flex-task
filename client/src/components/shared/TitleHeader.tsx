import { Spin } from 'antd';
import type { HeaderProps } from '../../lib/types/types';

function TitleHeader({ jobsite, isLoading }: HeaderProps) {
  return (
    <div className="title-header-container">
      {isLoading ? (
        <Spin size="small" />
      ) : (
        jobsite?.jobsiteName || 'Jobsite Not Found'
      )}
    </div>
  );
}

export default TitleHeader;
