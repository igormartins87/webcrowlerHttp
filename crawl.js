const { Console } = require('console');
const{JSDOM} = require('jsdom');

async  function crawkPage(currentURL){
    console.log(` atividade de Crawling : ${currentURL} `)
}

try{
    const resp = await fetch(crawkPage)

    if(resp.status > 399){
        console.log(` Error in Fetch  : ${resp.status} on Page : ${currentURL} `)
        return
    }
    console.log(await resp.text())
}catch(err){
    console.log(` Error in Fetch ${err.message}, on page: ${currentURL}`)
}


function getUrlsFromHTML(htmlBody,baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements ){
        if(linkElement.href.slice(0,1) ==='/'){
            //relative
            urls.push(`${baseURL}${linkElement.href}`)
        }else{

            urls.push(linkElement.href)
        }
    }
    return urls
}



function normalizeUrl(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj .hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath

}

module.exports = {
    normalizeUrl,
    getUrlsFromHTML
}