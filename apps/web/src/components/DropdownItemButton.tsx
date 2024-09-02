import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LucideProps } from "lucide-react";

interface DropdownItemButtonProps {
    title: string;
    Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    onClick?: () => void;
}

const DropdownItemButton = ({
    title,
    Icon,
    onClick,
}: DropdownItemButtonProps) => {
    return (
        <DropdownMenuItem className={"p-4 font-medium flex cursor-pointer"}>
            <Button
                variant={"ghost"}
                className="p-0 m-0 w-full h-full bg-transparent hover:bg-transparent justify-start"
                onClick={onClick || undefined}
            >
                <Icon className="h-6 w-6 mr-4" />
                {title}
            </Button>
        </DropdownMenuItem>
    );
};

export default DropdownItemButton;
