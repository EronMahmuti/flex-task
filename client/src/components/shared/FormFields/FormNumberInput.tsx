import { Form, InputNumber } from 'antd';
import type { FormNumberInputProps } from '../../../lib/types/types';

function FormNumberInput({
  name,
  label,
  rules = [],
  placeholder = `Enter ${label.toLowerCase()}`,
  ...inputNumberProps
}: FormNumberInputProps) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <InputNumber placeholder={placeholder} {...inputNumberProps} />
    </Form.Item>
  );
}

export default FormNumberInput;
