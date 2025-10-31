import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import ClientsTable from "@/components/ClientsTable";

export default function Clientes() {
  return (
    <>
      <ButtonGroup>
        <Input placeholder="Buscar..." />
        <Button variant="outline" aria-label="Search" type="submit">
          <SearchIcon />
        </Button>
      </ButtonGroup>
      <ClientsTable />
    </>
  );
}
