import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formatDistance, parseISO } from 'date-fns';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() post!: IPost;
  @Output() postLiked = new EventEmitter<IPost>();
  @Output() postCommented = new EventEmitter<{
    post: IPost,
    comment: string,
  }>;

  constructor() { }

  get postCreatedAt(): string {
    if (!this.post) return '';

    return formatDistance(parseISO(this.post?.createdAt), new Date());
  }

  ngOnInit(): void {
  }

}
