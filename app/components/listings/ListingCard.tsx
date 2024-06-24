"use client";
import React, { useCallback, useMemo } from "react";
import { safeListing, SafeReservations, safeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "@/app/components/Button";
import { useLocale } from "next-intl";

interface ListingCardProps {
  key?: string;
  data: safeListing;
  reservation?: SafeReservations | undefined;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: safeUser;
}

export default function ListingCard({
  key,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const lang = useLocale();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, onAction, disabled],
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationData = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/${lang}/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
      key={key}
    >
      <div className="flex flex-col gap-2 w-full select-none">
        <div className="aspect-square  w-full relative overflow-hidden rounded-xl ">
          <Image
            fill
            alt="Listing"
            src={
              data.imageSrc.length
                ? data.imageSrc
                : "/images/default-product-image.png"
            }
            className="object-contain h-full w-full hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region} , {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationData || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night </div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
