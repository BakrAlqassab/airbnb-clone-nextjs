import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationClient from "@/app/trips/TripsClient";


export default async function TripPage() {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return <EmptyState title="Unauthorized" subTitle="Please Login"/>
    }

    const reservation = await getReservations({authorId: currentUser.id})

    if(reservation.length === 0) {

        return (

            <EmptyState title="No reservations Found!"  subTitle="Look like no reservation on your property!" />
        )
    }

    return (
      <ReservationClient
          reservations={reservation}
          currentUser={currentUser}
      />
    )
}
