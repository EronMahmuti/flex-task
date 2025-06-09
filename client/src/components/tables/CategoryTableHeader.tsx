import { Flex, Input } from 'antd';
import type { ChangeEvent } from 'react';
import { useJobsiteCategoryData } from '../../lib/hooks/useJobsiteCategoryData';

export interface TableHeader {
  searchText: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CategoryTableHeader({
  searchText,
  onSearchChange,
}: TableHeader) {
  const { selectedCategoryName } = useJobsiteCategoryData();
  return (
    <div className="category-table-header">
      <Flex
        className="category-table-header-content"
        justify="space-between"
        align="center"
      >
        <h2 className="category-title">{selectedCategoryName}</h2>
        <Input
          placeholder="Search categories..."
          value={searchText}
          onChange={onSearchChange}
          style={{ width: 300 }}
        />
      </Flex>
    </div>
  );
}

export default CategoryTableHeader;
