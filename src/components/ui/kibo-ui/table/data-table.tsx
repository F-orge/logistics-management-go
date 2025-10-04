import React from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from '.';
import { Button } from '../../button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../../context-menu';

export function DataTable<TData, TValue>(
  props: Omit<
    React.ComponentProps<typeof TableProvider<TData, TValue>>,
    'children' | 'data'
  > & {
    data: TData[];
    disableNextPage?: boolean;
    disablePrevPage?: boolean;
    onNextPage?: () => void;
    onPrevPage?: () => void;
  },
) {
  return (
    <div>
      <TableProvider
        columns={props.columns}
        data={props.data}
        className={props.className}
      >
        <TableHeader>
          {({ headerGroup }) => (
            <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
              {({ header }) => <TableHead header={header} key={header.id} />}
            </TableHeaderGroup>
          )}
        </TableHeader>
        <TableBody>
          {({ row }) => (
            <ContextMenu key={row.id}>
              <ContextMenuTrigger asChild>
                <TableRow row={row}>
                  {({ cell }) => <TableCell cell={cell} key={cell.id} />}
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          )}
        </TableBody>
      </TableProvider>
      <div className="flex gap-2.5">
        <Button
          size={'icon'}
          disabled={props.disablePrevPage}
          onClick={props.onPrevPage}
        >
          <ChevronLeft />
        </Button>
        <Button
          size={'icon'}
          disabled={props.disableNextPage}
          onClick={props.onNextPage}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
