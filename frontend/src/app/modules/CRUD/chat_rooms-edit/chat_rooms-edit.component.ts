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
  selector: 'app-chat_rooms-edit',
  templateUrl: './chat_rooms-edit.component.html',
  styleUrls: ['./chat_rooms-edit.component.scss'],
})
export class Chat_roomsEditComponent implements OnInit {
  selectedChat_rooms;
  loading = false;
  public routes: typeof routes = routes;
  form: FormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;
  selectedId = this.route.snapshot.params.id;

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

  ngOnInit(): void {
    this.getChat_roomsById();
  }

  onSave(): void {
    this.chat_roomsService.update(this.form.value, this.selectedId).subscribe({
      next: (res) => {
        this.toastr.success('Chat_rooms updated successfully');
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

  private getChat_roomsById(): void {
    this.chat_roomsService.getById(this.selectedId).subscribe((res) => {
      this.form.patchValue(res);
    });
  }
}
