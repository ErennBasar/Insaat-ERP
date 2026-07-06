import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {
  LayoutDashboard, FolderKanban, FileText, Receipt, Shield,
  ShoppingCart, Package, TrendingDown, Banknote, HardHat,
  Truck, BarChart3, BrainCircuit, ChevronRight, Building2,
  Bell, Settings, Search, ChevronLeft
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  // HTML tarafında ikonları statik olarak kullanabilmek için:
  readonly Building2 = Building2;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly Settings = Settings;
  readonly ChevronRight = ChevronRight;

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  modules = [
    {
      label: "GENEL",
      items: [
        { icon: LayoutDashboard, label: "Yönetim Paneli", href: "/dashboard", badge: null },
      ],
    },
    {
      label: "PROJE & SÖZLEŞME",
      items: [
        { icon: FolderKanban, label: "Proje Yönetimi", href: "/projects", badge: "12" },
        { icon: FileText, label: "Sözleşme Yönetimi", href: "/contracts", badge: null },
        { icon: Receipt, label: "Hakediş Yönetimi", href: "/hakedis", badge: "3" },
        { icon: Shield, label: "Teminat Mektupları", href: "/teminat", badge: "5" },
      ],
    },
    {
      label: "TEDARİK & STOK",
      items: [
        { icon: ShoppingCart, label: "Satın Alma", href: "/satin-alma", badge: null },
        { icon: Package, label: "Stok & Depo", href: "/stok", badge: null },
      ],
    },
    {
      label: "FİNANS",
      items: [
        { icon: TrendingDown, label: "Alacak Takibi", href: "/alacak", badge: "2" },
        { icon: Banknote, label: "Nakit Akışı", href: "/nakit-akis", badge: null },
      ],
    },
    {
      label: "SAHA & EKİPMAN",
      items: [
        { icon: HardHat, label: "Personel & Şantiye", href: "/personel", badge: null },
        { icon: Truck, label: "Araç & Ekipman", href: "/arac-ekipman", badge: null },
      ],
    },
    {
      label: "ANALİZ",
      items: [
        { icon: BarChart3, label: "Yönetim Raporları", href: "/raporlar", badge: null },
        { icon: BrainCircuit, label: "Yapay Zeka", href: "/yapay-zeka", badge: "YZ" },
      ],
    },
  ];
  protected readonly ChevronLeft = ChevronLeft;
}
