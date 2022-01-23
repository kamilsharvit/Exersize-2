import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../button';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() mines = 0;
  s = 10;
  t = 10;
  arrayBtn:Button[] = [];
  winner="winner!!!";
  flagEnd = false;
  flagWinner = false;
  constructor() { }

  ngOnInit(): void {
    this.buildGame()
  }
  buildGame() {
    for(let i=0;i < this.s * this.t;i++){
      const myButton:Button={
        isMine:false,
        countMine:0,
        index:i,
        isFlag:false,
        showNum:false
      }
      this.arrayBtn.push(myButton);
    }
    for(let i=0; i<this.mines;i++){
      const numBtn=Math.floor(Math.random() * this.s * this.t);
      if(this.arrayBtn[numBtn].isMine){
        i--;
      }
      else{
        this.arrayBtn[numBtn].isMine=true;
        this.checkAraound(numBtn);
      }
    }
  }
  checkAraound(numBtn: number) {
   this.checkLeftAndRight(numBtn);
   if(numBtn > this.t){
     this.arrayBtn[numBtn - this.t].countMine++;
     this.checkLeftAndRight(numBtn - this.t);
   }
   if(numBtn + 1 < (this.t * this.s) - this.t){
     this.arrayBtn[numBtn + this.t].countMine++;
     this.checkLeftAndRight(numBtn + this.t)
   }
  }
  checkLeftAndRight(num:number){
    
    if(num % this.t){
      this.arrayBtn[num-1].countMine++;
    }
    if((num+1) % this.t ){
      this.arrayBtn[num+1].countMine++;
    }
  }
  getStyles(){
    return {
      display: 'grid',
      'grid-template-columns': `repeat(${this.t}, 1fr)`,
      'justify-items': 'center',
    };
  }
 
  funAddFlag($event:Event,index:number){
    $event.preventDefault();
    const bool=this.arrayBtn[index].isFlag;
     this.arrayBtn[index].isFlag = !bool;
     if(bool){
       this.mines++
     }
     else{
       this.mines--
     }
     if(this.mines===0){
      this.flagWinner = this.checkEndGame();
     }
    
 }
  checkEndGame():boolean {

    let a=true;
    this.arrayBtn.forEach(item=>{
      if(!item.isMine && item.isFlag)
           a=false
    })
    return a;
  }
  open(index:number){
  
    if(this.arrayBtn[index].isMine){
      this.flagEnd = true;
    }
    else{
      if(this.arrayBtn[index].countMine===0){        
          this.openAround(index);          
      }
      this.arrayBtn[index].showNum = true;
      
    }
  }
  openAround(numBtn: number) {
    console.log(numBtn);
    
    if(!this.arrayBtn[numBtn].showNum){

    this.arrayBtn[numBtn].showNum = true;
    if(this.arrayBtn[numBtn].countMine === 0){
      this.openLeft(numBtn);
    this.openRight(numBtn);
    this.openUP(numBtn);
    this.openDown(numBtn);
    }
    
  }}
  openDown(numBtn: number) {
         if(numBtn + 1 < (this.t * this.s) - this.t){
            this.openAround(numBtn+this.t)
            }
         }
  openUP(numBtn: number) {
    if(numBtn > this.t){
      this.openAround(numBtn-this.t);
    }
  }
  openRight(numBtn: number) {
    if((numBtn+1) % this.t ){
     this.openAround(numBtn+1)
    }
  }
  openLeft(numBtn: number) {
    if(numBtn % this.t){
        this.openAround(numBtn-1);
      }
    }
  
  }
  

