import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../assets/Title';

// Generate Order Data

function preventDefault(event) {
    event.preventDefault();
}

export default function TableSuppliers({ title, suppliers }) {
    return (
        <React.Fragment>
            <Title>Fornecedores {title}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Localização</TableCell>
                        <TableCell>Custo kW/h</TableCell>
                        <TableCell>Capacidade mínima (kW/h)</TableCell>
                        <TableCell>Total de clientes</TableCell>
                        <TableCell>Avaliação média</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.nome}</TableCell>
                            <TableCell>{supplier.estado_origem}</TableCell>
                            <TableCell>{supplier.custo_kwh}</TableCell>
                            <TableCell>{supplier.limite_minimo_kwh}</TableCell>
                            <TableCell>{supplier.total_clientes}</TableCell>
                            <TableCell>{supplier.avaliacao_media_clientes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}