'use client';

import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';
import { MoveDown, MoveUp } from 'lucide-react';

type Props = {
    table: any;
    handleRowClick: any;
    tableColor?: string;
};

const Table = ({ table, handleRowClick, tableColor }: Props) => {
    return (
        <div className={`h-full w-full overflow-y-auto rounded-lg border border-orange-100 bg-white shadow dark:bg-black scrollbar-none`}>
            <table className='w-full border-separate border-spacing-0 text-center'>
                <thead className={`gold-gradient sticky inset-0  h-[40px] text-primary`}>
                    {table.getHeaderGroups().map((headerGroup: any) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    {...{
                                        onClick: header.column.getToggleSortingHandler(),
                                        className: header.column.getIsSorted() ? 'text-selected font-normal px-4' : 'px-4 font-normal',
                                    }}>
                                    {header.isPlaceholder ? null : (
                                        <div className='main-hover flex items-center justify-center rounded'>
                                            {{
                                                asc: <MoveUp size={16} strokeWidth={1} />,
                                                desc: <MoveDown size={16} strokeWidth={1} />,
                                            }[header.column.getIsSorted() as string] ?? null}
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row: any) => (
                        <Fragment key={row.id}>
                            <tr className='main-hover transition duration-200 hover:cursor-pointer' key={row.id} onClick={() => handleRowClick(row.original)}>
                                {row.getVisibleCells().map((cell: any) => (
                                    <td key={cell.id} className='text-elipsis h-10 whitespace-nowrap border-b px-4'>
                                        <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                    </td>
                                ))}
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
