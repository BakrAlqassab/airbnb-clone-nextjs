"use client"
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "./Avatar";
import {useCallback, useState} from "react"
import MenuItem from "./MenuItem";
import {log} from "node:util";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {User} from "@prisma/client";

export default function UserMenu({currentUser}:{currentUser:User | null}) {
const registerModal = useRegisterModal()
const loginModal = useLoginModal()
    const [isOpen,setIsOpen] = useState(false)
    const toggleOpen = useCallback(()=> {
        setIsOpen((value =>!value))

    },[])

    console.log("user meny")
    console.log(currentUser)
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-">
                <div onClick={() => {
                    console.log("weeee")
                }}
                     className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">Airbnb
                    your home
                </div>
                <div onClick={toggleOpen}  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar/>
                    </div>
                </div>
            </div>
            {isOpen && ( <div className="absolute rounded-xl shadow-md w-[40vw] ms:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm p-4 border-black border-2">
                    <div className="flex flex-col cursor-pointer">
                        <>
                        <MenuItem onClick={loginModal.onOpen}    label={"Login"}/>
                        <MenuItem
                            onClick={registerModal.onOpen}
                       label={"Sign up"}/>
                        </>
                    </div>

                </div>
            )}
        </div>
    )
}
