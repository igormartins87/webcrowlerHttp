const { crawkPage, getUrlsFromHTML, normalizeUrl } = require('./crawl.js');

function main() {
    if (process.argv.length !== 3) {
        console.log('Usage: node main.js <baseURL>');
        process.exit(1);
    }

    const baseURL = process.argv[2];
    console.log(`Start ${baseURL}`);

    crawkPage(baseURL);
}

main();
