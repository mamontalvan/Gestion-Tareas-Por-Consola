const colors = require('colors/safe');

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log(colors.green("============================"));
        console.log(colors.green(" Seleccione una opción "));
        console.log(colors.green("============================\n"));

        console.log(colors.green('1') + ` ` + `Crear una tarea`);
        console.log(colors.green('2') + ` ` + `Listar tareas`);
        console.log(colors.green('3') + ` ` + `Listar tareas completadas`);
        console.log(colors.green('4') + ` ` + `Listar tareas pendientes`);
        console.log(colors.green('5') + ` ` + `Completar tarea(s)`);
        console.log(colors.green('6') + ` ` + `Borrar una tarea`);
        console.log(colors.green('0') + ` ` + `Salir \n`);

        //Preparar la interfaz que se va a presentar al usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        //Utilizamos la interfaz
        readline.question('Seleccione una opción: ', (opt) => {
            //console.log(opt);
            readline.close();
            resolve(opt);
        });
    });
}

const pausa = () => {

    return new Promise((resolve) => {
        //Preparar la interfaz que se va a presentar al usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        //Utilizamos la interfaz
        readline.question(colors.red('\nENTER') + ' para continuar\n', (opt) => {
            //console.log(opt);
            readline.close();
            resolve();
        });
    });

}

module.exports = {
    mostrarMenu,
    pausa,
}