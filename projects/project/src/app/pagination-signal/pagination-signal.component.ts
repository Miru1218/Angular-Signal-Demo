import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';

@Component({
  selector: 'app-pagination-signal',
  templateUrl: './pagination-signal.component.html',
  styleUrls: ['./pagination-signal.component.css']
})
export class PaginationSignalComponent {
  @Input() page = 1; // 當前頁碼，預設為 1
  @Input() pageCount = 1; // 總頁數，預設為 1
  @Output() pageChange = new EventEmitter<number>(); // 當頁碼變更時，發出頁碼的事件

  currentPage = signal(1);

  previousPage = computed(() => {
    // 檢查頁碼是否大於 1
    return this.currentPage() > 1
      ? this.currentPage() - 1
      : this.currentPage();
  })

  nextPage = computed(() => {
    // 檢查頁碼是否小於總頁數
    return this.currentPage() < this.pageCount
      ? this.currentPage() + 1
      : this.currentPage()
  });

  ngOnInit() {
    this.currentPage.set(this.page);
  }

  jumpTo(num: number) {
    // 若頁碼不在合理範圍內，則不執行跳轉
    if (num < 1 || num > this.pageCount) {
      return;
    }

    this.currentPage.set(num); // 設定當前頁碼

    // 發出頁碼變更事件，將新的頁碼傳遞出去
    this.pageChange.emit(num);

  }

  goPrevious() {
    this.jumpTo(this.currentPage() - 1); // 跳轉到前一頁
  }

  goNext() {
    this.jumpTo(this.currentPage() + 1); // 跳轉到下一頁
  }

}
