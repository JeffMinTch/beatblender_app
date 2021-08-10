import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  @Input() answer: string;
  @Input() question: string;

  constructor() { }

  ngOnInit(): void {
  }

  
}
