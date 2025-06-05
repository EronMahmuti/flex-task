import { render, screen } from '@testing-library/react';
import { FormSelect } from '../components/shared/FormFields/FormSelect';
import { Form } from 'antd';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../components/shared/TagItem', () => ({
  TagItem: () => <div data-testid="tag-item" />,
}));

jest.mock('../lib/hooks/useFormSelect', () => ({
  useFormSelect: () => ({
    selectedValues: [],
    colorType: 'primary',
    handleChange: jest.fn(),
    handleRemove: jest.fn(),
  }),
}));

jest.mock('../lib/utils/utils', () => ({
  getColorForValue: () => '#000',
}));

describe('FormSelect', () => {
  it('renders label and options', () => {
    render(
      <MemoryRouter>
        <Form>
          <FormSelect
            name="test"
            label="Test Label"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </Form>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select test label')).toBeInTheDocument();
  });
});
