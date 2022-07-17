import { Component } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Observable, take } from 'rxjs';
import { IPost } from './interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-social-media-app';

  user$: Observable<User | null>;

  posts: IPost[] = [];

  constructor(auth: Auth) {
    this.user$ = user(auth);
  }

  async getUser(): Promise<User | null> {
    const user = await this.user$.pipe(take(1)).toPromise();
    return user || null;
  }

  addNewPost(newPost: Omit<IPost, 'id'>) {

  }

  async onPostLike(post: IPost) {
    post.liked = !post.liked;
    
    if (post.liked) post.likedBy.push(Date.now().toString());
    else post.likedBy.length = 0;

    console.log(post);
  }

  async onPostComment(event: {post: IPost, comment: string}) {
    const {post, comment} = event;

    if (post.commentedBy.length === 0) post.commentedBy.push(Date.now().toString());
    else post.commentedBy.length = 0;
    
    console.log(post);
  }
}
