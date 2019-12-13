import { isFunction } from 'lodash';
import { Generator } from './generators';

export class Field {
  name = null;

  choices = null;

  min = null;

  max = null;

  type = null;

  model = null;

  constructor(props) {
    Object.assign(this, props);
  }
}

export const SCHEMA = Symbol('schema');
export default class Model {
  [SCHEMA] = {
    fields: {}, // field dict
    persisted: false, // persistence (enables API)
    name: null, // name of model
    plural: null, // plural name (for API)
    id: null, // id field
    data: {}, // all other properties
  };

  setupProperties(props) {
    // setup properties from schema
    Object.entries(this[SCHEMA]).forEach(([key, defaultValue]) => {
      this[key] = Reflect.has(props, key) ? props[key] : defaultValue;
    });
  }

  setupFields() {
    // setup fields and properties that depend on fields
    const { fields } = this;
    Object.entries(fields).forEach(([name, field]) => {
      fields[name] = new Field({ name, model: this, ...field });
      if (field.primary) {
        if (this.id) {
          throw TypeError('should have one primary field');
        }
        this.id = name;
      }
    });
    if (this.persisted && !this.id) {
      throw TypeError('should have a primary field');
    }
  }

  constructor(props) {
    this.setupProperties(props || {});
    if (!this.name) {
      throw TypeError('name is required');
    }
    this.setupFields();
  }

  getGenerator(field) {
    const { data } = this;
    if (!Reflect.has(data, 'generators')) {
      data.generators = {};
    }
    const key = field.name;
    if (!Reflect.has(data.generators, key)) {
      data.generators[key] = new Generator(field);
    }
    return data.generators[key];
  }

  generate(defaults, nulls) {
    const result = {};
    Object.entries(this.fields).forEach(([name, field]) => {
      if (defaults && Reflect.has(defaults, name)) {
        if (isFunction(defaults[name])) {
          result[name] = defaults[name](field);
        } else {
          result[name] = defaults[name];
        }
      } else {
        result[name] = this.getGenerator(field).get(nulls);
      }
    });
    return result;
  }
}
