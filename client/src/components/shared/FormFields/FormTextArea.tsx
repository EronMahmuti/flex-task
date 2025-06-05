import { Form, Input } from 'antd';
import type { FormTextAreaProps } from '../../../lib/types/types';

function FormTextArea({
  name,
  label,
  placeholder = `Type ${label.toLowerCase()}...`,
  rows = 3,
  rules = [],
}: FormTextAreaProps) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input.TextArea placeholder={placeholder} rows={rows} />
    </Form.Item>
  );
}

export default FormTextArea;
