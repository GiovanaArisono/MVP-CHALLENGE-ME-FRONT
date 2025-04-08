import { Component, OnInit } from '@angular/core';
import { BoredAPIService } from '../services/bored-api.service';
import { UserService } from '../services/user.service';
import { DesafiosService } from '../services/desafios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})
export class DesafiosComponent implements OnInit{

  tiposDeAtividade: string[] = [
    "education", "recreational", "social", "charity",
    "cooking", "relaxation", "busywork", "music", "diy"
  ];
  
  desafios: any[] = [];
  indiceAtual: number = 0;
  loading: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private boredService: BoredAPIService, private authService: UserService, private desafioService: DesafiosService, private router: Router) {}
  
  ngOnInit(): void {
    this.carregarProximoTipo();
    this.authService.authStatus$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
  
  carregarProximoTipo(): void {
    if (this.indiceAtual >= this.tiposDeAtividade.length) return;

    this.loading = true;
  
    const tipo = this.tiposDeAtividade[this.indiceAtual];
  
    this.boredService.getFilteredActivities(tipo).subscribe({
      next: (atividades: any[]) => {
        this.desafios.push(...atividades); // se for array
        this.indiceAtual++;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Erro ao carregar atividades');
      }
    });
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

  aceitarDesafio(desafio: any) {
    this.desafioService.saveDesafio(desafio).subscribe({
      next: () => {
        this.router.navigate(['/meus-desafios']);
      },
      error: () => alert('Erro ao aceitar desafio.'),
    });
  }
}
