import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import * as L from 'leaflet';
import  'leaflet.heat';

@Component({
  selector: 'app-menu-especialista',
  standalone: true,
  templateUrl: './menu-especialista.component.html',
  styleUrls: ['./menu-especialista.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MenuEspecialistaComponent implements OnInit {
  contador: number = 0;
  id_persona: string = '';
  nombres: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  sexo: string = '';
  telefono: string = '';
  departamento: string = '';
  provincia: string = '';
  distrito: string = '';
  selectedOption: string = 'inicio';
  puntuaciones: any[] = [];
  selectedPuntuacion: any = null;
  preguntas: any[] = [];
  observaciones: string = '';
  nivelAnsiedad: string = '';
  solicitudCita: string = '';
  map: any;
  heatLayer: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private http: HttpClient
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
          this.sexo = personaData.sexo || '';
          this.telefono = personaData.telefono || '';
          this.departamento = personaData.departamento || '';
          this.provincia = personaData.provincia || '';
          this.distrito = personaData.distrito || '';
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
    if (option === 'consulta') {
      this.obtenerPuntuaciones();
    }
  }

  obtenerPuntuaciones(): void {
    this.http.get<any>('http://127.0.0.1:5000/puntuaciones/v1/todos').subscribe(
      response => {
        if (response.status_code === 200) {
          this.puntuaciones = response.data;
          this.initMap();
          this.addHeatMapLayer();
          console.log(this.puntuaciones);
        } else {
          console.error('Error fetching puntuaciones:', response.msg);
        }
      },
      error => {
        console.error('Error fetching puntuaciones:', error);
      }
    );
  }

  selectPuntuacion(puntuacion: any): void {
    this.selectedPuntuacion = puntuacion;
    this.limpiarCamposEvaluacion();
    this.preguntas = [];
    this.obtenerPreguntasRespuestas(puntuacion.id_persona, puntuacion.id_test);
  }

  limpiarCamposEvaluacion(): void {
    this.observaciones = '';
    this.nivelAnsiedad = '';
    this.solicitudCita = '';
  }

  evaluar(): void {
    Swal.fire({
      title: '¿Desea evaluar a este paciente?',
      showCancelButton: true,
      confirmButtonText: 'Evaluar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedOption = 'evaluar';
      }
    });
  }

  obtenerPreguntasRespuestas(idPersona: number, idTest: number): void {
    this.http.post<any>('http://127.0.0.1:5000/respuestas/v1/listar', { id_persona: idPersona, id_test: idTest }).subscribe(
      response => {
        if (response.status_code === 200) {
          this.preguntas = response.data.respuestas;
        } else {
          console.error('Error fetching preguntas:', response.msg);
        }
      },
      error => {
        console.error('Error fetching preguntas:', error);
      }
    );
  }

  guardarObservacion(): void {
    const idEspecialista = this.localStorageService.getItem('id_especialista');

    if (!idEspecialista) {
      Swal.fire('Error', 'No se encontró información del especialista', 'error');
      return;
    }

    const observacion = {
      id_puntuacion: this.selectedPuntuacion.id_puntuacion,
      id_especialista: parseInt(idEspecialista),
      observaciones: this.observaciones,
      nivel_ansiedad: this.nivelAnsiedad,
      solicitud_cita: this.solicitudCita
    };

    this.http.post<any>('http://127.0.0.1:5000/observaciones/v1/agregar', observacion).subscribe(
      response => {
        if (response.status_code === 201) {
          Swal.fire('Guardado', 'La observación se ha guardado exitosamente', 'success');
          this.selectedOption = 'consulta';
          this.obtenerPuntuaciones();
        } else {
          console.error('Error saving observacion:', response.msg);
        }
      },
      error => {
        console.error('Error saving observacion:', error);
      }
    );
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  initMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('heatmap').setView([-12.046374, -77.042793], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addHeatMapLayer(): void {
    if (this.heatLayer) {
      this.map.removeLayer(this.heatLayer);
    }
    const heatPoints = this.puntuaciones.map(puntuacion => {
      const lat = puntuacion.ubigeo.latitud;
      const lng = puntuacion.ubigeo.longitud;
      return [lat, lng, 100]; // 1 es la intensidad del punto de calor
    });
    this.heatLayer = (L as any).heatLayer(heatPoints, { radius: 25 }).addTo(this.map);
    
  }
  
}
