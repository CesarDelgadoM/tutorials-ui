import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: Tutorial[] = [];
  title: string = "";
  currentIndex: number = -1;
  currentTutorial: Tutorial = new Tutorial();

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAllTutorials().subscribe({
      next: response => {
        this.tutorials = response;
        console.log(response)
      },
      error: err => console.log(err)
    })
  }

  searchByTitle(): void {

    this.currentIndex = -1;
    
    if (this.title != '') {

      this.tutorialService.findByTitle(this.title).subscribe({
        next: response => {
          this.tutorials = response;
          console.log(response)
        },
        error: err => console.log(err)
      });
    }
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    console.log(tutorial);
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAllTutorials().subscribe(
      response => console.log(response)
    );
  }

}
