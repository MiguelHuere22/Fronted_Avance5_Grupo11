import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pregunta } from '../model/pregunta';
import { PreguntasService } from '../service/preguntas.service';
import { LocalStorageService } from '../service/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-estudiante',
  standalone: true,
  templateUrl: './menu-estudiante.component.html',
  styleUrls: ['./menu-estudiante.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MenuEstudianteComponent implements OnInit {
  contador: number = 0;
  id_persona: string = '';
  nombres: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  selectedOption: string = 'bienvenida';
  preguntas: Pregunta[] = [];
  id_test: number = 2;
  respuestas: { [key: number]: string } = {};

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private preguntasService: PreguntasService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.contador == 0) {
      this.loadUserData();
      this.contador = this.contador + 1;
    }
  }

  loadUserData(): void {
    console.log('Llamado a loadUserData');
    const personaDataString = this.localStorageService.getItem('personaData');
    if (personaDataString) {
      try {
        const personaData = JSON.parse(personaDataString);
        console.log('Datos de la persona cargados:', personaData);
        if (personaData && typeof personaData === 'object') {
          this.nombres = personaData.nombres || '';
          this.apellidoPaterno = personaData.apellido_paterno || '';
          this.apellidoMaterno = personaData.apellido_materno || '';
          this.id_persona = personaData.id_persona || '';
        } else {
          console.error('Parsed persona data is not an object:', personaData);
        }
      } catch (error) {
        console.error('Error parsing persona data from localStorage:', error);
      }
    } else {
      console.error('No persona data found in localStorage');
      this.router.navigate(['/login']);
    }
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  responderTest(id_test: number): void {
    this.id_test = id_test;
    this.respuestas = {}; // Limpia las respuestas anteriores
    if (id_test === 1) {
      this.selectedOption = 'realizar-test-amasc';
    } else if (id_test === 2) {
      this.selectedOption = 'realizar-test-beck';
    } else if (id_test === 3) {
      this.selectedOption = 'realizar-test-zung';
    }
  
    this.preguntasService.getPreguntasPorTest(this.id_test).subscribe(
      (response: any) => {
        if (response.status_code === 200) {
          this.preguntas = response.data;
        } else {
          console.error('Error fetching questions:', response.msg);
        }
      },
      (error) => {
        console.error('Error fetching questions from service:', error);
      }
    );
  }

  enviarRespuestas(event: Event): void {
    event.preventDefault();
    console.log('Función enviarRespuestas llamada');
    console.log('Respuestas:', this.respuestas);
  
    // Validar si todas las preguntas tienen respuesta
    const allAnswered = this.preguntas.every(pregunta => this.respuestas.hasOwnProperty(pregunta.id_pregunta));
    if (!allAnswered) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, responde todas las preguntas antes de enviar.'
      });
      return;
    }

    const respuestasArray = Object.keys(this.respuestas).map((key: any) => ({
      id_pregunta: Number(key),
      texto_respuesta: this.respuestas[Number(key)]
    }));
  
    const id_persona_num = Number(this.id_persona);
    console.log('ID Persona:', id_persona_num);
    console.log('ID Test:', this.id_test);
  
    const data = {
      id_persona: id_persona_num,
      id_test: this.id_test,
      respuestas: respuestasArray
    };
  
    console.log('Datos a enviar:', data);
  
    this.preguntasService.enviarRespuestas(id_persona_num, this.id_test, respuestasArray).subscribe(
      response => {
        if (response.status_code === 201) {
          this.mensajeExito = 'Respuestas enviadas correctamente';
          this.mensajeError = '';
          this.respuestas = {}; // Limpia las respuestas después de enviar
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Respuestas enviadas correctamente',
            confirmButtonText: 'OK'
          }).then(() => {
            this.selectedOption = 'realizar-test'; // Volver a la vista de realizar test
          });
        } else {
          this.mensajeError = 'Error: No se pudo enviar el test';
          this.mensajeExito = '';
          console.error('Error sending responses:', response.msg);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el test. Por favor, intenta de nuevo.'
          });
        }
      },
      error => {
        this.mensajeError = 'Error: No se pudo enviar el test';
        this.mensajeExito = '';
        console.error('Error sending responses:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo enviar el test. Por favor, intenta de nuevo.'
        });
      }
    );
  }

  registrarRespuesta(id_pregunta: number, texto_respuesta: string): void {
    this.respuestas[id_pregunta] = texto_respuesta;
    const respuestasArray = Object.keys(this.respuestas).map((key: any) => ({
      id_pregunta: Number(key),
      texto_respuesta: this.respuestas[Number(key)]
    }));

    const data = {
      id_persona: this.id_persona,
      id_test: this.id_test,
      respuestas: respuestasArray
    };
    console.log('Respuestas Array:', data);
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
}
