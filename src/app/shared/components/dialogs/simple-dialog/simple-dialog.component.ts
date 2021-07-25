import { Component, Inject, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('firstParagraph') firstParagraph: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) { }


  
  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    (this.firstParagraph.nativeElement as HTMLElement).innerHTML = this.data.firstParagraph;
    this.cdr.detectChanges();
  }
  
  onNoClick(): void {
  }
  
  routeFirst() {
    this.data.route = ['profile', 'my-licenses', 'basic-licenses'];
    this.dialogRef.close(this.data);
  }

  routeSecond() {
    this.data.route = ['sample-market'];
    this.dialogRef.close(this.data);
  }

  // routeThird() {
  //   this.data.route = []
  // }

}
