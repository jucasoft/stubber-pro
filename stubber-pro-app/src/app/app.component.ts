import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  versions = [
    { name: 'master', code: 'master' },
    { name: '1.0.0', code: '1.0.0' },
    { name: '2.0.0', code: '2.0.0' },
    { name: '3.1.0', code: '3.1.0' },
    { name: '4.3.1', code: '4.3.1' },
  ];

  title = 'stubber-pro-app';
  items: any[] = [];
  statesList = [
    { name: '200', code: '200' },
    { name: '3xx', code: '3xx' },
    { name: '4xx', code: '4xx' },
    { name: '5xx', code: '5xx' },
  ];

  ngOnInit(): void {
    this.reset();
  }

  prev() {}

  reset() {
    this.http
      .post<any[]>('api/v1/item/search', { id: 111 })
      .subscribe((items: any[]) => (this.items = items));
  }

  delete(item: any) {
    this.http
      .post<any[]>('api/v1/item/delete', item)
      .subscribe((items: any[]) => (this.items = items));
  }

  dump() {
    this.http
      .post<any[]>('api/v1/dump', {})
      .subscribe((items: any[]) => (this.items = items));
  }

  add() {
    this.http
      .post<any[]>('api/v1/add', {})
      .subscribe((items: any[]) => (this.items = items));
  }

  onActiveChange(item: any) {
    this.http
      .post<any[]>('api/v1/item/update', { ...item, active: !item.active })
      .subscribe((items: any[]) => (this.items = items));
  }
}
