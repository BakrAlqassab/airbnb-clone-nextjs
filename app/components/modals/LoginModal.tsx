"use client"
import axios from "axios"
import {signIn} from "next-auth/react"
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast"
import Button from "@/app/components/Button";
import {redirect, useRouter} from "next/navigation";

export default function LoginModal() {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, handleSubmit, formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen()

    }, [loginModal,registerModal])

    const onSubmit: SubmitHandler<FieldValues> = (data => {
        setIsLoading(true);
        signIn("credentials",
            {...data, redirect: false}
        ).then((callback: any) => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.success("Logged In")
                loginModal.onClose()
                router.refresh();

            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    })
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subTitle="Login to your account!" center/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required
                   type="password"/>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue with google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        First time using Airbnb?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Continue"
               onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               footer={footerContent}

        />
    )
}
