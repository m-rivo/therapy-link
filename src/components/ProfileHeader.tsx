import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Cake, Mail, Phone } from "lucide-react";
import { User } from "lucide-react";

export default function ProfileHeader() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://bundui-images.netlify.app/avatars/08.png"
                alt="Profile"
              />
              <AvatarFallback>
                <User size={40} />
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            >
              <Camera />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">Jane Doe</h1>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                jane.doe@example.com
              </div>
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                9988-7766
              </div>
              <div className="flex items-center gap-1">
                <Cake className="size-4" />
                30 de marzo de 1999
              </div>
            </div>
          </div>
          <Button variant="default">Editar Perfil</Button>
        </div>
      </CardContent>
    </Card>
  );
}
