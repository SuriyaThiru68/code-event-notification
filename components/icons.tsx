import {
  type LucideIcon,
  LayoutDashboard,
  Swords,
  Keyboard,
  FileText,
  CalendarDays,
  User,
  PanelLeft,
  Search,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Code2,
  AlertTriangle,
  Share,
  CheckSquare,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 20l4-16m4 16l-4-16"/>
      <path d="M18 8h-4.5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2H18"/>
      <path d="M6 16h4.5a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H6"/>
    </svg>
  ),
  dashboard: LayoutDashboard,
  contests: Swords,
  workspace: Keyboard,
  notes: FileText,
  calendar: CalendarDays,
  profile: User,
  todo: CheckSquare,
  menu: PanelLeft,
  search: Search,
  settings: Settings,
  bell: Bell,
  logout: LogOut,
  chevronDown: ChevronDown,
  code: Code2,
  alertTriangle: AlertTriangle,
  share: Share,
  whatsapp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        <path d="M14.05 16.97A9 9 0 0 1 5.03 7.95" />
    </svg>
  ),
};
