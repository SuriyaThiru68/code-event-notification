'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Icons.dashboard },
  { href: '/contests', label: 'Contests', icon: Icons.contests },
  { href: '/workspace', label: 'Workspace', icon: Icons.workspace },
  { href: '/notes', label: 'Notes', icon: Icons.notes },
  { href: '/calendar', label: 'Calendar', icon: Icons.calendar },
  { href: '/todo', label: 'Todo List', icon: Icons.todo },
  { href: '/profile', label: 'Profile', icon: Icons.profile },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon, badge }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === href && 'bg-muted text-primary'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
          {badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
}
