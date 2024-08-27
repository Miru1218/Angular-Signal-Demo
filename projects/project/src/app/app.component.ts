import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  totalPages = 10; // 假設總頁數為 10
  currentPage = 1;

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log(`當前頁碼: ${this.currentPage}`);
  }
}