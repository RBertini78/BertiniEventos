import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../../shared/titulo/titulo.component";
import { CommonModule } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form!: FormGroup;
  

  constructor(public fb:FormBuilder) { }

  get f(): any { return this.form.controls; }
 
  ngOnInit() {
    this.validation();
  }

  private validation() {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      title: ['',Validators.required] ,
      firstName: ['',Validators.required],
      latName:['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      function: ['',Validators.required],
      description: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    }, formOptions);

  }

  onSubmit(): void {
    if(this.form.invalid) {
      return;
    }
  }

  //event passado como parâmetro para evitar postback e realizar somente o form reset
  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
