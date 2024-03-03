function main (){
    if(process.argv.length < 3){
        console.log('Não tem site');
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log('Muitos comandos para a linha do argumento');
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`Start ${baseURL}`);

        for(const arg of process.argv){
            console.log(arg);
        }
}

main();