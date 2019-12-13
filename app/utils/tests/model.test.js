import Model from 'utils/model';
import { placeholders } from 'utils/generators';

describe('Model', () => {
  let User;
  beforeEach(() => {
    User = new Model({
      name: 'user',
      fields: {
        id: {
          type: 'number',
          primary: true,
          default: () => 123,
        },
        key: {
          type: 'number',
          unique: true,
          default: null,
        },
        name: {
          type: 'string',
          unique: true,
        },
        description: {
          type: '?string',
          default: 'a test user',
        },
        choices: {
          type: '[string',
          choices: ['normal', 'extra'],
        },
        data: {
          type: '{?[string',
        },
        url: {
          type: 'url',
        },
        date: {
          type: 'date',
        },
        datetime: {
          type: '?datetime',
        },
        email: {
          type: 'email',
          unique: true,
        },
      },
    });
  });
  it('throws error if initialized without name', () => {
    expect(() => new Model()).toThrow(); // no props
    expect(() => new Model({})).toThrow(); // props without name
  });
  it('can be initialized with name', () => {
    expect(new Model({ name: 'test' })).not.toBeNull();
  });
  it('can initialize but fail to generate if field type is invalid', () => {
    const BadType = new Model({
      name: 'bad',
      fields: {
        id: {
          type: 'whatsit',
        },
      },
    });
    expect(() => BadType.generate()).toThrow();
  });
  it('can generate instances', () => {
    const testA = User.generate();
    const testB = User.generate();
    expect(testA).toEqual({
      id: 123,
      name: 'test-user-name1',
      key: 1,
      description: 'a test user',
      choices: ['normal'],
      data: {
        test: ['test-user-data'],
      },
      url: placeholders.url,
      email: `${placeholders.email}1`,
      date: placeholders.date,
      datetime: placeholders.datetime,
    });
    expect(testB).toEqual({
      id: 124,
      name: 'test-user-name2',
      key: 2,
      description: 'a test user',
      choices: ['normal'],
      data: {
        test: ['test-user-data'],
      },
      url: placeholders.url,
      email: `${placeholders.email}2`,
      date: placeholders.date,
      datetime: placeholders.datetime,
    });
  });
  it('can generate instances with defaults and nulls', () => {
    const testA = User.generate(
      {
        email: 'foo@test.com',
        name: field => `${field.model.name} ${field.name}`,
      },
      true,
    );
    expect(testA).toEqual({
      id: 123,
      name: 'user name',
      key: 1,
      email: 'foo@test.com',
      description: 'a test user',
      choices: ['normal'],
      data: {
        test: null,
      },
      url: placeholders.url,
      date: placeholders.date,
      datetime: null,
    });
  });

  describe('a persisted model', () => {
    const id = {
      type: 'string',
      primary: true,
    };
    it('can be initialized with an id field', () => {
      expect(
        new Model({ persisted: true, name: 'test', fields: { id } }),
      ).not.toBeNull();
    });
    it('must have at least one id field', () => {
      expect(() => new Model({ name: 'test', persisted: true })).toThrow();
    });
    it('must have only one id field', () => {
      expect(
        () =>
          new Model({
            persisted: true,
            name: 'test',
            fields: { id, other: id },
          }),
      ).toThrow();
    });
  });
});
