import { Layout, Spin } from 'antd';
import JobsiteSidebar from '../components/Sidebar/JobsiteSidebar';
import CategoryItemsTable from '../components/tables/CategoryItemsTable';
import type { Jobsite } from '../lib/types/types';
import { useJobsiteCategoryData } from '../lib/hooks/useJobsiteCategoryData';

const { Sider, Content } = Layout;

function JobInventory() {
  const {
    categoryItems,
    fetchCategoryItemsError,
    fetchingCategoryItems,
    jobsite,
    jobsiteCategories,
    loading,
    selectedCategoryId,
    selectedCategoryName,
  } = useJobsiteCategoryData();

  const renderContent = () => {
    if (fetchingCategoryItems) {
      return (
        <div className="spinner-container">
          <Spin />
        </div>
      );
    }

    if (fetchCategoryItemsError) {
      return (
        <div className="error-message">{fetchCategoryItemsError}</div>
      );
    }

    if (selectedCategoryId && categoryItems.length > 0) {
      return (
        <div className="category-content">
          <h2 className="category-title">{selectedCategoryName}</h2>
          <CategoryItemsTable
            data={categoryItems}
            categoryId={selectedCategoryId}
          />
        </div>
      );
    }

    return (
      <div className="empty-state">
        {selectedCategoryId
          ? 'No items found for this category.'
          : 'Please select a category.'}
      </div>
    );
  };

  return (
    <Layout className="job-inventory-layout">
      <Sider className="job-inventory-sider">
        <JobsiteSidebar
          jobsite={jobsite as Jobsite}
          isLoading={loading}
          categories={jobsiteCategories}
        />
      </Sider>

      <Content className="job-inventory-content">
        {renderContent()}
      </Content>
    </Layout>
  );
}

export default JobInventory;
