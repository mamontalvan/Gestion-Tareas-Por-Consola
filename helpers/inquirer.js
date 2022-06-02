const inquirer = require('inquirer');
const colors = require('colors');


const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Qué desea hacer?',
    choices: [{
            value: '1',
            name: `${ colors.green('1.')} Crear una tarea`
        },
        {
            value: '2',
            name: `${ colors.green('2.')} Listar tareas`
        },
        {
            value: '3',
            name: `${ colors.green('3.')} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${ colors.green('4.')} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${ colors.green('5.')} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${ colors.green('6.')} Borrar una tarea`
        },
        {
            value: '0',
            name: `${ colors.green('0.')} Salir`
        },
    ]
}];

const inquirerMenu = async() => {
    console.clear();
    console.log(colors.green("============================"));
    console.log(colors.white(" Seleccione una opción "));
    console.log(colors.green("============================\n"));

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {

    await inquirer.prompt([{
        type: 'input',
        name: 'enter',
        message: `Presione ${ colors.red('enter')} para continuar`,
    }]);

}

const leerInput = async(etiquetaOpcionCrearTarea) => {
    const { descTareaUsuario } = await inquirer.prompt([{
        type: 'input',
        name: 'descTareaUsuario',
        message: etiquetaOpcionCrearTarea,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }]);
    return descTareaUsuario;
}

const listarTareasABorrar = async(listadoTareas = []) => {
    let indice = 0;
    //Armo el array de objetos
    const choices = listadoTareas.map((tarea) => {
        indice += 1;
        return {
            value: tarea.id,
            name: `${colors.green('Tarea ' + indice + ':')} ${tarea.descripcion}`
        }
    });

    //Agregamos la opción CANCELAR
    choices.unshift({
        value: '0',
        name: `${colors.green('Opción 0:')} Cancelar`
    });

    const listaTareas = [{
        type: 'list',
        pageSize: 20,
        name: 'idTarea',
        message: 'Seleccione Opción:',
        choices: choices
    }];

    const { idTarea } = await inquirer.prompt(listaTareas);

    return idTarea;
}

const confirmacion = async(preguntaSistema) => {

    const { confirmacion } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirmacion',
        message: preguntaSistema
    }]);

    return confirmacion;
}

const mostrarListadoCheckList = async(listadoTareas = []) => {
    let indice = 0;
    //Armo el array de objetos
    const choices = listadoTareas.map((tarea) => {
        indice += 1;
        return {
            value: tarea.id,
            name: `${colors.green('Tarea ' + indice + ':')} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    //Checkbox te devuelve un arreglo
    const listaTareas = [{
        type: 'checkbox',
        pageSize: 20,
        name: 'idsTareas',
        message: 'Seleccione:',
        choices: choices
    }];

    const { idsTareas } = await inquirer.prompt(listaTareas);

    return idsTareas;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarTareasABorrar,
    confirmacion,
    mostrarListadoCheckList
}