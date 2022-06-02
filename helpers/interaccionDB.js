const fs = require('fs');



const archivo = './database/data.json';

const guardarData = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerData = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const data = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const info = JSON.parse(data);

    return info;
}

module.exports = {
    guardarData,
    leerData
}