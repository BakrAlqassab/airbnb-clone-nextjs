"use client"
import {IconType} from "react-icons"
import {useRouter, useSearchParams} from "next/navigation"
import {useCallback} from "react";
import qs from "query-string"

interface categoryBoxProps {
    key: string;
    label: string;
    Icon: IconType;
    selected?: boolean;

}

export default function CategoryBox({key, label, Icon, selected}: categoryBoxProps) {
    const router = useRouter();
    const params = useSearchParams()
    const handleClick = useCallback(() => {


        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery, category: label
        }

        if(params?.get("category") === label) {

            delete updatedQuery.category
        }
        const url = qs.stringifyUrl({ url: "/", query: updatedQuery}, {skipNull: true})
        console.log(url)
        router.push(url)
    }, [label,params,router])
    return (
        <div  onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800
            transition cursor-pointer ${selected ? "border-b-neutral-800" : "border-transparent"} ${selected ? "text-neutral-800" : "text-neutral-500"}`}>
            <Icon size={26}/>
            <div className="1fon-medium text-sm">   {label}</div>
        </div>
    )
}