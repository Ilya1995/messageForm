import { Component, OnInit } from '@angular/core';
import { toast } from 'materialize-css/dist/js/materialize';

interface IForm {
  name: string;
  email: string;
  phone: string;
  text: string;
  selectedTheme: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public form: IForm;
  public captcha: boolean;
  public showForm: boolean;
  public siteKey: string;
  public messages: IForm[];
  public themeMessage: string[] = ['Техподдержка', 'Продажи', 'Другое'];
  public maskPhone: (string | RegExp)[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor() {
    this.form = {
      name: '',
      email: '',
      phone: '',
      text: '',
      selectedTheme: this.themeMessage[0]
    };
    this.siteKey = '6LetsM8UAAAAAHwrg04KI6rVGONxZVr2nlS0BRV-';
    this.captcha = false;
    this.showForm = true;
  }

  ngOnInit() {
    sessionStorage.setItem('messages', JSON.stringify([]));
  }

  validName(): boolean {
    return this.form.name.length > 3;
  }

  validEmail(): boolean {
    return /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i.test(this.form.email);
  }

  validPhone(): boolean {
    return this.form.phone.length === 14;
  }

  validText(): boolean {
    return this.form.text.length > 10;
  }

  valideForm(): boolean {
    return this.validName() && this.validEmail() && this.validPhone() &&
           this.validText() && this.captcha;
  }

  clearForm(): void {
    this.form.name = '';
    this.form.email = '';
    this.form.phone = '';
    this.form.text = '';
    this.captcha = false;
  }

  back(): void {
    setTimeout(() => {
      this.clearForm();
      this.showForm = true;
    }, 500);
  }

  setFormStorage(): void {
    this.messages = JSON.parse(sessionStorage.messages);

    const exist = (message) => {
      return (message.email === this.form.email && message.phone === this.form.phone);
    };

    if (!this.messages.some(exist)) {
      this.messages.push(this.form);
      sessionStorage.setItem('messages', JSON.stringify(this.messages));
    }
    setTimeout(() => {
      this.showForm = false;
    }, 500);
  }

  onSubmit() {
    switch (false) {
      case this.captcha:
        toast({ html: 'Совладай с капчой' });
        break;
      case this.validName():
        toast({ html: 'Введите имя' });
        break;
      case this.validEmail():
        toast({ html: 'Заполните email' });
        break;
      case this.validPhone():
        toast({ html: 'Введите номер телефона' });
        break;
      case this.validText():
        toast({ html: 'Введите сообщение' });
        break;
      default:
        this.setFormStorage();
        break;
    }
  }
}
