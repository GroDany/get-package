import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CityResponse, GetPackageService, TimeResponse } from '../services/get_package.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss']
})
export class OrderDeliveryComponent {
  form: FormGroup;
  token: string = '';
  cities$: Observable<CityResponse[]> = this.gpService.getCities();
  minDate: Date = new Date();
  times$: Observable<TimeResponse[]> = this.gpService.getTimes();
  date: Date = new Date();


  constructor(
    private router: Router,
    private gpService: GetPackageService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      senderName: new FormControl('', [Validators.required]),
      senderPhoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]),
      pickupAddress: new FormControl('', [Validators.required]),
      pickupCity: new FormControl('', [Validators.required]),
      receiverName: new FormControl('', [Validators.required]),
      receiverPhoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]),
      dropoffAddress: new FormControl('', [Validators.required]),
      dropoffCity: new FormControl('', [Validators.required]),
      deliveryDate: new FormControl('', [Validators.required]),
      deliveryHour: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.token = this.cookieService.get("Token");
    if (!this.token) {
      this.router.navigate(['login']);
    }
  }

  calculatePrice() : number {
    const pickup: CityResponse  = this.form.controls["pickupCity"].value;
    const dropoff: CityResponse  = this.form.controls["dropoffCity"].value;

    if (pickup.enName == dropoff.enName) {
      return pickup.price;
    }

    return pickup.price + dropoff.price +10;
  }

  calculateVTA() : number {
    return this.calculatePrice() * 0.17;
  }

  calculateAll() : number {
    return this.calculatePrice() * 1.17;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onSubmit() {
    if (!this.form.valid) {
      this.openSnackBar("Form incomplete", "Done");
    }
    this.gpService.submit({ token: this.token }).subscribe(response => {
      console.log(response);
    });
  }

  datesFilter(d: Date | null): boolean {
    const now: Date = new Date();
    if (!d) return false;
    return d.getDay() !== 6 && d.getTime() > now.getTime();
  }

  getCityName(value: CityResponse) : string {
    const lang = this.translate.currentLang;

    if (lang == 'he') {
      return value.heName;
    }

    return value.enName;
  }
}
