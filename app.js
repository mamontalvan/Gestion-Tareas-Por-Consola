const colors = require('colors/safe');
const { guardarData, leerData } = require('./helpers/interaccionDB');

const { inquirerMenu, pausa, leerInput, listarTareasABorrar, confirmacion, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');


//Todo el código que se ha implementado está dentro de esta función asíncrona
const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerData();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Esta función imprime el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear una nueva tarea
                const descTareaUsuario = await leerInput('Describe la Tarea:');

                tareas.crearTarea(descTareaUsuario);
                guardarData(tareas.listadoArr);
                break;
            case '2':
                //Listado de tareas
                console.log()
                tareas.listadoDeTareas();
                break;
            case '3':
                console.log();
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                console.log();
                tareas.listarPendientesCompletadas(false);
                console.log();
                break;
            case '5':
                const idTareasSeleccionadas = await mostrarListadoCheckList(tareas.listadoArr);

                tareas.cambiarEstadoTareas(idTareasSeleccionadas);
                break;
            case '6':
                console.log();
                const idTareaBorrar = await listarTareasABorrar(tareas.listadoArr);
                if (idTareaBorrar !== '0') {
                    const confirmado = await confirmacion('Estás seguro de eliminar la tarea seleccionada?');
                    if (confirmado) {
                        tareas.borrarTarea(idTareaBorrar);
                        console.log("Tarea Borrada Correctamente!!")
                    }
                }

                break;
            case '0':

                break;
        }



        console.log('\n');

        if (opt !== '0') {
            await pausa();
        }

    } while (opt !== '0');



}

main();