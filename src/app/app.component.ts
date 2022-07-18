import { Component } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { addDoc, collection, collectionChanges, CollectionReference, DocumentChange, getFirestore, orderBy, query } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { IPost } from './interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-social-media-app';

  posts: IPost[] = [];

  user$: Observable<User | null>;

  constructor(auth: Auth) {
    this.user$ = user(auth);
    this.getPosts();
  }

  async getUser(): Promise<User | null> {
    const user = await this.user$.pipe(take(1)).toPromise();
    return user || null;
  }

  async getPosts() {
    const user = await this.getUser();

    collectionChanges<IPost>(
      query<IPost>(
        collection(getFirestore(), 'posts') as CollectionReference<IPost>,
        orderBy('createdAt', 'desc')
      )
    ).subscribe(posts => {
      console.log(posts);
      posts.map(postSnapshot => this.onPostSnapshot(postSnapshot, user));
    })

  }

  onPostSnapshot(change: DocumentChange<IPost>, user: User | null) {
    const data = change.doc.data() as IPost;

    switch (change.type) {
      case 'added':
        const post = {
          ...data,
          id: change.doc.id,
          liked: !!user && !!data.likedBy.includes(user.uid),
        }
        this.posts.splice(change.newIndex, 0, post);
        break;
    
      case 'removed':
        this.posts.splice(change.oldIndex, 1)
        break;

      case 'modified':
        if (change.newIndex === change.oldIndex) {
          this.posts[change.oldIndex] = {
            ...data, 
            id: change.doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          }
        } else {
          this.posts.splice(change.oldIndex, 1);
          this.posts.splice(change.newIndex, 0, {
            ...data,
            id: change.doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          });
        }
        break;

      default:
        break;
    }
  }

  addNewPost(newPost: Omit<IPost, 'id'>) {
    addDoc(collection(getFirestore(), 'posts'), newPost);
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
