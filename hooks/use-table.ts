import { useReactTable, getSortedRowModel, getCoreRowModel, getFilteredRowModel, getExpandedRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues } from '@tanstack/react-table';
import type { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import { useState } from 'react';

type UseTableProps<T> = {
    data: T[];
    columns: any;
    initialSorting?: SortingState;
};

export const useTable = <T>({
    data,
    columns,
    initialSorting = [],
}: UseTableProps<T>): {
    table: Table<T>;
} => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>(initialSorting);
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility: { created_at: false },
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });

    return {
        table,
    };
};
