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

  updateForm!: FormGroup;
  showUpdateModal = false;
  selectedProjectId: string = '';

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

    this.updateForm = this.fb.group({
      newProgress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      newStatus: ['DevamEdiyor', Validators.required]
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

  openUpdateModal(project: Project): void {
    this.selectedProjectId = project.id;
    this.updateForm.patchValue({
      newProgress: project.progress,
      newStatus: project.status
    });
    this.showUpdateModal = true;
  }

  onUpdateSubmit(): void {
    if (this.updateForm.invalid) return;

    const command = {
      id: this.selectedProjectId,
      newProgress: this.updateForm.value.newProgress,
      newStatus: this.updateForm.value.newStatus
    };

    this.projectService.updateProgress(command).subscribe({
      next: () => {
        this.showUpdateModal = false;
        this.loadProjects(); // Tabloyu ve üstteki istatistik kartlarını yeniler
      },
      error: (err) => console.error('Güncelleme hatası:', err)
    });
  }
  get activeProjectsCount(): number {
    return this.projects.filter(p =>
      p.status === 'DevamEdiyor' || p.status === 'Beklemede').length;
  }

  get criticalProjectsCount(): number {
    return this.projects.filter(p => this.isProjectCritical(p)).length;
  }

  get averageProfitability(): number {
    if (this.projects.length === 0) return 0;
    const totalProfit = this.projects.reduce((sum, p) => sum + Number(p.profit || 0), 0);
    return totalProfit / this.projects.length;
  }

  isProjectCritical(project: any): boolean {

    if (project.status !== 'DevamEdiyor') return false;

    if (!project.endDate) return false;

    const today = new Date();
    const end = new Date(project.endDate);

    if (today > end && project.progress < 100) return true;

    const timeDiff = end.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Teslime 30 gün veya daha az kalmış ama proje %95'in altındaysa (Riskli)
    if (daysLeft > 0 && daysLeft <= 30 && project.progress < 95) return true;

    return false;
  }

  // --- UI FORMATLAMA VE RENK SINIFLARI ---

  // Ekranda "DevamEdiyor" yerine düzgünce "Devam Ediyor" yazması için dönüştürücü
  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      "Beklemede": "Beklemede",
      "DevamEdiyor": "Devam Ediyor",
      "Tamamlandi": "Tamamlandı",
      "IptalEdildi": "İptal Edildi",
      "Askida": "Askıda"
    };
    return map[status] || status;
  }

  // Tablodaki durum rozetinin rengi
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      "Beklemede": "status-warning",
      "DevamEdiyor": "status-primary",
      "Tamamlandi": "status-success",
      "IptalEdildi": "status-danger",
      "Askida": "status-orange"
    };
    return map[status] || "status-primary";
  }

  // İlerleme çubuğunun rengi (Proje nesnesinin kendisine bakarak karar veriyor)
  getProgressBarClass(project: any): string {
    if (this.isProjectCritical(project)) return 'bg-danger';
    if (project.status === 'Beklemede') return 'bg-warning';
    if (project.status === 'Askida') return 'bg-orange';
    if (project.status === 'Tamamlandi') return 'bg-success';
    if (project.status === 'IptalEdildi') return 'bg-danger';
    return 'bg-primary';
  }

  // İlerleme yüzdesinin metin rengi
  getProgressTextClass(project: any): string {
    if (this.isProjectCritical(project)) return 'text-danger';
    if (project.status === 'Beklemede') return 'text-warning';
    if (project.status === 'Askida') return 'text-orange';
    if (project.status === 'Tamamlandi') return 'text-success';
    if (project.status === 'IptalEdildi') return 'text-danger';
    return 'text-primary';
  }

  getTypeClass(type: string): string {
    if (!type) return "type-blue";

    const normalized = type.trim().toLowerCase();

    if (normalized === 'elektrik') return 'type-blue';
    if (normalized === 'mekanik') return 'type-purple';
    if (normalized === 'i̇nşaat' || normalized === 'inşaat' || normalized === 'insaat') return 'type-orange';

    return "type-blue";
  }
}
