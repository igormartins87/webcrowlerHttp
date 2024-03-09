const { JSDOM } = require('jsdom');

const fetch = require('node-fetch');


function getUrlsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    
    linkElements.forEach((linkElement) => {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative
            urls.push(`${baseURL}${linkElement.href}`);
        } else {
            urls.push(linkElement.href);
        }
    });

    return urls;
}

function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}


async function crawkPage(currentURL) {
    console.log(`Crawling activity: ${currentURL}`);
    try {
        const resp = await fetch(currentURL);

        if (resp.status > 399) {
            console.log(`Error in Fetch: ${resp.status} on Page: ${currentURL}`);
            return;
        }
        console.log(await resp.text());
    } catch (err) {
        console.log(`Error in Fetch ${err.message}, on page: ${currentURL}`);
    }
}

module.exports = {
    normalizeUrl,
    getUrlsFromHTML,
    crawkPage,
};

