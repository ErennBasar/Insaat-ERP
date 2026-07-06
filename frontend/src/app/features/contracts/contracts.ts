import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  contracts = [
    {
      id: "SZ-2026-001",
      name: "Ankara OSB Elektrik Alt Yapı Sözleşmesi",
      client: "EÜAŞ",
      value: "₺24.500.000",
      signed: "15.03.2025",
      duration: "18 Ay",
      paymentTerm: "30 Gün",
      guarantee: "Kesin: %5 | Avans: %10",
      penalty: "Günlük ‰3",
      warranty: "24 Ay",
      aiStatus: "Analiz Edildi",
      alerts: 2,
    },
    {
      id: "SZ-2026-002",
      name: "İzmir Liman Mekanik Tesisat Sözleşmesi",
      client: "Liman İşletmeleri A.Ş.",
      value: "₺18.200.000",
      signed: "01.06.2025",
      duration: "24 Ay",
      paymentTerm: "45 Gün",
      guarantee: "Kesin: %5",
      penalty: "Günlük ‰5",
      warranty: "12 Ay",
      aiStatus: "Analiz Edildi",
      alerts: 1,
    },
    {
      id: "SZ-2026-003",
      name: "İstanbul Metro İkmal Projesi Sözleşmesi",
      client: "İETT",
      value: "₺31.800.000",
      signed: "10.01.2025",
      duration: "18 Ay",
      paymentTerm: "30 Gün",
      guarantee: "Kesin: %6 | Avans: %10",
      penalty: "Günlük ‰4",
      warranty: "36 Ay",
      aiStatus: "Analiz Edildi",
      alerts: 3,
    },
    {
      id: "SZ-2026-004",
      name: "Bursa Fabrika Güçlendirme Sözleşmesi",
      client: "Bosch Türkiye",
      value: "₺9.600.000",
      signed: "01.05.2026",
      duration: "20 Ay",
      paymentTerm: "60 Gün",
      guarantee: "Kesin: %5",
      penalty: "Günlük ‰2",
      warranty: "24 Ay",
      aiStatus: "Bekleniyor",
      alerts: 0,
    },
  ];
}
