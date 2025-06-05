import type { JobData } from '../../lib/types/types';
import { JobStatusTag } from '../Status/JobStatusTag';

export const renderItemName = (text: string) => (
  <strong>{text}</strong>
);

export const renderQuantity = (quantity: number) => quantity;

export const renderDescription = (description: string | null) =>
  description || '-';

export const renderNotes = (notes: string | null) => notes || '-';

export const renderLeftEmpty = () => <span />;

export const renderRightEmpty = () => <span />;

export const renderJobName = (text: string) => (
  <strong style={{ cursor: 'pointer', color: '#1890ff' }}>
    {text}
  </strong>
);

export const renderJobStatus = (status: JobData['status']) => (
  <JobStatusTag status={status} />
);
