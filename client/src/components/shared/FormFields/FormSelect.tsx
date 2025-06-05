import { CaretDownOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';
import { TagItem } from '../TagItem';
import { useFormSelect } from '../../../lib/hooks/useFormSelect';
import { getColorForValue } from '../../../lib/utils/utils';
import type { FormSelectProps } from '../../../lib/types/types';

export function FormSelect({
  name,
  label,
  options,
  rules = [],
  placeholder = `Select ${label.toLowerCase()}`,
  loading = false,
  disabled = false,
  mode,
  allowClear = false,
  clickableOnly = false,
}: FormSelectProps) {
  const { selectedValues, colorType, handleChange, handleRemove } =
    useFormSelect({ name });

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <div>
        <Select
          showSearch={!clickableOnly}
          filterOption={!clickableOnly}
          placeholder={placeholder}
          loading={loading}
          disabled={disabled}
          mode={mode}
          allowClear={allowClear}
          onChange={handleChange}
          value={selectedValues}
          tagRender={() => <span />}
          optionLabelProp="label"
          className="w-full"
          suffixIcon={
            <CaretDownOutlined
              style={{ fontSize: 18, color: 'black' }}
              onClick={() => true}
            />
          }
        >
          {options.map((opt) => (
            <Select.Option
              key={opt.value}
              value={opt.value}
              label={opt.label}
              style={
                selectedValues.includes(opt.value)
                  ? {
                      backgroundColor: getColorForValue(
                        opt.label,
                        colorType
                      ),
                      color: '#fff',
                    }
                  : {}
              }
            >
              {opt.label}
            </Select.Option>
          ))}
        </Select>
        {mode === 'multiple' && selectedValues.length > 0 && (
          <div className="form-select-tags">
            {selectedValues.map((value) => {
              const option = options.find(
                (opt) => opt.value === value
              );
              return (
                <TagItem
                  key={value}
                  value={value}
                  label={option?.label || String(value)}
                  color={getColorForValue(
                    option?.label || String(value),
                    colorType
                  )}
                  onRemove={handleRemove}
                />
              );
            })}
          </div>
        )}
      </div>
    </Form.Item>
  );
}
