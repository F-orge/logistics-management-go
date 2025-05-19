import { useLocation } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@marahuyo/react-ui/ui/breadcrumb';

export function useTSRBreadCrumbs() {
  const current = useLocation();

  const route_history = current.pathname
    .split('/')
    .filter((x) => x && x.length > 0);

  const breadcrumb_routes = route_history.reduce(
    (acc: { name: string; path: string }[], route) => {
      const prev_path = acc[acc.length - 1]?.path ?? '';
      acc.push({ name: route, path: `${prev_path}/${route}` });
      return acc;
    },
    [],
  );
  return { breadcrumb_routes };
}

export function TSRBreadCrumbs() {
  const { breadcrumb_routes } = useTSRBreadCrumbs();
  if (breadcrumb_routes.length < 2) return null;
  return (
    <div className="gap-2.5 flex w-full flex-wrap mb-2.5 pb-2.5 border-b">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumb_routes.map((crumb) => {
            if (
              breadcrumb_routes.length - 1 ===
              breadcrumb_routes?.indexOf(crumb)
            ) {
              return (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbPage className="hover:text-accent-text cursor-pointer">
                    {crumb.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <div className="flex items-center gap-1.5" key={crumb.path}>
                <BreadcrumbItem key={crumb.path}>
                  <Link
                    to={crumb.path}
                    className="hover:text-accent-text line-clamp-1 cursor-pointer"
                  >
                    {crumb.name}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
