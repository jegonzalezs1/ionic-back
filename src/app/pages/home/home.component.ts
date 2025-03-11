import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ITarea } from 'src/app/interface/ITarea';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tareasActivas: ITarea[] = [];
  tareasTerminadas: ITarea[] = [];

  constructor(
    @Inject(DOCUMENT) private document: any,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  // Obtener todas las tareas desde el servidor y Local Storage
  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        const tareasDesdeJson = response;
        const tareasDesdeLS = this.obtenerTareasLS();
        const todasLasTareas = [...tareasDesdeJson, ...tareasDesdeLS];

        this.refrescarListas(todasLasTareas);
      },
      error: (err) => {
        console.error('Error al obtener tareas del servidor:', err);
      },
    });
  }

  marcarComoCompleta(tarea: ITarea): void {
    // Llamada al servicio para actualizar la tarea
    this.taskService.updateTask(tarea.id, { completado: true }).subscribe({
      next: () => {  
        // Actualizar el estado de la tarea en la interfaz
        tarea.completado = true;
  
        // Actualizar en el Local Storage
        this.actualizarTareaEnLS(tarea);

        // Refrescar el estado en todas
        this.getAllTasks();
      }
    });
  }
  
  // Obtener tareas desde el Local Storage
  obtenerTareasLS(): ITarea[] {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  // Actualizar una tarea en el Local Storage
  actualizarTareaEnLS(tarea: ITarea): void {
    const tareasDesdeLS = this.obtenerTareasLS();

    // Buscar y actualizar la tarea
    const tareasActualizadas = tareasDesdeLS.map((t) =>
      t.id === tarea.id ? { ...t, completado: tarea.completado } : t
    );

    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
    console.log('Tarea actualizada en el Local Storage:', tarea);
  }

  refrescarListas(tareas: ITarea[]) {
    // Dividir tareas en activas y completadas
    this.tareasActivas = tareas.filter((t) => !t.completado);
    this.tareasTerminadas = tareas.filter((t) => t.completado);
  }

  // Método para navegar a la pantalla de creación o edición de tarea
  agregarTarea() {
    this.document.location.href = './list';
  }
}
