//import {Users} from './users.model';
//import {Users} from './users.model';
//import {Chat_rooms} from './chat_rooms.model';
//import {Users} from './users.model';

export class Messages {
  id: string;

  text: string;

  from_user: any; // Users;

  chat_room: any; // Chat_rooms;

  to_user: any; // Users;

  createdBy: any; // Users;
  updatedBy: any; //Users;
}

export interface MessagesList {
  count: number;
  rows: Messages[];
}
