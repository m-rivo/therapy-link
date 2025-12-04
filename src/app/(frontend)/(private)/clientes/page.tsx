import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import ClientsTable from './components/ClientsTable'

//TODO: agregar actions para ver, enviar mensaje whatsapp, etc
export default async function Clientes() {
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
  )
}
