import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game';
  myTitle="ברוכים הבאים למשחק שולה מוקשים";
  choose="הנכם מוזמנים לבחור את כמות המוקשים במשחק";
  mines1 = 0 ;
  flagGame: boolean = false;
 newGame="משחק חדש";
  changeValue(){
    this.flagGame = true;
  }
  funNewGame(){
    this.flagGame = false;
    this.mines1 = 0;
  }
}
