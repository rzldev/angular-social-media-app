import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { formatISO } from 'date-fns';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  @Output() newPost = new EventEmitter<Omit<IPost, 'id'>>;
  @Input() user!: User;
  postMessage: string = '';

  constructor() { }

  get isPostEmpty(): boolean {
    return this.postMessage.trim().length === 0;
  }

  set postMessageValue(v: string) {
    this.postMessage = v;
  }

  ngOnInit(): void {
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    if (this.isPostEmpty) return;

    this.newPost.emit({
      content: this.postMessage,
      likedBy: [],
      commentedBy: [],
      createdAt: formatISO(new Date()),
      by: {
        id: this.user.uid,
        name: this.user.displayName || this.user.email || '',
        username: this.user.displayName ? `@${this.user.displayName}` : '',
        profileURL: this.user.photoURL || '',
      },
    });

    this.postMessage = '';
  }

}
