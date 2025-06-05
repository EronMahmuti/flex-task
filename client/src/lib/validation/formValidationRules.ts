import type { InputRules } from '../types/types';


export const rules: InputRules = {
  quantity: [
    {
      required: true,
      message: 'Please enter the quantity',
    },
    {
      type: 'number',
      min: 1,
      message: 'Quantity must be at least 1',
    },
  ],
  item: [
    {
      required: true,
      message: 'Please enter the item name',
    },
    {
      type: 'string',
      min: 2,
      message: 'Item name must be at least 2 characters',
    },
  ],
  description: [
    {
      type: 'string',
      max: 255,
      message: 'Description can be up to 255 characters',
    },
  ],
  notes: [
    {
      type: 'string',
      max: 255,
      message: 'Notes can be up to 255 characters',
    },
  ],
  jobsite: [
    {
      required: true,
      message: 'Please select a jobsite',
    },
  ],
  category: [
    {
      required: true,
      message: 'Please select a category',
    },
  ],
  status: [
    {
      required: true,
      message: 'Please select a status',
    },
  ],
};
