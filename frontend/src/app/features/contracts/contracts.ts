import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule,
  Filter,Search,X,BrainCircuit,DollarSign,Calendar,
  Building2,FileText, Clock, AlertTriangle, CheckCircle2,
  Plus, Upload
} from 'lucide-angular';
import {Contract, ContractService} from './contract.service';
import {Project, ProjectService} from '../projects/project.service';

@Component({
  selector: 'app-contracts',
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
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
  readonly Building2 = Building2;
  readonly Calendar = Calendar;
  readonly DollarSign = DollarSign;
  readonly Filter = Filter;
  readonly Search = Search;
  readonly X = X;
  readonly BrainCircuit = BrainCircuit;

  private contractService = inject(ContractService);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  contracts: Contract[] = [];
  filters = ["Tümü", "Ana Sözleşmeler", "Taşeron Sözleşmeleri"];
  activeFilter = "Tümü";

  availableProjects: Project[] = [];

  contractForm!: FormGroup;
  showAddModal = false;

  ngOnInit() {
    this.initForm();
    this.loadContracts();
    this.loadAvailableProjects();
  }

  initForm(): void {
    this.contractForm = this.fb.group({
      projectId: ['', Validators.required],
      title: ['', Validators.required],
      counterpartyName: ['', Validators.required],
      type: ['1', Validators.required], // 1: Ana Sözleşme, 2: Taşeron
      contractValue: [0, [Validators.required, Validators.min(1)]],
      currency: ['TRY', Validators.required],
      signingDate: ['', Validators.required],
      penaltyRate: ['']
    });
  }

  loadContracts(): void {
    this.contractService.getContracts().subscribe({
      next: (data) => this.contracts = data,
      error: (err) => console.error('Sözleşmeler çekilirken hata oluştu:', err)
    });
  }

  loadAvailableProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.availableProjects = data,
      error: (err) => console.error('Projeler dropdown için çekilemedi:', err)
    });
  }

  // Formu kaydet butonuna basıldığında çalışacak metot
  onSubmit(): void {
    if (this.contractForm.invalid) {
      alert('Lütfen zorunlu alanları doldurun Usta!');
      this.contractForm.markAllAsTouched();
      return;
    }

    const formValue = this.contractForm.value;

    // API'nin yutacağı Command modeline dönüştürüyoruz
    const command = {
      projectId: formValue.projectId,
      title: formValue.title,
      counterpartyName: formValue.counterpartyName,
      type: parseInt(formValue.type, 10),
      contractValue: formValue.contractValue,
      currency: formValue.currency,
      signingDate: new Date(formValue.signingDate).toISOString(),
      penaltyRate: formValue.penaltyRate
    };

    this.contractService.createContract(command).subscribe({
      next: (newId) => {
        console.log('Sözleşme başarıyla eklendi. ID:', newId);
        this.showAddModal = false; // Formu kapat
        this.contractForm.reset({ type: '1', currency: 'TRY' }); // İçini temizle
        this.loadContracts(); // Tabloyu yeni verilerle güncelle
      },
      error: (err) => console.error('Sözleşme eklenirken hata:', err)
    });
  }

  get activeContractsCount(): number {
    // 2: Yürürlükte (Active)
    return this.contracts.filter(c => c.status === 2).length;
  }

  get totalMainContractValue(): number {
    // Sadece Ana Sözleşmelerin (Gelirlerin) toplam bedeli
    return this.contracts
      .filter(c => c.type === 1)
      .reduce((sum, c) => sum + Number(c.contractValue || 0), 0);
  }

  get pendingAiAnalysisCount(): number {
    // 1: YZ Analizi Bekliyor (NotStarted)
    return this.contracts.filter(c => c.aiStatus === 1).length;
  }



  // --- UI FORMATLAMA VE RENK SINIFLARI (C# Enums ile Eşleşir) ---

  getStatusLabel(status: number): string {
    const map: Record<number, string> = {
      1: "Taslak",
      2: "Yürürlükte",
      3: "Tamamlandı",
      4: "Askıda",
      5: "Feshedildi"
    };
    return map[status] || "Bilinmiyor";
  }

  getStatusClass(status: number): string {
    const map: Record<number, string> = {
      1: "status-warning",
      2: "status-primary",
      3: "status-success",
      4: "status-orange",
      5: "status-danger"
    };
    return map[status] || "status-primary";
  }

  getTypeLabel(type: number): string {
    return type === 1 ? "Ana Sözleşme" : "Taşeron Sözleşmesi";
  }

  getTypeClass(type: number): string {
    return type === 1 ? "type-blue" : "type-purple";
  }

  getAiStatusClass(aiStatus: number): string {
    const map: Record<number, string> = {
      1: "text-warning", // Analiz Bekliyor
      2: "text-success", // Edildi
      3: "text-danger"   // Hata
    };
    return map[aiStatus] || "text-primary";
  }
}
