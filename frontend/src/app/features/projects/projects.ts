import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService, Project } from '../projects/project.service';
import { LucideAngularModule } from 'lucide-angular';
import {
  FolderKanban, MapPin, User, Calendar, TrendingUp,
  Plus, Filter, Search
} from 'lucide-angular';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  // İkonları template'de kullanmak için tanımlıyoruz
  readonly FolderKanban = FolderKanban;
  readonly MapPin = MapPin;
  readonly User = User;
  readonly Calendar = Calendar;
  readonly TrendingUp = TrendingUp;
  readonly Plus = Plus;
  readonly Filter = Filter;
  readonly Search = Search;

  // Dependency Injection (Servis ve Formlar)
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);


  projects: Project[] = [];
  filters = ["Tümü", "Elektrik", "Mekanik", "İnşaat"];
  activeFilter = "Tümü";

  projectForm!: FormGroup;
  showAddModal = false;

  ngOnInit(): void {
    this.initForm();
    this.loadProjects();
  }

  // Yeni Proje formunun kurallarını belirliyoruz
  initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      employerName: ['', Validators.required],
      contractValue: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: [''],
      expectedProfitMargin: [0, Validators.required],
      type: ['İnşaat', Validators.required],
      projectManager: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  // Backend'den verileri çekiyoruz
  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Projeler çekilirken hata oluştu:', err)
    });
  }

  // Formu kaydet butonuna basıldığında çalışacak metot
  onSubmit(): void {
    if (this.projectForm.invalid) {
      alert('Lütfen zorunlu alanları doldurun Usta!');
      return;
    }

    this.projectService.createProject(this.projectForm.value).subscribe({
      next: (newId) => {
        console.log('Proje başarıyla eklendi. ID:', newId);
        this.showAddModal = false; // Formu kapat
        this.projectForm.reset(); // İçini temizle
        this.loadProjects(); // Tabloyu yeni verilerle güncelle
      },
      error: (err) => console.error('Proje eklenirken hata:', err)
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      "Devam Ediyor": "status-primary",
      "Kritik": "status-danger",
      "Başlangıç": "status-warning",
      "Tamamlandı": "status-success",
    };
    return map[status] || "status-primary";
  }

  getTypeClass(type: string): string {
    const map: Record<string, string> = {
      "Elektrik": "type-blue",
      "Mekanik": "type-purple",
      "İnşaat": "type-orange",
    };
    return map[type] || "type-blue";
  }

  // Sınıfın içine (diğer metotların yanına) şu metodu ekle:
  getProgressTextClass(status: string): string {
    const map: Record<string, string> = {
      "Devam Ediyor": "text-primary",
      "Kritik": "text-danger",
      "Başlangıç": "text-warning",
      "Tamamlandı": "text-success",
    };
    return map[status] || "text-primary";
  }

  getProgressBarClass(status: string): string {
    if (status === 'Kritik') return 'bg-danger';
    if (status === 'Başlangıç') return 'bg-warning';
    return 'bg-primary';
  }
}
