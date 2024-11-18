import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { UserMenu } from "@/components"

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Productos', href: '/' },
  { name: 'Servicios', href: '/' },
  { name: 'Contacto', href: '/' },
]

export default function Header() {
  return (
    <header className="p-10 flex flex-col md:flex-row justify-between items-center text-center text-white w-full"> 
      <nav className="hidden md:flex space-x-4 w-full md:w-[50vw] md:order-1">
        {menuItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className={`hover:text-orange-500 transition-all duration-300 ease-in-out ${index === 0 ? 'text-orange-500' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
        
      <Sheet>
        <section className="flex items-center justify-between w-full md:hidden order-2">
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden text-black"> 
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        </section>
        <SheetContent className="bg-gray-100 p-4">
          <SheetHeader className="mb-4">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.name}>
                <Link href={item.href} className={`block py-2 px-4 hover:text-orange-500 transition-all duration-300 ease-in-out ${index === 0 ? 'text-orange-500' : ''}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      <section className="flex items-center justify-between w-full md:w-[50vw] order-1 md:order-2 mb-2 md:mb-0">
        <h1 className="text-xl font-bold mr-4">Gamor</h1>
        <UserMenu />
      </section>
    </header>
  )
}

