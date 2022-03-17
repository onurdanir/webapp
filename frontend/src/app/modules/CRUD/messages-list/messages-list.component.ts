import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { MessagesService } from '../../../shared/services/messages.service';
import { routes } from '../../../consts';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../../shared/popups/delete-popup/delete-popup.component';
import { Messages } from '../../../shared/models/messages.model';
import { MatPaginator } from '@angular/material/paginator';
import { FilterConfig, FilterItems } from '../../../shared/models/common';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  messages: Messages[];
  loading = false;
  selectedId: string;
  deleteConfirmSubscription;
  public routes: typeof routes = routes;
  public displayedColumns: string[] = [
    'text',
    'from_user',
    'chat_room',
    'to_user',
    'actions',
  ];
  public dataSource: MatTableDataSource<Messages>;
  config: FilterConfig[] = [];
  showFilters = false;
  filters: FilterItems[] = [
    { label: 'Text', title: 'text' },

    { label: 'From User', title: 'from_user' },
    { label: 'Chat Room', title: 'chat_room' },
    { label: 'To User', title: 'to_user' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dataFormatterService: DataFormatterService,
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  addFilter(): void {
    !this.showFilters ? (this.showFilters = true) : null;
    this.config.push({});
  }

  submitHandler(request: string): void {
    this.messagesService.getFilteredData(request).subscribe((res) => {
      this.messages = res.rows;
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
    });
  }

  clearFilters(): void {
    this.getMessages();
  }

  delFilter() {
    this.config.length === 0 ? (this.showFilters = false) : null;
  }

  create(): void {
    this.router.navigate([this.routes.Messages_CREATE]);
  }

  edit(row: Messages): void {
    this.router.navigate([routes.Messages_EDIT, row.id]);
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
    this.messagesService.delete(id).subscribe({
      next: (res) => {
        this.deleteConfirmSubscription.unsubscribe();
        this.toastr.success('Messages deleted successfully');
        this.messages = this.messages.filter((item) => item.id !== id);
      },
      error: (err) => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  private getMessages(): void {
    this.messagesService.getAll().subscribe((res) => {
      this.messages = res.rows;
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
    });
  }

  redirectToSwagger() {
    return process.env.NODE_ENV === 'production'
      ? window.location.origin + '/api-docs/#/Messages'
      : 'http://localhost:8080/api-docs/#/Messages';
  }
}
