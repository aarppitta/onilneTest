import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
@Input() isCorrect:boolean = false;

  constructor(private el:ElementRef, private render:Renderer2) { }
// render is used for styling
//host listener will check for the click event and call the method

@HostListener('click') answer(){
  if(this.isCorrect){
    this.render.setStyle(this.el.nativeElement, 'backgroud','green');
    this.render.setStyle(this.el.nativeElement, 'color','green');
    this.render.setStyle(this.el.nativeElement, 'border','3px solid green');
  }else{
    this.render.setStyle(this.el.nativeElement, 'backgroud','red');
    this.render.setStyle(this.el.nativeElement, 'color','red');
    this.render.setStyle(this.el.nativeElement, 'border','3px solid red');
  }
}
}
