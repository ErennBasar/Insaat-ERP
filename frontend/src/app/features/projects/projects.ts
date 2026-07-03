import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {
  FolderKanban, MapPin, User, Calendar, TrendingUp,
  Plus, Filter, Search
} from 'lucide-angular';

export interface ProjectData {
  id: string;
  name: string;
  client: string;
  manager: string;
  location: string;
  contractValue: string;
  completedValue: string;
  remainingValue: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'Devam Ediyor' | 'Kritik' | 'Başlangıç' | 'Tamamlandı';
  profit: string;
  type: 'Elektrik' | 'Mekanik' | 'İnşaat';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
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

  projects: ProjectData[] = [
    {
      id: "PRJ-2026-001", name: "Ankara OSB Elektrik Alt Yapı", client: "EÜAŞ", manager: "Murat Demir",
      location: "Ankara", contractValue: "₺24.500.000", completedValue: "₺16.660.000", remainingValue: "₺7.840.000",
      startDate: "15.03.2025", endDate: "30.09.2026", progress: 68, status: "Devam Ediyor", profit: "+%11.2", type: "Elektrik",
    },
    {
      id: "PRJ-2026-002", name: "İzmir Liman Mekanik Tesisat", client: "Liman İşletmeleri A.Ş.", manager: "Selin Kaya",
      location: "İzmir", contractValue: "₺18.200.000", completedValue: "₺7.644.000", remainingValue: "₺10.556.000",
      startDate: "01.06.2025", endDate: "30.06.2027", progress: 42, status: "Devam Ediyor", profit: "+%9.8", type: "Mekanik",
    },
    {
      id: "PRJ-2026-003", name: "İstanbul Metro İkmal Projesi", client: "İETT", manager: "Burak Arslan",
      location: "İstanbul", contractValue: "₺31.800.000", completedValue: "₺28.302.000", remainingValue: "₺3.498.000",
      startDate: "10.01.2025", endDate: "31.07.2026", progress: 89, status: "Kritik", profit: "+%7.1", type: "Elektrik",
    },
    {
      id: "PRJ-2026-004", name: "Bursa Fabrika Güçlendirme", client: "Bosch Türkiye", manager: "Elif Yılmaz",
      location: "Bursa", contractValue: "₺9.600.000", completedValue: "₺1.440.000", remainingValue: "₺8.160.000",
      startDate: "01.05.2026", endDate: "31.12.2027", progress: 15, status: "Başlangıç", profit: "+%14.5", type: "İnşaat",
    },
    {
      id: "PRJ-2026-005", name: "Konya OSB Dağıtım Hattı", client: "MEDAŞ", manager: "Emre Çelik",
      location: "Konya", contractValue: "₺14.100.000", completedValue: "₺7.755.000", remainingValue: "₺6.345.000",
      startDate: "15.09.2025", endDate: "15.04.2027", progress: 55, status: "Devam Ediyor", profit: "+%13.0", type: "Elektrik",
    }
  ];

  filters = ["Tümü", "Elektrik", "Mekanik", "İnşaat"];
  activeFilter = "Tümü";

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
