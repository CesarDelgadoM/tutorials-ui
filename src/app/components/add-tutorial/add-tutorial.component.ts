import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = new Tutorial();

  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {

    this.tutorialService.createTutorial(this.tutorial).subscribe({
      next: response => {
        this.submitted = true;
      },
      error: err => console.error(err)
    });
  }

  createNewTutorial(): void {

    this.submitted = false;
    this.tutorial = new Tutorial();
  }

}
