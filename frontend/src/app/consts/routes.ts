export enum routes {
  DASHBOARD = '/app/dashboard',
  PROFILE = '/app/profile',
  CHANGE_PASSWORD = '/app/change-password',
  LOGIN = '/login',

  // --- CRUD module ---//

  Users = '/admin/users',
  Users_CREATE = '/admin/users/new',
  Users_EDIT = '/admin/users/edit',

  Messages = '/admin/messages',
  Messages_CREATE = '/admin/messages/new',
  Messages_EDIT = '/admin/messages/edit',

  Chat_rooms = '/admin/chat_rooms',
  Chat_rooms_CREATE = '/admin/chat_rooms/new',
  Chat_rooms_EDIT = '/admin/chat_rooms/edit',
}
