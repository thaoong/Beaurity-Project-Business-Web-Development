import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password: string=' '
  confirmPassword: string= '';
  passwordChanged: boolean = false;

  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: any;

  onChecked() {
    const passwordInput = this.passwordInput.nativeElement;
    if(this.password.trim().length === 0){
      this.passwordInput.value = true;
      return
    } else
    if (passwordInput.value.length < 6) {
      alert('Mật khẩu phải từ 6 kí tự trở lên');
      this.passwordChanged = false;
      return;
    }
      this.passwordChanged = true;
  }

  checkPasswordsMatch() {

    const passwordInput = this.passwordInput.nativeElement;
    const confirmPasswordInput = this.confirmPasswordInput.nativeElement;

    if (this.confirmPassword.trim().length === 0) {
      this.confirmPasswordInput = true;
    } else
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert('Mật khẩu không khớp');
      this.passwordChanged = false;
      return;
    }
    this.passwordChanged = true;
  }
  onSubmit() {
    // Kiểm tra xem mật khẩu đã được thay đổi thành công hay chưa
    if (this.passwordChanged) {
      alert('Đổi mật khẩu thành công');
    }
  }
  Form: any
  constructor(private _FormBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.Form = this._FormBuilder.group({
      pwd: ['', [Validators.required]]
    });
    this.password = '';
  }
    get pwd(){
      return this.Form.controls['pwd']
    }
}
