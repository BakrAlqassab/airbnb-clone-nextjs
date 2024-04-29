"use client"
import {SafeReservations, safeUser} from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationClientProps {

    reservations: SafeReservations[];
    currentUser?: safeUser | undefined;
}

export default function ReservationClient({reservations, currentUser}: ReservationClientProps) {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState("")

    const onCancel = useCallback((id: string) => {

        let result = confirm(" Are you sure you want to remove the reservation from your property ? ");
        if (result) {
            setDeletingId(id)
            axios.delete(`/api/reservations/${id}`).then(() => {
                toast.success("Reservation cancelled");
                router.refresh()

            }).catch((error) => {
                toast.error(error?.response?.data?.error)
            }).finally(() =>

                setDeletingId("")
            )
        }

    }, [router])

    return (
        <Container>
            <Heading title="Reservations!" subTitle="Booking on your properties!"/>
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionLabel="Cancel guest reservation!"
                        currentUser={currentUser}
                        onAction={onCancel}
                        actionId={reservation.id}
                        disabled={reservation.id === deletingId}

                    />
                ))}

            </div>
        </Container>
    )
}
