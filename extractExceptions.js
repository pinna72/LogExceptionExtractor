const fs = require('fs');

const extractExceptions = () => {

    function readFile(nomeFile, callback) {
    fs.readFile(nomeFile, 'utf8', (errore, contenuto) => {
        if (errore) {
        callback(errore, null);
        return;
        }
        callback(null, contenuto);
    });
    }

    readFile('D:\\MyProjects\\NodeServer-RegEx\\logs\\migusca.log', (errore, logFileContent) => {
        if (errore) {
            console.error('Si è verificato un errore durante la lettura del file:', errore);
            return;
        }
        
        // Crea un'espressione regolare per trovare le eccezioni
        const regex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}[,|.]\d{3})[\s\S]*?(?=(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}[,|.]\d{3})|$)/g;

        // Trova tutte le corrispondenze delle eccezioni
        const exceptions = [];
        let match;
        while ((match = regex.exec(logFileContent)) !== null) {
        exceptions.push({ idx : match.index, excep : match[0] });
        }
        console.log('exceptions: ', exceptions.length);
        
        try { 
            fs.writeFileSync('file.txt', JSON.stringify(exceptions)); 
            console.log("File has been saved."); 
        } catch (error) { 
            console.error(error); 
        }
    });
}

module.exports = { extractExceptions };


