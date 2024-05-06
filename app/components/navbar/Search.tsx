"use client"
import {BiSearch} from "react-icons/bi"
import {useMessages} from "@/app/utils/utils";
import useSearchModal from "@/app/hooks/useSearchModal";

export default function Search() {

    const searchModal = useSearchModal()

    const t = useMessages()
    return (
        <div
            onClick={searchModal.onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >

            <div className="flex flex-row items-center justify-between select-none">
                <div className="text-sm font-semibold px-6">
                     {t("navigation.anyWhere")}

                </div>
                <div className=" hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                     {t("navigation.anyWeek")}
                </div>

                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                  <div className="hidden sm:block"> {t("navigation.addGuests")}</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>

    )
}
