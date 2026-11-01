// Modified by Mariagrazia Staffieri, 2026-11-01: new spec for the support of TEI lb/@break in LBParser.
import { Lb, XMLElement } from '../../models/evt-models';
import { LBParser } from './basic-parsers';
import { createParser } from './parser-models';

function lbFrom(xmlSource: string): XMLElement {
  const doc = new DOMParser().parseFromString(xmlSource, 'text/xml');

  return doc.querySelector('lb') as XMLElement;
}

describe('LBParser', () => {
  const parser = createParser(LBParser, () => undefined);

  it('should read @break="no" (TEI att.breaking)', () => {
    const lb = parser.parse(lbFrom('<w xmlns="http://www.tei-c.org/ns/1.0">pala<lb n="2" break="no"/>bra</w>')) as Lb;
    expect(lb.break).toBe('no');
    expect(lb.n).toBe('2');
  });

  it('should leave break undefined when the attribute is absent', () => {
    const lb = parser.parse(lbFrom('<p xmlns="http://www.tei-c.org/ns/1.0">uno<lb n="2"/>due</p>')) as Lb;
    expect(lb.break).toBeUndefined();
  });
});
