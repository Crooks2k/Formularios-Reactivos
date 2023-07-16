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
  constructor(
    //Se usa private y readonly para que no se manipule la instancia del FormBuilder
    private readonly fb: FormBuilder
    ){ }
  ngOnInit(): void {
    this.dataForm = this.initForm()
  }

  onSubmit = ():void => {
    console.log("Form ->", this.dataForm.value)
  }
  initForm = ():FormGroup => {
    return this.fb.group({
      //In second position can declare validations or array of validations
      name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      info: ["", [Validators.minLength(10), Validators.maxLength(200)]],
      datalist: ["", [Validators.required, ]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }
}
