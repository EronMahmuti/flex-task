import { render, screen } from '@testing-library/react';
import { CreateJobForm } from '../components/CreateJob/CreateJobForm';
import {
  useAppDispatch,
  useAppSelector,
} from '../lib/hooks/useReduxHooks';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../redux/slices/categorySlice';

jest.mock('../lib/hooks/useReduxHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../api/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('CreateJobForm Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectCategories) return [];
      if (selector === selectCategoriesLoading) return false;
      return undefined;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with Jobsite Name, Category, and Status fields', () => {
    render(
      <CreateJobForm onFinish={() => {}} onFinishFailed={() => {}} />
    );

    expect(screen.getByText('Jobsite Name')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});
