import { EditCategoryItem } from '../CategoryItems/EditCategoryItem';
import { useCategoryItemForm } from '../../lib/hooks/useCategoryItemForm';
import type { CategoryItemsTableProps } from '../../lib/types/types';
import { categoryColumns } from '../../lib/utils/utils';
import BaseTable from '../shared/BaseTable';

function CategoryItemsTable({ data }: CategoryItemsTableProps) {
  const {
    form,
    isModalVisible,
    selectedItem,
    editing,
    editError,
    handleRowDoubleClick,
    handleModalOk,
    handleModalCancel,
  } = useCategoryItemForm();
  console.log(selectedItem);

  return (
    <>
      <BaseTable
        columns={categoryColumns}
        dataSource={data}
        onRowDoubleClick={handleRowDoubleClick}
      />

      {isModalVisible && (
        <EditCategoryItem
          isOpen={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          form={form}
          selectedItem={selectedItem}
          confirmLoading={editing}
          editError={editError}
        />
      )}
    </>
  );
}

export default CategoryItemsTable;
