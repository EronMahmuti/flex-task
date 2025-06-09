import { EditCategoryItem } from '../CategoryItems/EditCategoryItem';
import { useCategoryItemForm } from '../../lib/hooks/useCategoryItemForm';
import type { CategoryItemsTableProps } from '../../lib/types/types';
import { categoryColumns } from '../../lib/utils/utils';
import BaseTable from '../shared/BaseTable';
import CategoryTableHeader from './CategoryTableHeader';
import { useState } from 'react';

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

  const [searchText, setSearchText] = useState<string>('');

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <CategoryTableHeader
        searchText={searchText}
        onSearchChange={handleSearch}
      />
      <BaseTable
        columns={categoryColumns}
        dataSource={filteredData}
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
