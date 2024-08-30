import { isUrlAllowed, matchUrl } from "@/lib/extras";

describe('URL Pattern Matching', () => {
    it('matches a wild card pattern', () => {
        expect(matchUrl('/mentor/abc', 'mentor/**')).toBe(true);
    });

    it('matches a wild card pattern with URL parameters', () => {
        expect(matchUrl('/mentor/abc?foo=bar&redirect=true', 'mentor/**')).toBe(true);
    });

    it('matches a wild card pattern with many segments', () => {
        expect(matchUrl('/mentor/abc/def', 'mentor/**')).toBe(true);
    });

    it('matches a pattern with specific middle segments', () => {
        expect(matchUrl('/mentor/abc/xyz/fed/ked', 'mentor/**/xyz/**')).toBe(true);
    });

    it('fails incorrect tail segment', () => {
        expect(matchUrl('/mentor/abc/def', 'mentor/**/xyz')).toBe(false);
    });

    it('works with a set of black-listed patterns', () => {
        expect(['mentor/**', 'admin/**'].every(pattern => !matchUrl('/mentor/abc', pattern))).toBe(false);
    });

    it('works with a set of black-listed patterns', () => {
        expect(isUrlAllowed('/admin/foo?bar=baz&kelp=tarp', ['mentor/**', 'admin/**'])).toBe(false);
        expect(isUrlAllowed('/mentor/foo?bar=baz&kelp=tarp', ['mentor/**', 'admin/**'])).toBe(false);
        expect(isUrlAllowed('/mentor/tasks/foo?bar=baz&kelp=tarp', ['mentor/**', 'admin/**'])).toBe(false);
    })
});