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
import { Chat_roomsService } from '../../../shared/services/chat_rooms.service';

@Component({
  selector: 'app-chat_rooms-create',
  templateUrl: './chat_rooms-create.component.html',
  styleUrls: ['./chat_rooms-create.component.scss'],
})
export class Chat_roomsCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: FormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataFormatterService: DataFormatterService,

    private chat_roomsService: Chat_roomsService,
  ) {
    this.form = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit(): void {}

  onCreate(): void {
    this.chat_roomsService.create(this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('Chat_rooms created successfully');
        this.router.navigate([this.routes.Chat_rooms]);
      },
      error: (err) => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  onCancel(): void {
    this.router.navigate([this.routes.Chat_rooms]);
  }
}
