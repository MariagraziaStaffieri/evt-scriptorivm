import { isAllowedConfigUrl } from './app.config';

describe('isAllowedConfigUrl', () => {
    const page = 'https://viewer.example/evt/index.html';
    const bases = ['/evt-anteprima/'];

    it('accepts a configuration under an allowed base on the same origin', () => {
        expect(isAllowedConfigUrl('/evt-anteprima/p/1/config.yaml', bases, page)).toBe(true);
        expect(isAllowedConfigUrl('https://viewer.example/evt-anteprima/c.yaml', bases, page)).toBe(true);
    });

    it('rejects another origin whose path contains the allowed base', () => {
        expect(isAllowedConfigUrl('https://other.example/evt-anteprima/c.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('//other.example/evt-anteprima/c.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('https://viewer.example.other.example/evt-anteprima/c.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('https://other.example/x?/evt-anteprima/', bases, page)).toBe(false);
    });

    it('rejects paths that leave the allowed base, and non-http schemes', () => {
        expect(isAllowedConfigUrl('/evt-anteprima/../secret.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('/evt-anteprima/%2e%2e/secret.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('/other/evt-anteprima/c.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('/evt-anteprimax/c.yaml', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('data:text/plain,/evt-anteprima/', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('javascript:/evt-anteprima/', bases, page)).toBe(false);
        expect(isAllowedConfigUrl('https://u:p@viewer.example/evt-anteprima/c.yaml', bases, page)).toBe(false);
    });

    it('keeps absolute allowed bases working', () => {
        const remote = ['https://editions.example/configs/'];
        expect(isAllowedConfigUrl('https://editions.example/configs/a.yaml', remote, page)).toBe(true);
        expect(isAllowedConfigUrl('https://evil.example/configs/a.yaml', remote, page)).toBe(false);
    });
});
