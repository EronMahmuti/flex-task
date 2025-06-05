import React, { useEffect, useMemo } from 'react';
import { Form, Row, Col } from 'antd';
import FormTextInput from '../shared/FormFields/FormTextInput';
import {
  useAppDispatch,
  useAppSelector,
} from '../../lib/hooks/useReduxHooks';
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
} from '../../redux/slices/categorySlice';
import { STATUS_OPTIONS } from '../../lib/utils/utils';
import type { CreateJobFormProps } from '../../lib/types/types';
import { rules } from '../../lib/validation/formValidationRules';
import { FormSelect } from '../shared/FormFields/FormSelect';

export function CreateJobForm({
  form,
  onFinish,
  onFinishFailed,
}: CreateJobFormProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const options = useMemo(
    () =>
      categories.map((cat) => ({
        label: cat.name,
        value: cat.id,
      })),
    [categories]
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <FormTextInput
        name="jobsite"
        label="Jobsite Name"
        placeholder="e.g., New York, NY"
        rules={rules.jobsite}
      />
      <Row gutter={16}>
        <Col span={15}>
          <FormSelect
            name="category"
            label="Category"
            options={options}
            rules={rules.category}
            mode="multiple"
            loading={loading}
            disabled={loading}
            allowClear
            clickableOnly
          />
        </Col>
        <Col span={9}>
          <FormSelect
            name="status"
            label="Status"
            options={STATUS_OPTIONS}
            rules={rules.status}
            clickableOnly
          />
        </Col>
      </Row>
    </Form>
  );
}
