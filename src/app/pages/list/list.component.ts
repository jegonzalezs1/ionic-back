// home.page.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskService } from 'src/app/services/task/task.service';
import { ITarea } from 'src/app/interface/ITarea';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  tareas: ITarea[] = [];
  mostrarPopup = false;
  
  constructor(
    @Inject(DOCUMENT) private document: any,
    private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }
  
  abrirPopup(): void {
    this.mostrarPopup = true; // Mostrar el popup
  }

  cerrarPopup(): void {
    this.mostrarPopup = false; // Ocultar el popup
  }
  
  cerrarSesion(): void {    
    // Esperar 5000 ms antes de cerrar la pestaña
    setTimeout(() => {
      this.document.location.href = "./home";
    }, 5000);
  }
  
  usuario = {
    nombre: 'José Antonio Pérez',
    email: 'josep89@gmail.com'
  }

  // Variable que controla el estado del desplegable
  perfilDesplegado = false;

  // Alterna la visibilidad del perfil al hacer clic en el avatar
  togglePerfil() {
    this.perfilDesplegado = !this.perfilDesplegado;
  }

  // Métodos de ejemplo para cada acción
  openSettings() {
    console.log('Abrir ajustes');
  }

  openPrivacy() {
    console.log('Abrir privacidad');
  }

  logout() {
    console.log('Cerrar sesión');
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        if (response) {
          this.tareas = response; // Asigna las tareas del servidor a la variable principal
        }
        // Obtener tareas desde el Local Storage y mostrarlas
        const tareasDesdeLS = this.obtenerTareasLS();

        // Combinar ambas listas (si es necesario)
        this.tareas = [...this.tareas, ...tareasDesdeLS];
      }
    });
  }
  
  obtenerTareasLS(): ITarea[] {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  agregarTarea() {
    this.document.location.href = "./task";
  }
}
