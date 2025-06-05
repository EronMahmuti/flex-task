import { render, screen } from '@testing-library/react';
import { Form } from 'antd';
import FormTextArea from '../components/shared/FormFields/FormTextArea';

describe('FormTextArea', () => {
  it('renders label and textarea with placeholder', () => {
    render(
      <Form>
        <FormTextArea name="description" label="Description" />
      </Form>
    );

    expect(screen.getByText('Description')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Type description...')
    ).toBeInTheDocument();
  });
});
