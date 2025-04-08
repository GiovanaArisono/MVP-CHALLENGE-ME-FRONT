import { Component, OnInit } from '@angular/core';
import { BoredAPIService } from '../services/bored-api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  desafios: any = [];
  carregandoDesafios: boolean = false;

  constructor(private boredService: BoredAPIService) { }

  ngOnInit(): void {
    this.carregandoDesafios = true;
    let carregados = 0;

    for (let i = 0; i < 3; i++) {
      this.boredService.getRandomActivity().subscribe({
        next: (atividade: any) => {
          this.desafios.push(atividade);
          carregados++;

          if (carregados === 3) {
            this.carregandoDesafios = false;
          }
        },
        error: () => {
          carregados++;
          if (carregados === 3) {
            this.carregandoDesafios = false;
          }
          console.error('Erro ao carregar atividade aleatória');
        }
      });
    }
  }

  translateType(type: string): string {
    const translations: { [key: string]: string } = {
      education: 'Educação',
      recreational: 'Recreativo',
      social: 'Social',
      charity: 'Caridade',
      cooking: 'Culinária',
      relaxation: 'Relaxamento',
      busywork: 'Trabalho Ocupacional',
      music: 'Musical',
      diy: 'Faça você mesmo'
    };

    return translations[type] || type;
  }

  getImageForType(type: string): string {
    const images: { [key: string]: string } = {
      education: 'assets/images/education.jpeg',
      recreational: 'assets/images/recreational.jpg',
      social: 'assets/images/social.png',
      charity: 'assets/images/charity.jpg',
      cooking: 'assets/images/cooking.jpg',
      relaxation: 'assets/images/relaxation.png',
      busywork: 'assets/images/busywork.jpg',
      music: 'assets/images/music.jpg',
      diy: 'assets/images/recreational.jpg'
    };

    return images[type] || 'assets/images/default.jpg';
  }
}
