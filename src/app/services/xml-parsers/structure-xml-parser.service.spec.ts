// Modified by Mariagrazia Staffieri, 2026-11-01: new spec for the notice about missing <app> elements.
import { EditionLevel } from '../../app.config';
import { isCriticalEditionLevelEnabled } from './structure-xml-parser.service';

describe('isCriticalEditionLevelEnabled', () => {
  const level = (id: EditionLevel['id'], enable: boolean): EditionLevel => ({ id, label: id, enable });

  it('should be true when the critical level is enabled', () => {
    expect(isCriticalEditionLevelEnabled([level('diplomatic', true), level('critical', true)])).toBeTrue();
  });

  it('should be false when the critical level is disabled or absent', () => {
    expect(isCriticalEditionLevelEnabled([level('diplomatic', true), level('critical', false)])).toBeFalse();
    expect(isCriticalEditionLevelEnabled([level('diplomatic', true), level('interpretative', true)])).toBeFalse();
  });

  it('should keep the previous behaviour when no levels are configured', () => {
    expect(isCriticalEditionLevelEnabled([])).toBeTrue();
    expect(isCriticalEditionLevelEnabled(undefined)).toBeTrue();
  });
});
