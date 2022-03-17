import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataFormatterService {
  constructor() {}

  generateLabel(val, item, className) {
    const elm = this.getFirstElementOfArray(val);
    if (elm) {
      return elm;
    }
    return className + '-' + item.id;
  }

  getFirstElementOfArray(val: any) {
    return Array.isArray(val)
      ? this.getElementOfObject(val[0])
      : this.getElementOfObject(val);
  }

  getElementOfObject(val: any) {
    if (val !== null && typeof val === 'object') {
      return val.name ? val.name : val.title ? val.title : val.email;
    }
    return val;
  }

  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      name: item.name,
      publicUrl: item.publicUrl || '',
    }));
  }

  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  }

  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  }

  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  }

  usersManyListFormatter(val) {
    const className = 'users';
    if (!val || !val.length) return [];
    return val.map((item) =>
      this.generateLabel(item.firstName, item, className),
    );
  }
  usersOneListFormatter(val) {
    const className = 'users';
    if (!val) return { label: null, value: null };
    return {
      label: this.generateLabel(val.firstName, val, className),
      value: val.id,
    };
  }
  usersManyListFormatterEdit(val) {
    const className = 'users';
    if (!val || !val.length) return [];
    return val.map((item) => ({
      label: this.generateLabel(item.firstName, item, className),
      id: item.id,
    }));
  }

  chat_roomsManyListFormatter(val) {
    const className = 'chat_rooms';
    if (!val || !val.length) return [];
    return val.map((item) => this.generateLabel(item.name, item, className));
  }
  chat_roomsOneListFormatter(val) {
    const className = 'chat_rooms';
    if (!val) return { label: null, value: null };
    return {
      label: this.generateLabel(val.name, val, className),
      value: val.id,
    };
  }
  chat_roomsManyListFormatterEdit(val) {
    const className = 'chat_rooms';
    if (!val || !val.length) return [];
    return val.map((item) => ({
      label: this.generateLabel(item.name, item, className),
      id: item.id,
    }));
  }
}
