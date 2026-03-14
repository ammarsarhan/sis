import { Languages } from "lucide-react";

import { Button } from "#/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "#/components/ui/dropdown-menu";

import logo from "#/assets/logo.png";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-x-2.5">
                <img src={logo} alt="E-JUST logo" className='object-fit h-10'/>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">E-JUST Postgraduate SIS</span>
                    <span className="text-gray-500 text-xs">Egypt-Japan University of Science and Technology</span>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-gray-200 focus-within:border-gray-400 focus-within:ring-gray-200">
                    <Button variant="outline" className="border-gray-300 gap-x-1.5 hover:bg-gray-50 cursor-pointer">
                        <Languages className="size-3.5"/>
                        <span className="text-xxs">English/عربي</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200 text-xxs" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500 mb-1">Select Language</DropdownMenuLabel>
                        <DropdownMenuItem className="hover:bg-gray-100 transition-colors cursor-pointer">English</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-100 transition-colors cursor-pointer">عربي</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}