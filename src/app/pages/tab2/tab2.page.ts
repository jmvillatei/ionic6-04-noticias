import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
  ];

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event) {
    console.log(event.detail.value);
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
    
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

  cargarNoticias(categoria: string, event?) {


    this.noticiasService.getTopHeadLinesCategoria(categoria)
      .subscribe(resp => {
        console.log(resp);
        if(resp.articles.length === 0){
          event.target.disabled = true;
        }
        this.noticias.push( ...resp.articles );
        if(event){
          event.target.complete();
        }
      });
  }

}
