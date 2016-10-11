import LEVEL from '../../src/constants/NotificationLevels';

describe('NotificationLevels', () => {
  it('has SUCCESS', () => {
    expect(LEVEL.SUCCESS).toBeDefined();
  });

  it('has ERROR', () => {
    expect(LEVEL.ERROR).toBeDefined();
  });

  it('has WARNING', () => {
    expect(LEVEL.WARNING).toBeDefined();
  });

  it('has INFO', () => {
    expect(LEVEL.INFO).toBeDefined();
  });
});

