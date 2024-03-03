const {normalizeUrl , getUrlsFromHTML} = require('./crawl.js');
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

test('getUrlsFromHTML  absolute', ()=>{
    const inputHtmlBody = `
<html>
    <body>
        <a href= " https://globo.com/path/">
        Globo.com
        </a>
    </body> 
</html>   
`
    const inputBaseUrl = 'https://globo.com/path/'
    const actual = getUrlsFromHTML(inputBaseUrl , inputHtmlBody );
    const expected = ["https://globo.com/path/"];
    expect(actual).toEqual(expected)
})


test('getUrlsFromHTML  relative', ()=>{
    const inputHtmlBody = `
<html>
    <body>
        <a href= " /path/">
        Globo.com
        </a>
    </body> 
</html>   
`
    const inputBaseUrl = 'https://globo.com'
    const actual = getUrlsFromHTML(inputBaseUrl , inputHtmlBody );
    const expected = ["https://globo.com/path/"];
    expect(actual).toEqual(expected)
})






