import { isFunction } from 'lodash';

const containers = {
  '?': 'option',
  '[': 'array',
  '{': 'object',
};

export const placeholders = {
  number: 42,
  string: field => `test-${field.model.name}-${field.name}`,
  email: 'test@test.com',
  date: '2019-01-01',
  datetime: '2019-01-01T00:00:00Z',
  url: 'https://via.placeholder.com/100.png',
};

export class Generator {
  constructor(field) {
    this.field = field;
    this.counter = 1;
  }

  generate(subtype, nulls) {
    const { field } = this;
    const { counter } = this;
    let type = subtype;
    const container = type.charAt(0);
    let value;
    if (Reflect.has(field, 'default')) {
      value = field.default;
      if (isFunction(value)) {
        value = value(field);
      }
    } else {
      if (Reflect.has(containers, container)) {
        type = type.substring(1);
        if (container === '{') {
          return { test: this.generate(type, nulls) };
        }
        if (container === '[') {
          return [this.generate(type, nulls)];
        }
        if (container === '?' && nulls) {
          return null;
        }
        return this.generate(type, nulls);
      }
      if (field.choices) {
        [value] = field.choices;
      } else if (Reflect.has(placeholders, type)) {
        value = placeholders[type];
        if (isFunction(value)) {
          value = value(field);
        }
      } else {
        throw TypeError(`bad type ${type}`);
      }
    }
    if (field.unique || field.primary) {
      // use counter + concatenation for uniqueness
      // only support strings and numerics
      if (type === 'string' || typeof value === 'string') {
        value = `${value}${counter}`;
      } else if (type === 'number' && value) {
        value += counter - 1;
      } else {
        value = counter;
      }
    }
    return value;
  }

  get(nulls) {
    const value = this.generate(this.field.type, nulls);
    this.counter = this.counter + 1;
    return value;
  }
}
