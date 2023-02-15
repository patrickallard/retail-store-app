import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/data/categories';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements AfterViewInit, OnDestroy {
  public displayNewCategory: boolean = false
  public newCategory: Categories = new Categories(-1,'')
  public newCategoryName = ''
  public columnsToDisplay = ['name', 'delete']
  public dataSource: MatTableDataSource<Categories> = new MatTableDataSource<Categories>([])
  private categorySub: Subscription

  constructor(public ui: UiService) {
    this.categorySub = this.ui.getCategories()
      .subscribe(categories => this.dataSource.data = categories)
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }


  deleteCategory(id: number) {
    this.ui.deleteCategory(id)
  }

  editCategory(name: HTMLSpanElement, edit:MatIconButton, currentCategory: Categories): void {
    name.innerHTML = ''
    edit.disabled = true

    var nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('value', currentCategory.name)
    name.appendChild(nameInput)
    nameInput.addEventListener('keyup', event => {
      this.newCategoryName = nameInput.value
    })

    var cancelBtn = document.createElement('button')
    cancelBtn.innerHTML = "Cancel"
    name.appendChild(cancelBtn)
    cancelBtn.addEventListener('click', () => {
      name.innerHTML = currentCategory.name
      edit.disabled = false
    })
    
    var saveBtn = document.createElement('button')
    saveBtn.innerHTML = "Save"
    name.appendChild(saveBtn)
    saveBtn.addEventListener('click', () => {
      if(currentCategory.name === this.newCategoryName){
        name.innerHTML = currentCategory.name
      }
      else {
        currentCategory.name = this.newCategoryName
        this.ui.updateCategory(currentCategory)
      }
    })
  }
  addCategory() {
    this.ui.createCategory(this.newCategory)
  }

  displayCreateCategory() {
    this.displayNewCategory= true
  }
}
