const { normalizeUrl, getUrlsFromHTML, crawkPage } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strips protocol and trailing slash', () => {
    const input = 'https://GLOBO.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'globo.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl handles capitals and strip http', () => {
    const input = 'https://GLOBO.com/path';
    const actual = normalizeUrl(input);
    const expected = 'globo.com/path';
    expect(actual).toEqual(expected);
});

test('getUrlsFromHTML handles absolute and relative URLs', () => {
    const inputHtmlBody = `
        <html>
            <body>
                <a href="https://globo.com/path/">Globo.com</a>
                <a href="/path/">Relative Link</a>
            </body>
        </html>`;
    const inputBaseUrl = 'https://globo.com';
    const actual = getUrlsFromHTML(inputBaseUrl, inputHtmlBody);
    const expected = ['https://globo.com/path/', 'https://globo.com/path/'];
    expect(actual).toEqual(expected);
});


test('crawkPage fetches and logs content', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({ status: 200, text: () => 'Mocked Content' }));
    global.fetch = mockFetch;

    const currentURL = 'https://globo.com';
    await crawkPage(currentURL);

    expect(mockFetch).toHaveBeenCalledWith(currentURL);
    expect(console.log).toHaveBeenCalledWith('Mocked Content');
});

test('crawkPage handles fetch error', async () => {
    const mockFetch = jest.fn(() => Promise.reject(new Error('Fetch Error')));
    global.fetch = mockFetch;

    const currentURL = 'https://globo.com';
    await crawkPage(currentURL);

    expect(mockFetch).toHaveBeenCalledWith(currentURL);
    expect(console.log).toHaveBeenCalledWith('Error in Fetch Fetch Error, on page: https://globo.com');
});