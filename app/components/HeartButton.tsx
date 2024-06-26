/* eslint-disable prettier/prettier */
import {safeUser} from "@/app/types";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import useFavorite from "@/app/hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: safeUser;

}

export default function HeartButton({listingId, currentUser}: HeartButtonProps) {

    const { hasFavorited, toggleFavorite} = useFavorite({listingId,currentUser})
    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer" key={listingId}>
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
            <AiFillHeart  size={24} className={hasFavorited ? "fill-rose-500" :"fill-neutral-500/70"} aria-label={listingId} />
        </div>
    )
}
