import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = new Tutorial();
  
  message: string = '';

  constructor(private tutorialService: TutorialService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      let id: string = this.route.snapshot.params["id"];
      console.log(id);
      this.getTutorial(id);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.getTutorialById(id).subscribe({
      next: response => {
        this.currentTutorial = response;
        console.log(response);
      },
      error: err => console.log(err)
    })
  }

  updateTutorial(): void {
    this.tutorialService.updateTutorial(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: response => {
        console.log(response);
        this.message = "tutorial actualizado con exito!";
      },
      error: err => console.log(err)
    });
  }

  updatePublishedTutorial(status: boolean): void {
    
    this.currentTutorial.published = status;
    this.updateTutorial();
  }

  deleteTutorial(): void {
    this.tutorialService.deleteTutorialById(this.currentTutorial.id).subscribe({
      next: response => {
        console.log(response);
        this.message = "Tutorial eliminado con exito!";
      },
      error: err => console.log(err)
    });
  }
}
