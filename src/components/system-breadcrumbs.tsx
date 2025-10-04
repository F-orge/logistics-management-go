import { useRouter, useRouterState } from '@tanstack/react-router';
import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Optionally, you can provide a mapping from path segments to display names
const PATH_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'Users',
  settings: 'Settings',
  // Add more mappings as needed
};

export function SystemBreadcrumbs() {
  const router = useRouterState();
  const { buildLocation } = useRouter();
  const pathname = router.location.pathname;

  // Split the pathname into segments, ignoring empty segments
  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb data: [{label, href, isLast}]
  const breadcrumbs = segments.map((segment, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label =
      PATH_LABELS[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);
    return {
      label,
      href,
      isLast: idx === segments.length - 1,
    };
  });

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
