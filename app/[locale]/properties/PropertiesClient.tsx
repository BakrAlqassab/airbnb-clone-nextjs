"use client";
import { safeListing, safeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: safeListing[];
  currentUser?: safeUser | undefined;
}

export default function PropertiesClient({
  listings,
  currentUser,
}: PropertiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      const result = confirm(
        "Are you sure you want to remove the reservation ?",
      );
      if (result) {
        setDeletingId(id);

        axios
          .delete(`/api/listings/${id}`)
          .then(() => {
            toast.success("Listing deleted");
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
      <Heading title="Properties!" subTitle="List of your properites!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 card">
        {listings.map((listing, index) => (
          <div className="m-p-t" key={index}>
            <ListingCard
              key={listing.id}
              data={listing}
              actionLabel="Delete Property!"
              currentUser={currentUser}
              onAction={onCancel}
              actionId={listing.id}
              disabled={listing.id === deletingId}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
