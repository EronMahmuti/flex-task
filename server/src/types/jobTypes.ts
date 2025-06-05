
export interface Job {
  id: string;
  jobsiteName: string;
  status: 'on hold' | 'on road' | 'completed';
  categories: string | string[];
  createdAt: Date;
}

export interface JobInput {
  jobsiteName: string;
  status: 'on hold' | 'on road' | 'completed';
  categories: string | string[];
}

export interface CategoryItemInput {
  categoryId: string;
  item: string;
  quantity: number;
  description?: string;
  notes?: string;
}

export interface CategoryItem {
  id: string;
  categoryId: string;
  item: string;
  quantity: number;
  description?: string;
  notes?: string;
  createdAt: Date;
}