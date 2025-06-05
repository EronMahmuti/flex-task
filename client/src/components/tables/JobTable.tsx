import { useNavigate } from 'react-router-dom';
import type { TableProps } from 'antd';
import BaseTable from '../shared/BaseTable';
import { jobColumns } from '../../lib/utils/utils';
import type { JobData, TableData } from '../../lib/types/types';

function JobTable({ data }: TableData) {
  const navigate = useNavigate();

  const columns: TableProps<JobData>['columns'] = jobColumns?.map(
    (column) =>
      column.key === 'jobsiteName'
        ? {
            ...column,
            render: (text: string, record: JobData) => (
              <strong
                style={{ cursor: 'pointer', color: '#1890ff' }} // #change place in index.css
                onClick={() => navigate(`/inventory/${record.id}`)}
              >
                {text}
              </strong>
            ),
          }
        : column
  );

  return <BaseTable columns={columns} dataSource={data} />;
}

export default JobTable;
