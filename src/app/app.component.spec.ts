import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  //test basico que verifica la creacion del componente
  it('Correctly create App Component', () => {
    expect(component).toBeTruthy()
  });

  it('bad email return error', () => {
    component.dataForm = new FormGroup({
      email: new FormControl('',
       [Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        Validators.pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i)]
      )
    })

    component.dataForm.get('email')?.setValue('novalidemail.com')
    expect(component.dataForm.get('email')?.hasError('pattern')).toBeTrue();
  })


  it('Verify incomplete input verifications',() =>{
    fixture.detectChanges()

    component.dataForm.patchValue({
      name: "FormTest",
      email: "examplenoemail",
      info: "",
      datalist: "Colombia",
      password: "12234"
    })

    expect(component.dataForm.valid).toBeFalse()
  })

  it('verify if email is valid', () =>{
    component.dataForm.patchValue({
      name: "FormTest",
      email: "example@email.com",
      info: "Hello world this is a test unitary",
      datalist: "Colombia",
      password: "12234"
    })

    expect(component.dataForm.valid).toBeTrue()
  })
});
