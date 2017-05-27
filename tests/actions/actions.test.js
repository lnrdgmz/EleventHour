import { changeUser } from '../../src/actions/actions';

test('Returns False if not Logged In', () => {
  expect(changeUser().payload).toBe(undefined);
});