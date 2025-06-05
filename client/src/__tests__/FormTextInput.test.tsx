import { render, screen } from '@testing-library/react';
import { Form } from 'antd';
import FormTextInput from '../components/shared/FormFields/FormTextInput';

describe('FormTextInput', () => {
  it('renders label and input with placeholder', () => {
    render(
      <Form>
        <FormTextInput name="username" label="Username" />
      </Form>
    );

    expect(screen.getByText('Username')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Enter username')
    ).toBeInTheDocument();
  });
});
