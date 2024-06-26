/* eslint-disable prettier/prettier */
"use client";
import { SafeReservations, safeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";
import { SwiperSlider } from "@/app/components/client/SwiperSlider";

interface TripsClientProps {
  reservations: SafeReservations[];
  currentUser?: safeUser | undefined;
}

export default function TripsClient({
  reservations,
  currentUser,
}: TripsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      const result = confirm("Are you sure you want to remove the reservation ?");
      if (result) {
        setDeletingId(id);

        axios
          .delete(`/api/reservations/${id}`)
          .then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
          })
          .catch((error) => {
            toast.error(error?.response?.data?.error);
          })
          .finally(() => setDeletingId(""));
      }
    },
    [router],
  );

  return (
    <Container>
      <Heading
        title="Trips!"
        subTitle="where you have been and where you're going!"
      />
      {/*<div*/}
      {/*    className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">*/}
      <SwiperSlider>
        {reservations.map((reservation) => (
          // eslint-disable-next-line react/jsx-key
          <div className="mr-4 mt-10 ">
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionLabel="Cancel reservation!"
              currentUser={currentUser}
              onAction={onCancel}
              actionId={reservation.id}
              disabled={reservation.id === deletingId}
            />
          </div>
        ))}
      </SwiperSlider>

      {/*</div>*/}
    </Container>
  );
}
