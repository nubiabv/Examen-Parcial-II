import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpProviderService} from '../service/major/http-provider.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-major',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './major.component.html',
  styleUrl: './major.component.css'
})
export class MajorComponent {

  majors: any[] = [];
  form: FormGroup;
  editingMajorId: string  | null = null;
  update: string = 'N'

  constructor(private router: Router, private httpProvider: HttpProviderService, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.getAllMajors();
  }

  async getAllMajors() {
    this.httpProvider.getAllMajor().subscribe((data: any) => {
      if (data?.body) {
        this.majors = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No Major Found.');
        this.majors = [];
      }
    });
  }

  addMajor() {
    if (this.form.valid) {
      let majorData = { ...this.form.value };
      console.log(this.update);
  
      if (this.update === 'S') {
        
           // Si tiene ID, estamos en modo actualización
      majorData.id = this.editingMajorId;
        this.httpProvider.saveMajor(majorData).subscribe((data: any) => {
          if (data?.body?.isSuccess) {
            console.log('Major updated successfully.');
            this.getAllMajors();
            this.form.reset();
            this.update = 'N';
          }
        }, (error) => {
          console.log('Error updating major', error);
        });
      } else {
        // Asignar un valor específico al ID
        delete majorData.id;
        // Si no tiene ID, se está creando un nueva carrera
        this.httpProvider.saveMajor(majorData).subscribe((data: any) => {
          if (data?.body?.isSuccess) {
            console.log('Major  added successfully.'); 
            this.getAllMajors();
            this.form.reset();
            
          }
        }, (error) => {
          console.log('Error to add major', error);
        });
      }
    } else {
      console.log('Invalid Form');
    }

 
  }

  updateMajor(major: any) {
    this.editingMajorId = major.id;
    this.update = 'S';
    this.form.patchValue({
      id: major.id,
      name: major.name,
      code: major.code,
    });
  }

  deleteMajor(majorId: number) {
    this.httpProvider.deleteMajorById(majorId).subscribe(async (data: any) => {
      if (data?.body?.isSuccess) {
        console.log(`Major with ID ${majorId} rejected.`);
        this.getAllMajors();
        this.form.reset();
      }
    }, async (error) => {
      console.log(`Error rejecting major ${majorId}`, error);
      this.getAllMajors();
      this.form.reset();

    });
  }
}
