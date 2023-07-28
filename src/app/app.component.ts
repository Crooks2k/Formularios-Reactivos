import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Formularios-Reactivos';
  dataForm!: FormGroup
  infoCharacters = 0
  maxLengthInfo = 200
  constructor(
    //Se usa private y readonly para que no se manipule la instancia del FormBuilder
    private readonly fb: FormBuilder
    ){ }
  ngOnInit(): void {
    this.dataForm = this.initForm()

    this.dataForm.get('info')?.valueChanges.subscribe((value) => {
      this.infoCharacters = value.length;
    });
  }

  onSubmit ():void {
    alert(`Form Data =>
    Name: ${this.dataForm.value.name}
    Email: ${this.dataForm.value.email}
    Info: ${this.dataForm.value.info}
    DataList: ${this.dataForm.value.datalist}
    Password: ${this.dataForm.value.password}`
    )
  }
  initForm = ():FormGroup => {
    return this.fb.group({
      //In second position can declare validations or array of validations
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i)]],
      info: ['', [Validators.minLength(10), Validators.maxLength(this.maxLengthInfo)]],
      datalist: ['', [Validators.required, ]],
      password: ['', [Validators.required,Validators.minLength(4)]]
    })
  }
}
