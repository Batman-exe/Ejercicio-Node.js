const fs = require('fs');
const axios = require('axios')
const http = require('http');


async function getDataFromAnotherServer() {
    const proveedores = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');

    fs.writeFile('proveedores.json', JSON.stringify(proveedores.data), err => {
        if (err) {
            console.error(err)
        }
    })

    const clientes = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');

    fs.writeFile('clientes.json', JSON.stringify(clientes.data), err => {
        if (err) {
            console.error(err)
        }
    })
}

http.createServer(function (req, res){
    getDataFromAnotherServer();
    res.writeHead(200, { 'Content-Type' : 'text/html' });
    //console.log(req.url);
    if (req.url=='/api/proveedores'){
        let proveedores = fs.readFile('table_proovedores.html', 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
        });
        res.end(proveedores);
    }
    else if (req.url=='/api/clientes') {
        let clients = fs.readFile('table_clientes.html', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
        });
        res.end(clients);
    }
    else{
        res.end('Creo que funciona!!!');
    }
}).listen(8081)
