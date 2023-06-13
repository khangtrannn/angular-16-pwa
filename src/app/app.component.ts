import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './user.service';

export interface TableElement {
  id: string;
  name: string;
  email: string;
  website: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-16-pwa';

  data!: TableElement[];
  columns: string[] = ['id', 'name', 'email', 'website'];

  dataSource = new MatTableDataSource<TableElement>(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource<TableElement>(data);
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }
}
