//import {Users} from './users.model';

export class Chat_rooms {
  id: string;

  name: string;

  createdBy: any; // Users;
  updatedBy: any; //Users;
}

export interface Chat_roomsList {
  count: number;
  rows: Chat_rooms[];
}
