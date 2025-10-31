import { Shield, Key, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import InputDatePicker from "./InputDatePicker";
//import { Switch } from "@/components/ui/switch";
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import { Textarea } from "@/components/ui/textarea";
//import { Badge } from "@/components/ui/badge";

export default function ProfileContent() {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" defaultValue="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <Input id="phone" defaultValue="9988-7766" />
              </div>
              <div className="space-y-2">
                <InputDatePicker id="birth-date" label="Fecha de Nacimiento" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
