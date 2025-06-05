import { renderDescription, renderItemName, renderJobName, renderJobStatus, renderLeftEmpty, renderNotes, renderQuantity, renderRightEmpty } from "../../components/tables/TableRenderers";
import type { CategoryItem, CategoryMenu, JobData, Jobsite } from "../types/types";
import { type TableProps } from 'antd';


export const getJobsiteCategories = (
    jobsite: Jobsite,
    allCategories: Array<{ id: string; name: string }>
  ) => {
    if (!jobsite?.categories || !Array.isArray(jobsite.categories)) return [];
 
    return jobsite.categories.map((categoryId: string) => {
      const category = allCategories.find((c) => c.id === categoryId);
      return {
        key: categoryId,
        label: category?.name || 'Unknown Category',
        style: {
          background: '#f0f0f0',
          color: '#333',
          marginBottom: '5px',
          borderRadius: '4px',
        },
      };
    });
  }


  export const getColorForValue = (
    value: string | number,
    type: 'status' | 'category'
  ): string => {
    const statusColorMap: Record<string, string> = {
      completed: '#7AC14D',
      'on road': '#ECDE7C',
      'on hold': '#FE4C4A',
    };
 
    const categoryColorMap: Record<string, string> = {
      Scaffold: '#EFD652',
      'Sidewalk Shed': '#67AA3C',
      Shoring: '#9640BE',
    };
 
    const valStr = String(value).toLowerCase();
    const colorMap =
    type === 'status' ? statusColorMap : categoryColorMap;
   
    console.log(valStr)
    for (const key in colorMap) {
      if (valStr === key.toLowerCase()) {
        return colorMap[key];
      }
    }
 
    return '#ccc';
  };
 
 
 
  export const categoryColumns: TableProps<CategoryItem>['columns'] = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      render: renderItemName,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: renderQuantity,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: renderDescription,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: renderNotes,
    },
  ];

export const jobColumns: TableProps<JobData>['columns'] = [
  {
    title: '',
    key: 'leftEmpty',
    width: '30%',
    render: renderLeftEmpty,
  },
  {
    title: 'Job Name',
    dataIndex: 'jobsiteName',
    key: 'jobsiteName',
    render: renderJobName,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '12%',
    align: 'center' as const,
    render: renderJobStatus,
  },
  {
    title: '',
    key: 'rightEmpty',
    width: '30%',
    render: renderRightEmpty,
  },
];


export const labelClassMap: Record<string, string> = {
    Shoring: 'menu-item-shoring',
    'Sidewalk Shed': 'menu-item-shed',
    Scaffold: 'menu-item-scaff',
  };
 
  export const getEnhancedItems = (
    categories: CategoryMenu['categories'],
    selectedKey: string
  ) =>
    categories.map((item) => ({
      ...item,
      className: item.key === selectedKey && item.label ? labelClassMap[item.label] ?? '' : '',
    }));


    export const statusStyles: Record<JobData['status'], React.CSSProperties> = {
        completed: {
          backgroundColor: '#7AC14D',
          color: '#FFFFFF',
        },
        'on road': {
          backgroundColor: '#ECDE7C',
          color: '#FFFFFF',
        },
        'on hold': {
          backgroundColor: '#FE4C4A',
          color: '#FFFFFF',
        },
      };

      
      export const STATUS_OPTIONS = [
        { label: 'Completed', value: 'completed' },
        { label: 'On Road', value: 'on road' },
        { label: 'On Hold', value: 'on hold' },
      ];

      export const ITEM_OPTIONS = [
        { value: 'widget_a', label: 'Widget A' },
        { value: 'gadget_b', label: 'Gadget B' },
        { value: 'thingamajig_c', label: 'Thingamajig C' },
      ];