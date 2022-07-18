import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() posts!: IPost[];
  @Output() postLiked = new EventEmitter<IPost>();
  @Output() postCommented = new EventEmitter<{
    post: IPost,
    comment: string,
  }>;

  constructor() { }

  ngOnInit(): void {
  }

}
