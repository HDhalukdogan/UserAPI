import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../pages/authentication/authentication.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/theme/shared/components/modal/modal.component';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings | any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  users: any = [];
  constructor(private authService: AuthenticationService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.getUsers();
    this.dtOptions = {
      //select:true,
      dom: 'Bfrtip',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        'csv',
        'copy',
        'print',
        'excel',
      ]
    };
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getUsers() {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.dtTrigger.next(users);
        this.users = users;
      },
      error: (err) => console.log('err', err)
    });
  }

  showUser(user) {
    const modalRef = this.modalService.open(ModalComponent, { size: "xl" });
    modalRef.componentInstance.user = user;
  }

}
