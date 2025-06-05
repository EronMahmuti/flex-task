import { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import FormTextArea from '../shared/FormFields/FormTextArea';
import FormNumberInput from '../shared/FormFields/FormNumberInput';
import { ITEM_OPTIONS } from '../../lib/utils/utils';
import type { CategoryItemFormProps } from '../../lib/types/types';
import { rules } from '../../lib/validation/formValidationRules';
import { FormSelect } from '../shared/FormFields/FormSelect';

export function CategoryItemForm({
  form,
  onFinish,
  onFinishFailed,
  initialValues,
}: CategoryItemFormProps) {
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col span={12}>
          <FormSelect
            name="item"
            label="Item"
            options={ITEM_OPTIONS}
            rules={rules.item}
          />
        </Col>
        <Col span={12}>
          <FormNumberInput
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
            min={1}
            rules={rules.quantity}
          />
        </Col>
      </Row>
      <FormTextArea
        rules={rules.description}
        name="description"
        label="Description"
      />
      <FormTextArea rules={rules.notes} name="notes" label="Notes" />
    </Form>
  );
}
