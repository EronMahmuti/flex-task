import { Form, Input } from 'antd';
import type { FormTextInputProps } from '../../../lib/types/types';

function FormTextInput({
  name,
  label,
  placeholder = `Enter ${label.toLowerCase()}`,
  rules = [],
}: FormTextInputProps) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
}

export default FormTextInput;
