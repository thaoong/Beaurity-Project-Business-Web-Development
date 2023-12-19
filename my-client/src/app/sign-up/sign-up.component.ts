import { Component, ViewChild } from '@angular/core';
import { AccountCustomer } from '../Interfaces/AccountCustomer';
import { Customers, Delivery } from '../Interfaces/Customer';
import { AccountcustomerService } from '../SERVICES/accountcustomer.service';
import { CustomersService } from '../SERVICES/customers.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  account = new AccountCustomer();
  customer = new Customers();
  delivery = new Delivery();
  errMessage: string = '';
  constructor(
    private _service: AccountcustomerService,
    private router: Router,
    private _customerService: CustomersService,
    private accountService: AccountcustomerService,

  ) { }
  public setAccount(a: AccountCustomer) {
    this.account = a;
  }

  isPhoneNumberValid: boolean = true;
  phoneNumberExist = true;
  phoneNumbers: any;

  checkPhoneNumber(): void {
    const phoneNumberRegex = /^(\+84|0)[1-9][0-9]{7,8}$/;
    if (this.account.phonenumber.trim().length === 0) {
      this.isPhoneNumberValid = true;
    } else {
      this.isPhoneNumberValid = phoneNumberRegex.test(this.account.phonenumber);
    }
  }

  isValidEmail: boolean = true;
  checkMail() {
    const MailRegex = /\S+@\S+\.\S+/;
    if (this.account.Mail.trim().length === 0) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = MailRegex.test(this.account.Mail);
    }
  }

  postAccount() {
    if (!this.isPhoneNumberValid) {
      alert('Vui lòng nhập đúng số điện thoại!');
      return
    }
    else if (!this.isValidEmail) {
      alert('Vui lòng nhập đúng email!');
      return
    } else if (this.account.phonenumber.trim().length === 0 || this.account.Name.trim().length === 0 || this.account.password.trim().length === 0 || this.confirmPassword.trim().length === 0) {
      alert('Vui lòng nhập đủ thông tin bắt buộc')
      return
    }
    else if (this.account.password !== this.confirmPassword) {
      alert('Mật khẩu không khớp')
      return
    }
    else {
      this._service.postAccount(this.account).subscribe({
        next: (data) => {
          this.account = data;
          this.router.navigate(['/app-login']);
          alert('Đăng ký thành công');
        },
        error: (err) => {
          this.errMessage = err;
          alert('Đăng ký không thành công');
        },
      });
    }
  }

  postCustomer() {
    this.customer.CustomerName = this.account.Name;
    this.customer.Phone = this.account.phonenumber;
    this.customer.Mail = this.account.Mail;

    if (!this.isPhoneNumberValid) {
      return
    }
    else if (!this.isValidEmail) {
      return
    } else if (this.account.phonenumber.trim().length === 0 || this.account.Name.trim().length === 0 || this.account.password.trim().length === 0 || this.confirmPassword.trim().length === 0) {
      return
    }
    else if (this.account.password !== this.confirmPassword) {
      return
    }
    else if (this.account.phonenumber.trim().length === 0 || this.account.Name.trim().length === 0 || this.account.password.trim().length === 0 || this.confirmPassword.trim().length === 0) {
      return
    }
    else {
      this._customerService.postCustomer(this.customer).subscribe({
        next: (data) => {
          this.customer = data;
          alert('Đăng ký thành công');
        },
        error: (err) => {
          this.errMessage = err;
          alert('Đăng ký không thành công');
        },
      });
    }
  }

  postDelivery() {
    this.delivery.Phone = this.account.phonenumber;
    this.delivery.Address = this.account.Address;
    this._customerService.postDelivery(this.delivery).subscribe({
      next: (data) => { this.delivery = data },
      error: (err) => { this.errMessage = err }
    })
  }

  confirmPassword: string = '';

  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: any;

  onChecked() {
    const passwordInput = this.passwordInput.nativeElement;

    if (this.account.password.trim().length === 0) {
      this.passwordInput.value = true;
      return
    }
    else {
      if (passwordInput.value.length < 6) {
        alert('Mật khẩu phải từ 6 kí tự trở lên');
      }
    }

  }

  checkPasswordsMatch() {
    if (this.confirmPassword.trim().length === 0) {
      this.confirmPasswordInput = true;
    } else {
      if (this.account.password !== this.confirmPassword) {
        alert('Mật khẩu không khớp');
        return
      }
    }
  }
}
