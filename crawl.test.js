const {normalizeUrl} = require('./crawl.js');
const {test, expect} = require('@jest/globals');


test('normalizeUrl strip protocol', ()=>{
    const input = 'https://globo.com/path';
    const actual = normalizeUrl(input);
    const expected = 'globo.com/path';
    expect(actual).toEqual(expected)

})
test('normalizeUrl strip trailing slash', ()=>{
    const input = 'https://globo.com/path';
    const actual = normalizeUrl(input);
    const expected = 'globo.com/path';
    expect(actual).toEqual(expected)

})
test('normalizeUrl capitals', ()=>{
    const input = 'https://GLOBO.com/path';
    const actual = normalizeUrl(input);
    const expected = 'globo.com/path';
    expect(actual).toEqual(expected)

})
test('normalizeUrl strip http', ()=>{
    const input = 'https://globo.com/path';
    const actual = normalizeUrl(input);
    const expected = 'globo.com/path';
    expect(actual).toEqual(expected)

})



