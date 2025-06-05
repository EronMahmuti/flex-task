import { render, screen } from '@testing-library/react';
import { ModalFooter } from '../components/shared/Modal/ModalFooter';

describe('ModalFooter Component', () => {
  test('renders Save Changes button', () => {
    render(<ModalFooter onOk={() => {}} />);
    const saveButton = screen.getByText('Save Changes');
    expect(saveButton).toBeInTheDocument();
  });

  test('renders Cancel Changes button when onCancel is provided', () => {
    render(<ModalFooter onOk={() => {}} onCancel={() => {}} />);
    const cancelButton = screen.getByText('Cancel Changes');
    expect(cancelButton).toBeInTheDocument();
  });

  test('does not render Cancel Changes button when onCancel is not provided', () => {
    render(<ModalFooter onOk={() => {}} />);
    expect(
      screen.queryByText('Cancel Changes')
    ).not.toBeInTheDocument();
  });
});
