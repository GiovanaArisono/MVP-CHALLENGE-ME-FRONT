import { Component, OnInit } from '@angular/core';
import { DesafiosService } from '../services/desafios.service';

@Component({
  selector: 'app-meus-desafios',
  templateUrl: './meus-desafios.component.html',
  styleUrls: ['./meus-desafios.component.css']
})
export class MeusDesafiosComponent implements OnInit{
  desafios: any[] = [];
  loading = true;

  constructor(private desafioService: DesafiosService) {}

  ngOnInit(): void {
    this.desafioService.getMeusDesafios().subscribe({
      next: (res: any) => {
        this.desafios = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erro ao carregar os desafios.');
      },
    });
  }

  translateType(type: string): string {
    const tipos: any = {
      education: 'Educação',
      recreational: 'Recreativo',
      social: 'Social',
      charity: 'Caridade',
      cooking: 'Culinária',
      relaxation: 'Relaxamento',
      busywork: 'Tarefa simples',
      music: 'Música',
      diy: 'Faça você mesmo',
    };
    return tipos[type] || type;
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

  iniciarDesafio(desafio: any): void {
    this.desafioService.iniciarDesafio(desafio.id).subscribe({
      next: (res: any) => {
        desafio.status = res.status;
        desafio.started_at = res.started_at;
      },
      error: () => {
        alert('Erro ao iniciar o desafio.');
      },
    });
  }

  atualizarProgresso(desafio: any): void {
    if (desafio.progresso < 0 || desafio.progresso > 100) {
      alert('A porcentagem deve estar entre 0 e 100.');
      return;
    }
  
    this.desafioService.atualizarProgresso(desafio.id, desafio.progresso).subscribe({
      next: () => alert('Progresso atualizado com sucesso!'),
      error: () => alert('Erro ao atualizar progresso.'),
    });
  }

  excluirDesafio(desafio: any) {
    const confirmacao = confirm('Tem certeza que deseja excluir esse desafio?');
    if (!confirmacao) return;

    this.desafioService.excluirDesafio(desafio.id).subscribe({
      next: () => {
        this.desafios = this.desafios.filter(d => d.id !== desafio.id);
        alert('Desafio excluído com sucesso!');
      },
      error: () => alert('Erro ao excluir desafio.')
    });
  }
}
