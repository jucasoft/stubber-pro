import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'stubber-pro-mr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'angular-application-to-test-library';

  users:any[] = []
  profiles:any[] = []
  products:any[] = []

  constructor(private http:HttpClient) {

  }

  call(path:string): void {
    this.http.get(path).subscribe(
      (values:any) => {
        (values as any[]).slice(0, 2).forEach((value:any, i:number) => {
          this.http.post(path, {...value, id: new Date().getTime()+i}).subscribe()
        })
      }
    )
  }

  ngOnInit(): void {
    ["/api/v1/users","/api/v1/profiles","/api/v1/products"].forEach(path => this.call(path))
  }


}
