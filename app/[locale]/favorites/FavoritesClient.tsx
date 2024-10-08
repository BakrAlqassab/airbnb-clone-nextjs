"use client";
import { safeListing, safeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: safeListing[];
  currentUser?: safeUser | undefined;
}

export default function FavoritesClient({
  listings,
  currentUser,
}: FavoritesClientProps) {
  return (
    <Container>
      <Heading
        title="Favorites!"
        subTitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 card">
        {listings.map((listing, index) => (
          <div className="m-p-t" key={index}>
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
