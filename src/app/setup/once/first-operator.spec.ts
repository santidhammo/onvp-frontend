import { FirstOperator } from './first-operator';

describe('FirstOperator', () => {
  it('should create an instance', () => {
    expect(new FirstOperator('John', 'Doe', 'john@doe.void')).toBeTruthy();
  });
});
