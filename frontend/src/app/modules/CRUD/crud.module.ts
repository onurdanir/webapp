import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { CrudRoutingModule } from './crud-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';

import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersListComponent } from './users-list/users-list.component';

import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

import { Chat_roomsCreateComponent } from './chat_rooms-create/chat_rooms-create.component';
import { Chat_roomsEditComponent } from './chat_rooms-edit/chat_rooms-edit.component';
import { Chat_roomsListComponent } from './chat_rooms-list/chat_rooms-list.component';

@NgModule({
  declarations: [
    UsersCreateComponent,
    UsersEditComponent,
    UsersListComponent,

    MessagesCreateComponent,
    MessagesEditComponent,
    MessagesListComponent,

    Chat_roomsCreateComponent,
    Chat_roomsEditComponent,
    Chat_roomsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CrudRoutingModule,
    NgSelectModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class CrudModule {}
