import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	nuevoTitulo: string = '';
	nuevaDuracion: number = null;
	tareasSeleccionadas: Set<number> = new Set();
	columnaOrdenar: string = '';
	ordenAscendente: boolean = true;
	tareasDestacadas: Set<number> = new Set();

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	async agregarTarea() {
		if (this.nuevoTitulo && this.nuevaDuracion) {
		  const nuevaTarea = new Tarea(this.tareas.length + 1, this.nuevoTitulo, this.nuevaDuracion);
		  this.tareas.push(nuevaTarea);
		  this.nuevoTitulo = '';
		  this.nuevaDuracion = null;
		} else {
		  alert('Por favor complete ambos campos.');
		}
	  }
	
	async seleccionarTarea(id: number) {
		if (this.tareasSeleccionadas.has(id)) {
			this.tareasSeleccionadas.delete(id);
		} else {
			this.tareasSeleccionadas.add(id);
		}
	}

	async eliminarTareas() {
		this.tareas = this.tareas.filter(tarea => {
			const tarearestantes = !this.tareasSeleccionadas.has(tarea.id);
			return tarearestantes;
		});
		this.tareasSeleccionadas.clear();
		console.log(this.tareas)
	}

	async ordenarTabla(columna: string) {
		if (this.columnaOrdenar === columna) {
			this.ordenAscendente = !this.ordenAscendente;
		} else {
			this.columnaOrdenar = columna;
			this.ordenAscendente = true;
		}
	
		this.tareas.sort((tarea1, tarea2) => {
			const valor1 = tarea1[columna];
			const valor2 = tarea2[columna]; 
	
			if (this.ordenAscendente) {
				if (valor1 > valor2) {
					return 1;
				} else if (valor1 < valor2) {
					return -1;
				} else {
					return 0;
				}
			} else {
				if (valor1 < valor2) {
					return 1;
				} else if (valor1 > valor2) {
					return -1;
				} else {
					return 0;
				}
			}
		});
	}

	async marcarComoDestacadas() {
		this.tareasSeleccionadas.forEach(id => {
			this.tareasDestacadas.add(id);
		});
	}
}
