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
}
