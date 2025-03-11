import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ITarea } from 'src/app/interface/ITarea';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tarea: ITarea = {
    id: 0,
    titulo: '',
    fecha: '',
    completado: false
  };

  constructor() {}

  ngOnInit(): void {}

  // Guardar una tarea en el Local Storage
  guardarTarea(): void {
    const tareasDesdeLS = this.obtenerTareasLS();
    if (this.tarea.id === 0) {
      // Nueva tarea: Generar ID único
      this.tarea.id = this.obtenerNuevoID(tareasDesdeLS);
    }

    // Agregar o actualizar tarea
    const tareasActualizadas = tareasDesdeLS.filter((t) => t.id !== this.tarea.id);
    tareasActualizadas.push(this.tarea);

    // Guardar en el Local Storage
    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
  }

  // Eliminar una tarea del Local Storage
  eliminarTarea(): void {
    const tareasDesdeLS = this.obtenerTareasLS();
    const tareasActualizadas = tareasDesdeLS.filter((t) => t.id !== this.tarea.id);

    // Guardar las tareas actualizadas en el Local Storage
    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
    this.tarea = { id: 0, titulo: '', fecha: '', completado: false }; // Reiniciar la tarea
  }

  // Obtener tareas desde el Local Storage
  obtenerTareasLS(): ITarea[] {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  // Generar un nuevo ID único
  obtenerNuevoID(tareas: ITarea[]): number {
    if (tareas.length === 0) {
      return 1; // Si no hay tareas, el primer ID será 1
    }

    const maxId = Math.max(...tareas.map((t) => t.id));
    return maxId + 1; // Incrementar el mayor ID en 1
  }
}
