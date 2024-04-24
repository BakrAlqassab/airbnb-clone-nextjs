import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";


export default async function TripPage() {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return <EmptyState title="Unauthorized" subTitle="Please Login"/>
    }

    const reservation = await getReservations({userId: currentUser.id})

    if(reservation.length === 0) {

        return (

            <EmptyState title="No trips Found!"  subTitle="Look like you haven't reserve any trip!" />
        )
    }

    return (
      <TripsClient
          reservations={reservation}
          currentUser={currentUser}
      />
    )
}
