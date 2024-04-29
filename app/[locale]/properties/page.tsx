import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient"

export default async function PropertiesPage() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subTitle="Please Login"/>
    }

    const listings = await getListings({userId: currentUser.id})

    if(listings.length === 0) {
        return (
            <EmptyState title="No properities Found!"  subTitle="Look like you have no properties!" />
        )
    }
    return (

        <PropertiesClient
        listings={listings}
        currentUser={currentUser}

        />




    )
}
