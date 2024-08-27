import { Component, Input, Output, EventEmitter, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-pagination-signal',
  templateUrl: './pagination-signal.component.html',
  styleUrls: ['./pagination-signal.component.css']
})
export class PaginationSignalComponent {
  @Input() page = 1; // 當前頁碼，預設為 1
  @Input() pageCount = 1; // 總頁數，預設為 1
  @Output() pageChange = new EventEmitter<number>(); // 當頁碼變更時，發出頁碼的事件

  currentPage = signal(this.page); // 用於記錄當前頁碼的信號，初始值為輸入的頁碼

  previousPage = computed(() => {
    // 計算前一頁的頁碼，如果當前頁碼大於 1，則減一；否則返回當前頁碼
    return this.currentPage() > 1 ? this.currentPage() - 1 : this.currentPage();
  });

  nextPage = computed(() => {
    // 計算下一頁的頁碼，如果當前頁碼小於總頁數，則加一；否則返回當前頁碼
    return this.currentPage() < this.pageCount ? this.currentPage() + 1 : this.currentPage();
  });

  ngOnInit() {
    // 在組件初始化時，將 currentPage 設置為輸入的頁碼
    this.currentPage.set(this.page);
  }

  jumpTo(num: number) {
    // 若目標頁碼不在合理範圍內（小於1或大於總頁數），則不執行跳轉
    if (num < 1 || num > this.pageCount) {
      return;
    }

    // 設定當前頁碼為目標頁碼，並發出頁碼變更事件
    this.currentPage.set(num);
    this.pageChange.emit(num);
  }

  goPrevious() {
    // 跳轉到前一頁
    this.jumpTo(this.previousPage());
  }

  goNext() {
    // 跳轉到下一頁
    this.jumpTo(this.nextPage());
  }

  private logTodoResponse = effect((onCleanup) => {
    // 將當前頁碼存入 localStorage，並輸出到控制台
    localStorage.setItem('pageNumber', this.currentPage().toString());
    console.log(this.currentPage());

    // 設置一個定時器，在 1 秒後輸出當前頁碼
    const timer = setTimeout(() => {
      console.log('1 second ago, the user was on page', this.currentPage().toString());
    }, 1000);

    // 使用 onCleanup 來確保定時器在 effect 被銷毀時清理掉
    onCleanup(() => {
      clearTimeout(timer);
    });
  });

  ngOnDestroy(): void {
    // 在組件銷毀時，手動銷毀 effect，以防止內存泄漏
    this.logTodoResponse.destroy();
  }
}
