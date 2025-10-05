import { Row } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Button } from '../../button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../../context-menu';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from '.';

export function DataTable<TData, TValue>(
  props: Omit<
    React.ComponentProps<typeof TableProvider<TData, TValue>>,
    'children' | 'data'
  > & {
    data: TData[];
    disablePrevPage?: boolean;
    onNextPage?: () => void;
    onPrevPage?: () => void;
    contextComponent?: (row: Row<TData>) => React.ReactNode;
    dialogComponent?: (row: Row<TData>) => React.ReactNode;
  },
) {
  return (
    <div>
      <TableProvider
        columns={props.columns}
        data={props.data}
        className={props.className}
        onNewRecord={props.onNewRecord}
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
            <React.Fragment key={row.id}>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <TableRow row={row}>
                    {({ cell }) => <TableCell cell={cell} key={cell.id} />}
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {props.contextComponent?.(row as Row<TData>)}
                </ContextMenuContent>
              </ContextMenu>
              {props.dialogComponent?.(row as Row<TData>)}
            </React.Fragment>
          )}
        </TableBody>
      </TableProvider>
      <div className="flex gap-2.5 pt-4">
        <Button
          size={'icon'}
          disabled={props.disablePrevPage}
          onClick={props.onPrevPage}
        >
          <ChevronLeft />
        </Button>
        <Button
          size={'icon'}
          disabled={props.data.length === 0}
          onClick={props.onNextPage}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
