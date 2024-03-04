import { ColumnFiltersState, SortingState, useReactTable, getSortedRowModel, getCoreRowModel, getFilteredRowModel, getExpandedRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues } from '@tanstack/react-table';
import { useState } from 'react';

export const initializeTable = (data: any, columns: any, sortingOptions?: any) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>(sortingOptions || []);

    return useReactTable({
        data: data,
        columns: columns,
        state: {
            sorting,
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });
};
