import { Component, OnDestroy } from '@angular/core';
import { Gender } from 'core/model/gender';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { PaymentMethod } from 'core/model/payment-method';
import { Room } from 'core/model/room';
import { PaymentTypeService } from 'payment/service/payment-type.service';
import { PaymentService } from 'payment/service/payment.service';
import { RoomTypeTable } from 'room/room-type-table';
import { RoomTypeService } from 'room/service/room-type.service';
import { RoomService } from 'room/service/room.service';
import { Observable, Subject } from 'rxjs';
import { GenderService } from 'shared/service/global/gender.service';
import { InvoiceService } from 'shared/service/invoice.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnDestroy {
  private destroySubject: Subject<void> = new Subject();
  
  firstPage: boolean = true;
  lastPage: boolean = false;
  detailPage: boolean = false;
  successPage: boolean = false;
  isLoading: boolean = false;
  guestId!: number;

  genderList$: Observable<Gender[]>;
  roomTypeList$: Observable<RoomTypeTable[]>;
  roomList$: Observable<Room[]>;
  invoice$!: Observable<Partial<Invoice>>;
  PaymentMethodList$: Observable<PaymentMethod[]>
  paymentList$!: Observable<Payment[]>;

  constructor(
    private _genderService: GenderService,
    private _roomTypeService: RoomTypeService,
    private _roomService: RoomService,
    private _invoiceService: InvoiceService,
    private _paymentTypeService: PaymentTypeService,
    private _paymentService: PaymentService,
    ){

    this.genderList$ = this._genderService.genderList$;
    this.roomTypeList$ = this._roomTypeService.roomTypeList$;
    this.roomList$ = this._roomService.availableRoomList$;
    this.PaymentMethodList$ = this._paymentTypeService.PaymentMethodList$;

  }
  
  ngOnDestroy(): void {
    this.destroySubject.next();
    this._paymentService.clearPaymentState();
  }

  newGuest(event: any){
    
    this.isLoading = event.event.isLoading;

    if(!this.isLoading && !event.event.firstPage){
      this.firstPage = event.event.firstPage;
      this.lastPage = event.event.lastPage;
      console.log(event.event.guestId)
      this.guestId = event.event.guestId;
    }
    
  }

  newRooms(event: any){
    this.isLoading = event.event.isLoading;

    if(!this.isLoading && !event.event.lastPage){
      this.firstPage = event.event.firstPage;
      this.lastPage = event.event.lastPage;
      
      this._invoiceService.addInvoice({
        lateCharges: 0,
        paymentTotal: 0,
        guestId: event.event.guestId
      })

      this.invoice$ = this._invoiceService.invoice$;
      this.detailPage = event.event.detailPage;
    }
  }

  newPayment(event: any){
    this.isLoading = event.event.isLoading;

    if(!this.isLoading && !event.event.detailPage){
      this.firstPage = event.event.firstPage;
      this.lastPage = event.event.lastPage;
      this.detailPage = event.event.detailPage;

      this.paymentList$ = this._paymentService.paymentList$;
      
      this.successPage = true;
    }
  }

}
