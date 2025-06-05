import { render, screen } from '@testing-library/react';
import { Form } from 'antd';
import { CategoryItemForm } from '../components/CategoryItems/CategoryItemForm';

jest.mock('../components/shared/FormFields/FormSelect', () => ({
  FormSelect: (props: { label: string }) => (
    <div data-testid="form-select">{props.label}</div>
  ),
}));
jest.mock('../components/shared/FormFields/FormNumberInput', () => ({
  __esModule: true,
  default: (props: { label: string }) => (
    <div data-testid="form-number-input">{props.label}</div>
  ),
}));
jest.mock('../components/shared/FormFields/FormTextArea', () => ({
  __esModule: true,
  default: (props: { label: string }) => (
    <div data-testid="form-text-area">{props.label}</div>
  ),
}));

describe('CategoryItemForm', () => {
  it('renders all main form fields', () => {
    const [form] = Form.useForm();

    render(
      <CategoryItemForm
        form={form}
        onFinish={jest.fn()}
        onFinishFailed={jest.fn()}
        initialValues={undefined}
      />
    );

    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });
});
