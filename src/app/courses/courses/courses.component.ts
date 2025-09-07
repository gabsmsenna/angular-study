import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../model/course';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesService } from '../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { CategoryPipe } from '../../shared/pipes/category.pipe';


@Component({
  standalone: true,
  selector: 'app-courses',
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
    CategoryPipe
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['name', 'category'];

  constructor(private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.listCourses()
    .pipe(
      catchError(error => {
        this.onError('Error loading courses. Please try again later.');
        return of ([]);
      })
    );
  }

  onError(errorMessage: string) {
     this.dialog.open(ErrorDialogComponent, {
      data: 'An error occurred while loading courses.',
    });
  }

  ngOnInit(): void {

  }
}
