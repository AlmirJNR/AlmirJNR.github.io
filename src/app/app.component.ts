import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'My chores';
  public form: FormGroup;
  public toDos: Todo[] = [];
  public dateToday: number = Date.now();

  //Creates new Todo objects based upon the FormBuilder -> See line 40
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      chore: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.required,
        ])]
    });

    if (localStorage.getItem('chores')) {
      this.loadListItemsOnLocalStorage();
    }
  }

  //Refreshes current page
  refreshPage() {
    location.reload();
  }

  //Add chore to the list
  addListItem() {
    const id = this.toDos.length + 1;
    const chore = this.form.controls['chore'].value;
    //Creates new Todo object
    this.toDos.push(new Todo(id, chore, false));
    this.saveListItemsOnLocalStorage();
    this.clearFormAfterAdd();

    //Scrolls to the bottom after something getting added
    setTimeout(() => 
    { window.scrollTo(0,9999) },
    0 );
  }
  //Saves the list items in the local storage
  saveListItemsOnLocalStorage() {
    const localSaveData = JSON.stringify(this.toDos);
    localStorage.setItem('chores', localSaveData);
  }
  //Loads the list items in the local storage
  loadListItemsOnLocalStorage() {
    const localLoadData = localStorage.getItem('chores');
    this.toDos = JSON.parse(localLoadData || "");
  }
  //Clear the form field after chore being added to the list
  clearFormAfterAdd() {
    this.form.reset();
  }

  //Remove chore from the list
  removeListItem(chore: Todo) {
    const index = this.toDos.indexOf(chore);

    //Security Conditional
    if (index !== -1) {
      this.toDos.splice(index, 1);
      const localSaveData = JSON.stringify(this.toDos);
      localStorage.setItem('chores', localSaveData);
    }
  }

  //Close chore if user mark as done
  closeListItem(chore: Todo) {
    chore.isDone = true;
    this.saveListItemsOnLocalStorage()
  }
  //Open chore if user mark as undone (undone is the default value)
  openListItem(chore: Todo) {
    chore.isDone = false;
    this.saveListItemsOnLocalStorage()
  }

  //Remove all chores from the list
  deleteAllListItems() {
    localStorage.removeItem('chores');
    this.refreshPage();
  }
}