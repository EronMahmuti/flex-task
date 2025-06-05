import { useEffect, useState } from 'react';
import { Form } from 'antd';
import type { ColorType, SelectValue, UseFormSelectProps } from '../types/types';

export const useFormSelect = ({ name }: UseFormSelectProps) => {
  const form = Form.useFormInstance();

  // Use Form.useWatch to listen for changes to the specific form field 'name'
  const watchedValue = Form.useWatch(name, form); // Pass 'form' instance here

  const [selectedValues, setSelectedValues] = useState<SelectValue[]>([]);

  const colorType: ColorType = name === 'status' ? 'status' : 'category';

  useEffect(() => {
    // watchedValue will be the current value of the field 'name'
    const currentValue = watchedValue || [];
    setSelectedValues(
      Array.isArray(currentValue)
        ? currentValue
        : [currentValue].filter(Boolean)
    );
  }, [watchedValue]);

  const handleChange = (values: SelectValue[]) => {
    setSelectedValues(values);
    form.setFieldValue(name, values);
  };

  const handleRemove = (value: SelectValue) => {
    const newValues = selectedValues.filter((v) => v !== value);
    setSelectedValues(newValues);
    form.setFieldValue(name, newValues);
    form.validateFields([name]);
  };

  return {
    form,
    selectedValues,
    colorType,
    handleChange,
    handleRemove,
  };
};