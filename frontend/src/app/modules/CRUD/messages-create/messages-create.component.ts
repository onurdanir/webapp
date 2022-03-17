import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes, AUTO_COMPLETE_LIMIT } from '../../../consts';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { AutoCompleteItem } from '../../../shared/models/common';
import { MessagesService } from '../../../shared/services/messages.service';

import { UsersService } from '../../../shared/services/users.service';

import { Chat_roomsService } from '../../../shared/services/chat_rooms.service';

@Component({
  selector: 'app-messages-create',
  templateUrl: './messages-create.component.html',
  styleUrls: ['./messages-create.component.scss'],
})
export class MessagesCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: FormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  users: AutoCompleteItem[] = [];

  chat_rooms: AutoCompleteItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataFormatterService: DataFormatterService,

    private usersService: UsersService,

    private chat_roomsService: Chat_roomsService,

    private messagesService: MessagesService,
  ) {
    this.form = this.formBuilder.group({
      text: [''],

      from_user: [null],

      chat_room: [null],

      to_user: [null],
    });
  }

  ngOnInit(): void {
    this.getUsers('');

    this.getChat_rooms('');

    this.getUsers('');
  }

  onCreate(): void {
    this.messagesService.create(this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('Messages created successfully');
        this.router.navigate([this.routes.Messages]);
      },
      error: (err) => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  onCancel(): void {
    this.router.navigate([this.routes.Messages]);
  }

  getUsers(searchValue: string): void {
    const query = searchValue;
    const limit = this.AUTO_COMPLETE_LIMIT;
    this.usersService.listAutocomplete(query, limit).subscribe((res) => {
      this.users = res;
    });
  }

  getChat_rooms(searchValue: string): void {
    const query = searchValue;
    const limit = this.AUTO_COMPLETE_LIMIT;
    this.chat_roomsService.listAutocomplete(query, limit).subscribe((res) => {
      this.chat_rooms = res;
    });
  }
}
