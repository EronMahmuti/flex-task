import { Table } from 'antd';
import type { BaseTableProps } from '../../lib/types/types';

function BaseTable<T extends { id?: string | number }>({
  columns,
  dataSource,
  onRowDoubleClick,
  ...rest
}: BaseTableProps<T>) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowClassName={(_, index) =>
        index % 2 === 0 ? 'row-gray' : 'row-white'
      }
      bordered={false}
      className="base-table"
      components={{
        header: {
          cell: (props) => <th {...props}>{props.children}</th>,
        },
        body: {
          cell: (props) => <td {...props}>{props.children}</td>,
        },
      }}
      onRow={(record) => ({
        onDoubleClick: () => onRowDoubleClick?.(record),
      })}
      rowKey={(record) => record.id || JSON.stringify(record)}
      {...rest}
    />
  );
}

export default BaseTable;
