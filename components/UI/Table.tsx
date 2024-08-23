import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';

type Props = {
    table: any;
    handleRowClick: any;
    tableColor?: string;
};

const Table = ({ table, handleRowClick, tableColor }: Props) => {
    return (
        <div className={`h-full w-full overflow-y-auto rounded-md border ${tableColor === 'blue' && 'border-l-blue'} ${tableColor === 'green' && 'border-l-green'} ${tableColor === 'yellow' && 'border-l-yellow'} scrollbar-none`}>
            <table className='w-full border-separate border-spacing-0 text-center'>
                <thead className={`sticky inset-0 ${tableColor === 'blue' && 'bg-l-blue'} ${tableColor === 'green' && 'bg-l-green'} ${tableColor === 'yellow' && 'bg-l-yellow'} ${tableColor === undefined && 'bg-white'} h-[30px] text-primary`}>
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
                                        <div className='main-hover rounded px-2 py-[1px]'>
                                            {{
                                                asc: <i className='fi fi-rr-arrow-up text-selected text-xxs mr-1' />,
                                                desc: <i className='fi fi-rr-arrow-down text-selected text-xxs mr-1' />,
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
                            <tr className='main-hover hover:cursor-pointer' key={row.id} onClick={() => handleRowClick(row.original)}>
                                {row.getVisibleCells().map((cell: any) => (
                                    <td key={cell.id} className='text-elipsis h-10 whitespace-nowrap px-4'>
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
