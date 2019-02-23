import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ListResponse} from '../../shared.interface';
import {Router} from '@angular/router';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnChanges {

  @Input() pagination: ListResponse<any>;

  pages = [];

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = [];
    if (!changes.pagination.currentValue) {
      return;
    }

    for (let p = 1; p <= this.pagination.total_pages; p++) {
      this.pages.push(p);
    }
  }

  goTo(page: number) {
    this.router.navigate([], {queryParams: {page}, queryParamsHandling: 'merge'});
  }

}
