import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {


  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){
    query = apiURL + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines(){
    this.headlinesPage++;
    // return this.http.get<RespuestaTopHeadLines>('http://newsapi.org/v2/top-headlines?country=us&apiKey=59290e6f6e2c45f197f38ac846c2b500')
    return this.ejecutarQuery<RespuestaTopHeadLines>('/top-headlines?country=us&page='+this.headlinesPage)
  }

  getTopHeadLinesCategoria(categoria: string){

    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    } else {
      this.categoriaPage=1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>('/top-headlines?country=us&category='+categoria+'&page='+this.categoriaPage);

  }
}
