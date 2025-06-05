import { Button, Spin } from 'antd';
import JobsiteEmptyState from '../shared/JobsiteEmptyState';
import JobsiteCategoryMenu from './JobsiteCategoryMenu';
import type { PropsSubset } from '../../lib/types/types';

export function CategorySection({
  isLoading,
  categories,
  selectedKey,
  onSelectKey,
  showModal,
  jobsite,
}: PropsSubset) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin />
      </div>
    );
  }

  if (categories.length === 0) {
    return <JobsiteEmptyState jobsite={jobsite} />;
  }

  return (
    <div className="category-section">
      <JobsiteCategoryMenu
        categories={categories}
        selectedKey={selectedKey}
        onSelect={onSelectKey}
      />
      {selectedKey && (
        <div className="button-container">
          <Button type="primary" onClick={showModal}>
            Create Category Item
          </Button>
        </div>
      )}
    </div>
  );
}
