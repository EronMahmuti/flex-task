import BackButton from '../shared/BackButton';
import { useJobsiteSidebar } from '../../lib/hooks/useJobsiteSidebar';
import type { Jobsite, SidebarTypes } from '../../lib/types/types';
import TitleHeader from '../shared/TitleHeader';
import { CategorySection } from './CategorySection';
import { CreateCategoryItem } from '../CategoryItems/CreateCategoryItem';

function JobsiteSidebar({
  jobsite,
  isLoading,
  categories,
}: SidebarTypes) {
  const {
    selectedKey,
    onSelectKey,
    isModalVisible,
    showModal,
    handleCancel,
    handleOk,
    form,
    creatingCategoryItem,
    onFinish,
    onFinishFailed,
  } = useJobsiteSidebar();

  const formProps = {
    isOpen: isModalVisible,
    onOk: handleOk,
    onCancel: handleCancel,
    form,
    creatingCategoryItem,
    onFinish,
    onFinishFailed,
  };

  return (
    <div className="sidebar-container">
      <TitleHeader
        jobsite={jobsite as Jobsite}
        isLoading={isLoading}
      />
      <CategorySection
        isLoading={isLoading}
        categories={categories}
        selectedKey={selectedKey}
        onSelectKey={onSelectKey}
        showModal={showModal}
        jobsite={jobsite as Jobsite}
      />
      <CreateCategoryItem {...formProps} />
      <div className="sidebar-footer">
        <BackButton />
      </div>
    </div>
  );
}

export default JobsiteSidebar;
