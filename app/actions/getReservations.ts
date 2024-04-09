import prisma from "@/app/libs/prismadb"
export default async function getReservations() {
    interface Iparams {

        listingId?:string;
        userId?:string;
        authorId?:string;
    }
    try {

        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        const safeListing = listings.map((listing)=> ({

            ... listing, createdAt: listing.createdAt.toISOString()
        }));

        return safeListing

    } catch (error) {
        throw new Error(error)

    }
}
