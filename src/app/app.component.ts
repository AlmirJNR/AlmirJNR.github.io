import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public tittle: String = 'My chores';
  public toDos: Todo[] = [];

  //Creates new Todo objects
  constructor() {
    this.toDos.push(new Todo(1, 'Learn basic programming', false));
    this.toDos.push(new Todo(2, 'Learn how to git', false));
    this.toDos.push(new Todo(3, 'Learn how to use javascript', false));
    this.toDos.push(new Todo(4, 'Learn how to use typescript', false));
    this.toDos.push(new Todo(5, 'Learn how to use angular', false));
  }

  //Refreshes current page
  refreshPage() {
    location.reload();
  }

  //Remove chore from the list
  removeListItem(chore: Todo) {
    const index = this.toDos.indexOf(chore);

    //Security Conditional
    if (index !== -1) {
      this.toDos.splice(index, 1);
    }
  }

  //Close chore if user mark as done
  closeListItem(chore: Todo) {
    chore.isDone = true;
  }
  //Open chore if user mark as undone (undone is the default value)
  openListItem(chore: Todo) {
    chore.isDone = false;
  }

  //Remove all chores from the list
  deleteAllListItems() {
    this.toDos = [];
  }
}