import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat_rooms, Chat_roomsList } from '../models/chat_rooms.model';
import { AutoCompleteItem } from '../models/common';

const baseUrl = '/api/chat_rooms';

@Injectable({
  providedIn: 'root',
})
export class Chat_roomsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Chat_roomsList> {
    return this.http.get<Chat_roomsList>(baseUrl);
  }

  getFilteredData(params: string): Observable<Chat_roomsList> {
    return this.http.get<Chat_roomsList>(baseUrl + params);
  }

  listAutocomplete(
    query: string,
    limit: number,
  ): Observable<AutoCompleteItem[]> {
    const params = {
      query,
      limit: limit.toString(),
    };
    return this.http.get<AutoCompleteItem[]>(`${baseUrl}/autocomplete`, {
      params,
    });
  }

  getById(id: string): Observable<Chat_rooms> {
    return this.http.get<Chat_rooms>(`${baseUrl}/${id}`);
  }

  create(data: Chat_rooms): any {
    return this.http.post(`${baseUrl}`, { data });
  }

  update(data: any, id: string): any {
    return this.http.put(`${baseUrl}/${id}`, { data, id });
  }

  delete(id: string): any {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
