"use client"
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "./Avatar";
import {useCallback, useState} from "react"
import MenuItem from "./MenuItem";
import {log} from "node:util";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {safeUser} from "@/app/types";

export default function UserMenu({currentUser}: { currentUser?: safeUser | null }) {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((value => !value))

    }, [])

    function loginModalFunction() {
        loginModal.onOpen();
        toggleOpen()
    }

    function registerModalFunction() {
        registerModal.onOpen();
        toggleOpen()
    }

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-4">
                <div onClick={() => {
                    console.log("weeee")
                }}
                     className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">Airbnb
                    your home
                </div>
                <div onClick={toggleOpen}
                     className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md w-[40vw] ms:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm p-4 border-black border-2">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {
                                }} label={"My Trips!"}/>
                                <MenuItem onClick={() => {
                                }} label={"My Favorites!"}/>
                                <MenuItem onClick={() => {
                                }} label={"My Reservations!"}/>
                                <MenuItem onClick={() => {
                                }} label={"My Properties!"}/>
                                <MenuItem onClick={() => {
                                }} label={"Airbnb my home!"}/>

                                <hr/>
                                <MenuItem onClick={() => signOut()} label={"Logout"}/>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModalFunction} label={"Login"}/>
                                <MenuItem
                                    onClick={registerModalFunction}
                                    label={"Sign up"}/>
                            </>
                        )}
                    < /div>

                </div>
            )}
        </div>
    )
}
