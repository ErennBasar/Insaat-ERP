import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, FileText, Clock, AlertTriangle, CheckCircle2, Plus, Upload } from 'lucide-angular';

@Component({
  selector: 'app-contracts',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './contracts.html',
  styleUrl: './contracts.scss',
})
export class Contracts {
  // İkonlar
  readonly FileText = FileText;
  readonly Clock = Clock;
  readonly AlertTriangle = AlertTriangle;
  readonly CheckCircle2 = CheckCircle2;
  readonly Plus = Plus;
  readonly Upload = Upload;

  porjectForm!: FormGroup;
  showAddModal = false;

  ngOnInit() {

  }



}
