import { render, screen } from '@testing-library/react';
import { Form } from 'antd';
import FormNumberInput from '../components/shared/FormFields/FormNumberInput';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('FormNumberInput Component', () => {
  test('renders input with label and placeholder', () => {
    render(
      <Form>
        <FormNumberInput name="testInput" label="Test Label" />
      </Form>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Enter test label')
    ).toBeInTheDocument();
  });
});
