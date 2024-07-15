import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public questionList:any = [];
  public currentQuestion:number = 0;
  public points:number = 0;
  counter = 60;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  interval$:any;
  progress:string='0';
  isQuizCompleted:boolean = false;
  public name :string = '';

  constructor(private qs: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllData();
    this.startCounter();
  }

  getAllData(){
    this.qs.getJsonQuestion().subscribe(res => {
      this.questionList = res;
      console.log(this.questionList)
    })
  }

  previousQuestion(){
    this.currentQuestion--;
  }
  nextQuestion(){
    this.currentQuestion++;    
  }

  answer(currentQ:number, option:any){

    if(currentQ == this.questionList.length){
      this.isQuizCompleted = true;
      }

    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgress();
      }, 1000);
      
    }else{
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.getProgress();
      
      }, 1000);
      this.points-=10;
    }
  }

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.questionList.length;
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllData();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress = "0"
  }

  getProgress(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
