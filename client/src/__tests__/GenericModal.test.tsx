import { render, screen } from '@testing-library/react';
import { GenericModal } from '../components/shared/Modal/GenericModal';

describe('GenericModal Component', () => {
  test('renders modal with title and children when open', () => {
    render(
      <GenericModal
        isOpen={true}
        title="Test Modal"
        onOk={() => {}}
        onCancel={() => {}}
      >
        Modal Content
      </GenericModal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <GenericModal
        isOpen={false}
        title="Test Modal"
        onOk={() => {}}
        onCancel={() => {}}
      >
        Modal Content
      </GenericModal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Modal Content')
    ).not.toBeInTheDocument();
  });
});
