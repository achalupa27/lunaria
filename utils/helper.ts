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

export const formatCurrency = (value: number) => {
    const absValue = Math.abs(value).toFixed(2);
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(absValue);
    return value < 0 ? `-$${formatted}` : `$${formatted}`;
};
