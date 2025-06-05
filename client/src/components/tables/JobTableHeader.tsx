import { Flex, Input, Typography } from 'antd';
import CreateJob from '../CreateJob/CreateJob';
import type { TableHeader } from '../../lib/types/types';

function JobTableHeader({
  searchText,
  onSearchChange,
  totalJobs,
}: TableHeader) {
  return (
    <div className="job-table-header">
      <Typography.Title level={3} className="job-table-title">
        Job Listings
      </Typography.Title>

      <Flex
        className="job-table-header-content"
        justify="space-between"
        align="center"
      >
        <Typography.Text className="job-total-count">
          Total Jobs: {totalJobs}
        </Typography.Text>

        <Flex className="job-table-controls" gap={8}>
          <Input
            placeholder="Search a job"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="job-search-input"
            allowClear
          />
          <CreateJob />
        </Flex>
      </Flex>
    </div>
  );
}

export default JobTableHeader;
