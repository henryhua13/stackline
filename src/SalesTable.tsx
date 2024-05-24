import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Product } from './state';

type Props = {
    product: Product,
};

interface Column {
    id: 'weekEnding' | 'retailSales' | 'wholesaleSales' | 'unitsSold' | 'retailerMargin';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right';
    format?: (value: any) => string;
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function convertDate(dateStr: string) {
    let date = new Date(dateStr);
    let month = date.getMonth() + 1;
    return (month < 10 ? "0" : "") + month + '-' + date.getDate() + '-' + (date.getFullYear() % 100);
}

const columns: readonly Column[] = [
    { 
        id: 'weekEnding', 
        label: 'WEEK ENDING', 
        minWidth: 170, 
        format: (value: string) => convertDate(value) },
    {
        id: 'retailSales',
        label: 'RETAIL SALES',
        minWidth: 170,
        align: 'right',
        format: (value: number) => formatter.format(value),
    },
    {
        id: 'wholesaleSales',
        label: 'WHOLESALE SALES',
        minWidth: 170,
        align: 'right',
        format: (value: number) => formatter.format(value),
    },
    {
        id: 'unitsSold',
        label: 'UNITS SOLD',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'retailerMargin',
        label: 'RETAILER MARGIN',
        minWidth: 170,
        align: 'right',
        format: (value: number) => formatter.format(value),
    },
];


function SalesTable(props: Props) {

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '75vh' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.product.sales
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.weekEnding}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default SalesTable;