import { Component, Input, OnInit } from '@angular/core';
import { formatDistance, parseISO } from 'date-fns';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post!: IPost;

  constructor() { }

  ngOnInit(): void {
  }

  get postCreatedAt(): string {
    if (!this.post) return '';

    return formatDistance(parseISO(this.post?.createdAt), new Date());
  }

}
