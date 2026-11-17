const cl = console.log;

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/app/model/interfaces';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-todo-ls',
  templateUrl: './todo-ls.component.html',
  styleUrls: ['./todo-ls.component.scss']
})
export class TodoLSComponent implements OnInit {

  @ViewChild('todoItem')
  todoItemRef !: ElementRef<HTMLInputElement>;

  @ViewChild('isCompleted')
  isCompletedRef !: ElementRef<HTMLSelectElement>

  isIneditMode: boolean = false;

  todosArr: Itodo[] = [
    {
      todoItem: 'Html',
      todoId: '121',
      isCompleted: false
    },
    {
      todoItem: 'CSS',
      todoId: '122',
      isCompleted: true
    },
    {
      todoItem: 'Javascript',
      todoId: '123',
      isCompleted: false
    },
    {
      todoItem: 'Angular',
      todoId: '124',
      isCompleted: true
    },
    {
      todoItem: 'Node.js',
      todoId: '125',
      isCompleted: false
    },
    {
      todoItem: 'Express.js',
      todoId: '126',
      isCompleted: true
    },
  ]




  constructor(private _uuidService: UuidService,
    // private _snackbarService: SnackbarService
  ) {

    // localStorage.setItem("todosArr", JSON.stringify(this.todosArr))
    let todosArr1 = localStorage.getItem('todosArr')
    cl(todosArr1)
    if (todosArr1) {
      this.todosArr = JSON.parse(todosArr1);
    } else {
      localStorage.setItem('todosArr', JSON.stringify(this.todosArr));
    }


  }


  ngOnInit(): void {
  }

  onAddTodo() {
    let newTodo: Itodo = {
      todoItem: this.todoItemRef.nativeElement.value,
      todoId: this._uuidService.getUUid(),
      isCompleted: this.isCompletedRef.nativeElement.value === 'yes' ? true : false
    }
    cl(newTodo)
    this.todosArr.unshift(newTodo)
    localStorage.setItem('todosArr', JSON.stringify(this.todosArr))
    this.todoItemRef.nativeElement.value = ''
    this.isCompletedRef.nativeElement.value = ''

    this._uuidService.snackbar(`New todo with name ${newTodo.todoItem} created successfully`)
  }

  // console.log(this.todosArr);


  onEditTodo(todo: Itodo) {
    this.todoItemRef.nativeElement.value = todo.todoItem
    this.isCompletedRef.nativeElement.value = todo.isCompleted ? 'yes' : 'no'

    this.isIneditMode = true

    localStorage.setItem('editId', todo.todoId)
  }


  onUpdateTodo() {
    let updateId = localStorage.getItem('editId')

    cl(updateId)
    if (updateId) {
      let updatedObj = {
        todoItem: this.todoItemRef.nativeElement.value,
        todoId: updateId,
        isCompleted: this.isCompletedRef.nativeElement.value === 'yes' ? true : false
      }
      cl(updatedObj)

      let getIdx = this.todosArr.findIndex(e => e.todoId === updateId)
      if (getIdx !== -1) {
        this.todosArr[getIdx] = updatedObj

        localStorage.setItem('todosArr', JSON.stringify(this.todosArr))

        this.isIneditMode = false

        this.todoItemRef.nativeElement.value = ''
        this.isCompletedRef.nativeElement.value = ''

        localStorage.removeItem('editId')

        this._uuidService.snackbar(`Todo with id ${updatedObj.todoItem} updated successfully`)


      }

    }
  }

  onDeleteTodo(todo: string) {
    let getConfirm = confirm('are you sure, you want to delete this todo')

    if (getConfirm) {
      let getIdx = this.todosArr.findIndex(e => e.todoId === todo)

      this.todosArr.splice(getIdx, 1)
      this._uuidService.snackbar(`Todo with id ${todo} deleted successfully`)


      localStorage.setItem('todosArr', JSON.stringify(this.todosArr))
    }
  }



}
