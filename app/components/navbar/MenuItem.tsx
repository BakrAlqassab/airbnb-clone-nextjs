"use client"

interface menuItemProps {
    onClick:()=> void;
    label: string;
    className: string;
}

export default function MenuItem({onClick,label,className}: menuItemProps){
    return (
        <div onClick={onClick}   className={`px-4 py-3 hover:bg-neutral-100 transitcion font-semibold ${className}`}>
            {label}
        </div>

    )
}
