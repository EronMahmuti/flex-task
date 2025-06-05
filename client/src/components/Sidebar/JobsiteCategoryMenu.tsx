import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { getEnhancedItems } from '../../lib/utils/utils';
import type { JobsiteCategoryMenuProps } from '../../lib/types/types';

function JobsiteCategoryMenu({
  categories,
  selectedKey,
  onSelect,
}: JobsiteCategoryMenuProps) {
  const handleSelect: MenuProps['onSelect'] = (info) => {
    onSelect(info.key);
  };

  const enhancedItems = getEnhancedItems(categories, selectedKey);

  return (
    <Menu
      className="jobsite-category-menu"
      mode="vertical"
      items={enhancedItems}
      selectedKeys={[selectedKey]}
      onSelect={handleSelect}
    />
  );
}

export default JobsiteCategoryMenu;
