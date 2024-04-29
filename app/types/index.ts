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


export interface IconProps {
    size?:
        | "xs"
        | "s"
        | "m"
        | "l"
        | "xl"
        | "xxl"
        | "2xl"
        | "225xl"
        | "25xl"
        | "xxxl";
    label?: string;
    icon:
        | "account_circle"
        | "add"
        | "close"
        | "co2"
        | "crop"
        | "compare_images"
        | "chevron_up"
        | "chevron_down"
        | "chevron_left"
        | "chevron_right"
        | "delete"
        | "arrow_down"
        | "arrow_left"
        | "arrow_right"
        | "arrow_up"
        | "call"
        | "check"
        | "edit"
        | "edit_square"
        | "error"
        | "favorite"
        | "favorite_star"
        | "favorite_star_gold"
        | "favorite_filled"
        | "favorite_filled_red"
        | "format_color_text"
        | "format_size"
        | "imagesmode"
        | "info"
        | "language"
        | "local_shipping"
        | "loupe"
        | "mail"
        | "menu"
        | "nature"
        | "palette"
        | "photo_camera"
        | "remove"
        | "rotate_right"
        | "search"
        | "share"
        | "shopping_bag"
        | "upload"
        | "visibility"
        | "visibility_off"
        | "zoom_in"
        | "zoom_out"
        | string;
    className?: string;
}
