import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getJsonQuestion(){
    return this.http.get("http://localhost:3000/questions")
    
  }
}
