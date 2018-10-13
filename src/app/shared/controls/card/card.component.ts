import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: CardItem;

  constructor() { }

  ngOnInit() {
  }

}

export class CardItem {
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  rating: string;
}
