"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const data: Payment[] = [
  // --- Registros 1-5 ---
  {
    id: "m5gr84i9",
    nombre: "Javier",
    apellido: "Rodríguez",
    telefono: "82345678",
    correo: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    nombre: "Ana",
    apellido: "Martínez",
    telefono: "79876543",
    correo: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    nombre: "Luis",
    apellido: "Gómez",
    telefono: "61239876",
    correo: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    nombre: "Sofía",
    apellido: "López",
    telefono: "95432109",
    correo: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    nombre: "Carlos",
    apellido: "Díaz",
    telefono: "87654321",
    correo: "carmella@example.com",
  },
  // --- Registros 6-65 (Generados Adicionales) ---
  {
    id: "a1b2c3d4",
    nombre: "Elena",
    apellido: "Pérez",
    telefono: "71122334",
    correo: "jessica01@example.com",
  },
  {
    id: "e5f6g7h8",
    nombre: "Miguel",
    apellido: "Sánchez",
    telefono: "68877665",
    correo: "michael_s@example.com",
  },
  {
    id: "i9j0k1l2",
    nombre: "Laura",
    apellido: "Ruiz",
    telefono: "94455667",
    correo: "david_l@example.com",
  },
  {
    id: "m3n4o5p6",
    nombre: "David",
    apellido: "Hernández",
    telefono: "80102030",
    correo: "sarah_k@example.com",
  },
  {
    id: "q7r8s9t0",
    nombre: "María",
    apellido: "Jiménez",
    telefono: "76543210",
    correo: "chris_r@example.com",
  },
  {
    id: "u1v2w3x4",
    nombre: "Ricardo",
    apellido: "Moreno",
    telefono: "65432198",
    correo: "emily_c@example.com",
  },
  {
    id: "y5z6a7b8",
    nombre: "Isabel",
    apellido: "Álvarez",
    telefono: "91234567",
    correo: "daniel_t@example.com",
  },
  {
    id: "c9d0e1f2",
    nombre: "Pedro",
    apellido: "Romero",
    telefono: "88776655",
    correo: "olivia_m@example.com",
  },
  {
    id: "g3h4i5j6",
    nombre: "Carmen",
    apellido: "Navarro",
    telefono: "70707070",
    correo: "james_p@example.com",
  },
  {
    id: "k7l8m9n0",
    nombre: "Alejandro",
    apellido: "Gil",
    telefono: "69876543",
    correo: "sophia_h@example.com",
  },
  {
    id: "o1p2q3r4",
    nombre: "Patricia",
    apellido: "Vázquez",
    telefono: "93456789",
    correo: "william_a@example.com",
  },
  {
    id: "s5t6u7v8",
    nombre: "Jorge",
    apellido: "Blanco",
    telefono: "85678901",
    correo: "ava_j@example.com",
  },
  {
    id: "w9x0y1z2",
    nombre: "Andrea",
    apellido: "Serrano",
    telefono: "74321098",
    correo: "ethan_w@example.com",
  },
  {
    id: "a3b4c5d6",
    nombre: "Manuel",
    apellido: "Molina",
    telefono: "62109876",
    correo: "isabella_z@example.com",
  },
  {
    id: "e7f8g9h0",
    nombre: "Natalia",
    apellido: "Suárez",
    telefono: "99887766",
    correo: "jacob_d@example.com",
  },
  {
    id: "i1j2k3l4",
    nombre: "Daniel",
    apellido: "Ortega",
    telefono: "84321987",
    correo: "mia_f@example.com",
  },
  {
    id: "m5n6o7p8",
    nombre: "Eva",
    apellido: "Delgado",
    telefono: "77665544",
    correo: "alexander_g@example.com",
  },
  {
    id: "q9r0s1t2",
    nombre: "Felipe",
    apellido: "Castro",
    telefono: "63214567",
    correo: "chloe_l@example.com",
  },
  {
    id: "u3v4w5x6",
    nombre: "Inés",
    apellido: "Rubio",
    telefono: "90099887",
    correo: "noah_k@example.com",
  },
  {
    id: "y7z8a9b0",
    nombre: "Sergio",
    apellido: "Santos",
    telefono: "81234567",
    correo: "grace_b@example.com",
  },
  {
    id: "c1d2e3f4",
    nombre: "Raquel",
    apellido: "Flores",
    telefono: "75432190",
    correo: "samuel_v@example.com",
  },
  {
    id: "g5h6i7j8",
    nombre: "Adrián",
    apellido: "Morales",
    telefono: "60987654",
    correo: "lily_w@example.com",
  },
  {
    id: "k9l0m1n2",
    nombre: "Lucía",
    apellido: "Vidal",
    telefono: "92345678",
    correo: "benjamin_r@example.com",
  },
  {
    id: "o3p4q5r6",
    nombre: "Mario",
    apellido: "Peña",
    telefono: "86543210",
    correo: "elizabeth_x@example.com",
  },
  {
    id: "s7t8u9v0",
    nombre: "Clara",
    apellido: "Ramos",
    telefono: "78901234",
    correo: "henry_o@example.com",
  },
  {
    id: "w1x2y3z4",
    nombre: "Héctor",
    apellido: "Gil",
    telefono: "64567890",
    correo: "addison_n@example.com",
  },
  {
    id: "a5b6c7d8",
    nombre: "Paula",
    apellido: "Vargas",
    telefono: "97654321",
    correo: "jackson_q@example.com",
  },
  {
    id: "e9f0g1h2",
    nombre: "Iván",
    apellido: "Méndez",
    telefono: "83210987",
    correo: "scarlett_p@example.com",
  },
  {
    id: "i3j4k5l6",
    nombre: "Silvia",
    apellido: "Cruz",
    telefono: "72109876",
    correo: "leo_j@example.com",
  },
  {
    id: "m7n8o9p0",
    nombre: "Marcos",
    apellido: "Herrera",
    telefono: "66554433",
    correo: "zoe_m@example.com",
  },
  {
    id: "q1r2s3t4",
    nombre: "Diana",
    apellido: "Medina",
    telefono: "91122334",
    correo: "lucas_e@example.com",
  },
  {
    id: "u5v6w7x8",
    nombre: "Pablo",
    apellido: "Cortés",
    telefono: "80011223",
    correo: "madison_h@example.com",
  },
  {
    id: "y9z0a1b2",
    nombre: "Sara",
    apellido: "Aguilar",
    telefono: "77766554",
    correo: "elijah_c@example.com",
  },
  {
    id: "c3d4e5f6",
    nombre: "Juan",
    apellido: "Pascual",
    telefono: "65544332",
    correo: "aubrey_l@example.com",
  },
  {
    id: "g7h8i9j0",
    nombre: "Julia",
    apellido: "Rivas",
    telefono: "99009988",
    correo: "gabriel_d@example.com",
  },
  {
    id: "k1l2m3n4",
    nombre: "Rubén",
    apellido: "Marín",
    telefono: "82020202",
    correo: "hannah_g@example.com",
  },
  {
    id: "o5p6q7r8",
    nombre: "Noelia",
    apellido: "Sanz",
    telefono: "71717171",
    correo: "adam_z@example.com",
  },
  {
    id: "s9t0u1v2",
    nombre: "Guillermo",
    apellido: "Diez",
    telefono: "68686868",
    correo: "victoria_f@example.com",
  },
  {
    id: "w3x4y5z6",
    nombre: "Lorena",
    apellido: "Vega",
    telefono: "94949494",
    correo: "ryan_q@example.com",
  },
  {
    id: "a7b8c9d0",
    nombre: "Fátima",
    apellido: "León",
    telefono: "85858585",
    correo: "natalie_b@example.com",
  },
  {
    id: "e1f2g3h4",
    nombre: "Oscar",
    apellido: "Ibañez",
    telefono: "73737373",
    correo: "brooks_a@example.com",
  },
  {
    id: "i5j6k7l8",
    nombre: "Esther",
    apellido: "Prieto",
    telefono: "60606060",
    correo: "ella_w@example.com",
  },
  {
    id: "m9n0o1p2",
    nombre: "Hugo",
    apellido: "Núñez",
    telefono: "92929292",
    correo: "aiden_x@example.com",
  },
  {
    id: "q3r4s5t6",
    nombre: "Nuria",
    apellido: "Lorenzo",
    telefono: "81818181",
    correo: "penelope_y@example.com",
  },
  {
    id: "u7v8w9x0",
    nombre: "Alex",
    apellido: "Calvo",
    telefono: "74747474",
    correo: "nolan_s@example.com",
  },
  {
    id: "y1z2a3b4",
    nombre: "Rocío",
    apellido: "Dominguez",
    telefono: "63636363",
    correo: "claire_t@example.com",
  },
  {
    id: "c5d6e7f8",
    nombre: "Mar",
    apellido: "Reyes",
    telefono: "95959595",
    correo: "austin_r@example.com",
  },
  {
    id: "g9h0i1j2",
    nombre: "Francisco",
    apellido: "Cortés",
    telefono: "88887777",
    correo: "ruby_m@example.com",
  },
  {
    id: "k3l4m5n6",
    nombre: "Nerea",
    apellido: "Garrido",
    telefono: "70123456",
    correo: "joshua_v@example.com",
  },
  {
    id: "o7p8q9r0",
    nombre: "Jaime",
    apellido: "Vicente",
    telefono: "69087654",
    correo: "eva_h@example.com",
  },
  {
    id: "s1t2u3v4",
    nombre: "Lidia",
    apellido: "Bravo",
    telefono: "93322110",
    correo: "miles_i@example.com",
  },
  {
    id: "w5x6y7z8",
    nombre: "Bruno",
    apellido: "Herrero",
    telefono: "84567890",
    correo: "harper_k@example.com",
  },
  {
    id: "a9b0c1d2",
    nombre: "Marta",
    apellido: "Soto",
    telefono: "75678901",
    correo: "gavin_o@example.com",
  },
  {
    id: "e3f4g5h6",
    nombre: "Ángel",
    apellido: "Méndez",
    telefono: "66778899",
    correo: "evelyn_l@example.com",
  },
  {
    id: "i7j8k9l0",
    nombre: "Raúl",
    apellido: "Aguilera",
    telefono: "91110000",
    correo: "finnegan_p@example.com",
  },
  {
    id: "m1n2o3p4",
    nombre: "Beatriz",
    apellido: "Cano",
    telefono: "83334444",
    correo: "aurelia_j@example.com",
  },
  {
    id: "q5r6s7t8",
    nombre: "Vanesa",
    apellido: "Parra",
    telefono: "77788899",
    correo: "theo_b@example.com",
  },
];

export type Payment = {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("apellido")}</div>
    ),
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("telefono")}</div>
    ),
  },
  {
    accessorKey: "correo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("correo")}</div>
    ),
  },
];

export default function ClientsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por correo..."
          value={(table.getColumn("correo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("correo")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/*  */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        {/*  */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
