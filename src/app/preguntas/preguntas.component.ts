import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../service/preguntas.service';  // Ajusta la ruta según tu estructura de carpetas
import { Pregunta } from '../model/pregunta';  // Asegúrate de importar la interfaz Pregunta

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  preguntas: Pregunta[] = [];
  id_test = 2;  // Id del Test de Beck

  constructor(private preguntasService: PreguntasService) { }

  ngOnInit(): void {
    this.preguntasService.getPreguntasPorTest(this.id_test).subscribe(data => {
      this.preguntas = data;
    });
  }
}
