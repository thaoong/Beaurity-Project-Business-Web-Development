import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { AccountCustomer } from '../Interfaces/AccountCustomer';
import { AuthService } from '../SERVICES/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountcustomerService } from '../SERVICES/accountcustomer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  phonenumber: string='';
  password: string='';
  rememberMe: boolean=false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  isPhoneNumberValid: boolean = true;

  checkPhoneNumber(): void {
    const phonenumberRegex = /^(\+84|0)[1-9][0-9]{7,8}$/; //kiểm tra sđt có hợp lệ ko
    this.isPhoneNumberValid = phonenumberRegex.test(this.phonenumber);
  }

  ngOnInit(){
    //Nếu phonenumber, password đã tồn tại thì sử dụng lại thông tin đăng nhập
    const phonenumber = this.authService.getCookie('phonenumber');
    const password = this.authService.getCookie('password');
    if (phonenumber && password){
      this.phonenumber = phonenumber;
      this.password = password;
      this.rememberMe = true;
    }
  }

  onSubmit () {
    if(!this.isPhoneNumberValid){
      alert('Vui lòng nhập đúng tên đăng nhập')
      return false
    }
    else {
      this.authService.login(this.phonenumber, this.password).subscribe(
        (user) => {
          // đăng nhập thành công, chuyển hướng đến home
          this.authService.setCurrentUser(user);

          //lưu tên đăng nhập và mật khẩu nếu người dùng chọn "Ghi nhớ mật khẩu"
        if (this.rememberMe) {
          this.authService.setCookie('phonenumber', this.phonenumber, 30);
          this.authService.setCookie('password', this.password, 30);
        }
        else {
          this.authService.deleteCookie('phonenumber');
          this.authService.deleteCookie('password');
        }
          alert ("Đăng nhập thành công!")
          this.router.navigate(['/'], { relativeTo: this.route});

        },
        (error) => {
          //thông báo lỗi
          alert('Đăng nhập không thành công!')
        }
      );
      return false
    }
  }
}
