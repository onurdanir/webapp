import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersListComponent } from './users-list/users-list.component';

import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

import { Chat_roomsCreateComponent } from './chat_rooms-create/chat_rooms-create.component';
import { Chat_roomsEditComponent } from './chat_rooms-edit/chat_rooms-edit.component';
import { Chat_roomsListComponent } from './chat_rooms-list/chat_rooms-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users/edit/:id',
    component: UsersEditComponent,
  },
  {
    path: 'users/new',
    component: UsersCreateComponent,
  },

  {
    path: 'messages',
    component: MessagesListComponent,
  },
  {
    path: 'messages/edit/:id',
    component: MessagesEditComponent,
  },
  {
    path: 'messages/new',
    component: MessagesCreateComponent,
  },

  {
    path: 'chat_rooms',
    component: Chat_roomsListComponent,
  },
  {
    path: 'chat_rooms/edit/:id',
    component: Chat_roomsEditComponent,
  },
  {
    path: 'chat_rooms/new',
    component: Chat_roomsCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
