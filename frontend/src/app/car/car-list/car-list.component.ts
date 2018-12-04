import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Car} from "../../types";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';
import {CarService} from "../car.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TdDialogService} from "@covalent/core";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, AfterViewInit {

  cars$: any;
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();
  displayedColumns = ['id', 'image', 'name', 'buttons'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private carService: CarService,
              private dialogService: TdDialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cars$ = this.carService.getCars().cars$;
    this.cars$.subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  editCar(id: number) {
    this.router.navigate([id], {relativeTo: this.activatedRoute});
  }

  removeCar(id: number) {
    this.dialogService.openConfirm({
      title: 'Confirm',
      message: 'Are you sure you want to perform this action?',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.carService.deleteCar(id)
          .subscribe(({data}) => {
            console.log('Car deleted');
            this.router.navigate(['/cars'])
          }, (error) => {
            console.log('there was an error sending the query', error);
          });
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
