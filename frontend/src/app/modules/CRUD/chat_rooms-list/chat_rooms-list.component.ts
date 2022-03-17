import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { Chat_roomsService } from '../../../shared/services/chat_rooms.service';
import { routes } from '../../../consts';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../../shared/popups/delete-popup/delete-popup.component';
import { Chat_rooms } from '../../../shared/models/chat_rooms.model';
import { MatPaginator } from '@angular/material/paginator';
import { FilterConfig, FilterItems } from '../../../shared/models/common';

@Component({
  selector: 'app-chat_rooms-list',
  templateUrl: './chat_rooms-list.component.html',
  styleUrls: ['./chat_rooms-list.component.scss'],
})
export class Chat_roomsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  chat_rooms: Chat_rooms[];
  loading = false;
  selectedId: string;
  deleteConfirmSubscription;
  public routes: typeof routes = routes;
  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource: MatTableDataSource<Chat_rooms>;
  config: FilterConfig[] = [];
  showFilters = false;
  filters: FilterItems[] = [{ label: 'Name', title: 'name' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dataFormatterService: DataFormatterService,
    private chat_roomsService: Chat_roomsService,
  ) {}

  ngOnInit(): void {
    this.getChat_rooms();
  }

  addFilter(): void {
    !this.showFilters ? (this.showFilters = true) : null;
    this.config.push({});
  }

  submitHandler(request: string): void {
    this.chat_roomsService.getFilteredData(request).subscribe((res) => {
      this.chat_rooms = res.rows;
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
    });
  }

  clearFilters(): void {
    this.getChat_rooms();
  }

  delFilter() {
    this.config.length === 0 ? (this.showFilters = false) : null;
  }

  create(): void {
    this.router.navigate([this.routes.Chat_rooms_CREATE]);
  }

  edit(row: Chat_rooms): void {
    this.router.navigate([routes.Chat_rooms_EDIT, row.id]);
  }

  openDeleteModal(id: string): void {
    this.selectedId = id;
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '512px',
    });

    this.deleteConfirmSubscription =
      dialogRef.componentInstance.deleteConfirmed.subscribe((result) => {
        this.onDelete(this.selectedId);
      });
  }

  onDelete(id: string): void {
    this.chat_roomsService.delete(id).subscribe({
      next: (res) => {
        this.deleteConfirmSubscription.unsubscribe();
        this.toastr.success('Chat_rooms deleted successfully');
        this.chat_rooms = this.chat_rooms.filter((item) => item.id !== id);
      },
      error: (err) => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  private getChat_rooms(): void {
    this.chat_roomsService.getAll().subscribe((res) => {
      this.chat_rooms = res.rows;
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
    });
  }

  redirectToSwagger() {
    return process.env.NODE_ENV === 'production'
      ? window.location.origin + '/api-docs/#/Chat_rooms'
      : 'http://localhost:8080/api-docs/#/Chat_rooms';
  }
}
