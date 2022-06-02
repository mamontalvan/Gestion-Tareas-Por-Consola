const Tarea = require("./tarea");
const colors = require('colors');
class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr() {
        const listado = [];
        //Obtengo un arreglo de las keys de un objeto y luego asigno las tareas en el array: listado[]
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoDeTareas() {
        //Listar tareas 
        this.listadoArr.forEach((tarea, indice) => {
            const i = indice + 1;
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn !== null) ? colors.green('Completada') : colors.red('Pendiente');
            console.log(`${ colors.green('Tarea - ' + i + ':')} ${descripcion} | ${estado}`);
        })
    }

    listarPendientesCompletadas(banderaCompletado = true) {
        let i = 0;

        this.listadoArr.forEach(tarea => {
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn !== null) ? colors.green('Completada') : colors.red('Pendiente');

            if (banderaCompletado && completadoEn !== null) {
                i += 1;
                console.log(`${ colors.green('Tarea - ' + i + ':')} ${descripcion} | ${estado}`);

            }
            if (completadoEn == null && !banderaCompletado) {
                i += 1;
                console.log(`${ colors.green('Tarea - ' + i + ':')} ${descripcion} | ${estado}`);

            }
        })
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cambiarEstadoTareas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            //Marco completadas las tareas que vienen en el array
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;

            }
        })
    }
}

module.exports = Tareas;