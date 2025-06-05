import { Button } from 'antd';
import type { JobData } from '../../lib/types/types';
import { statusStyles } from '../../lib/utils/utils';

export function JobStatusTag({
  status,
}: {
  status: JobData['status'];
}) {
  return (
    <Button className="job-status-tag" style={statusStyles[status]}>
      {status}
    </Button>
  );
}
