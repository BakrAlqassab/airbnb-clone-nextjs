import {Listing, Reservation, User} from "@prisma/client";

export type safeUser = Omit<
User, "createdAt"| "updatedAt"| "emailVerified"
>& {
    createdAt:string;
    updatedAt:string;
    emailVerified:string | null;
}

export type safeListing = Omit<
Listing, "createdAt"
>& {
    createdAt:string;
}

export type SafeReservations = Omit<
Reservation, "createdAt"| "startDate"| "endDate" | "listing"
>& {
    createdAt:string;
    startDate:string;
    endDate:string;
    listing:safeListing;
    totalPrice: number;
    id: string;
    listingId: string;
    userId: string;
}
