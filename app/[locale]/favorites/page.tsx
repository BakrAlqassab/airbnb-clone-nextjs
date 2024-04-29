import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
 import getFavoriteListing from "@/app/actions/getFavoriteListing";
import FavoritesClient from "@/app/[locale]/favorites/FavoritesClient";


export default async function ListingPage() {
    const listings = await getFavoriteListing()
    const currentUser = await getCurrentUser()

    if(!listings.length) {
        return <EmptyState title="No favorites found" subTitle="Looks like you have no favorite listing"/>
    }

    return (
        <div>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </div>

    )
}
