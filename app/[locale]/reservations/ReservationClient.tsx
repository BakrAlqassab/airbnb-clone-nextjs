"use client";
import { SafeReservations, safeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

interface ReservationClientProps {
  reservations: SafeReservations[];
  currentUser?: safeUser | undefined;
}

export default function ReservationClient({
  reservations,
  currentUser,
}: ReservationClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      const result = confirm(
        " Are you sure you want to remove the reservation from your property ? ",
      );
      if (result) {
        setDeletingId(id);
        axios
          .delete(`/api/reservations/${id}`)
          .then(() => {
            toast.success("Reservation cancelled");
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

  // const particlesOptions = {
  //   fullScreen: {
  //     enable: true,
  //     zIndex: 1,
  //   },
  //   particles: {
  //     number: {
  //       value: 10,
  //       density: {
  //         enable: false,
  //         value_area: 800,
  //       },
  //     },
  //     color: {
  //       value: "#fff",
  //     },
  //     shape: {
  //       type: "star",
  //       options: {
  //         sides: 5,
  //       },
  //     },
  //     opacity: {
  //       value: 0.8,
  //       random: false,
  //       anim: {
  //         enable: false,
  //         speed: 1,
  //         opacity_min: 0.1,
  //         sync: false,
  //       },
  //     },
  //     size: {
  //       value: 4,
  //       random: false,
  //       anim: {
  //         enable: false,
  //         speed: 40,
  //         size_min: 0.1,
  //         sync: false,
  //       },
  //     },
  //     rotate: {
  //       value: 0,
  //       random: true,
  //       direction: "clockwise",
  //       animation: {
  //         enable: true,
  //         speed: 5,
  //         sync: false,
  //       },
  //     },
  //     line_linked: {
  //       enable: true,
  //       distance: 600,
  //       color: "#ffffff",
  //       opacity: 0.4,
  //       width: 2,
  //     },
  //     move: {
  //       enable: true,
  //       speed: 2,
  //       direction: "none",
  //       random: false,
  //       straight: false,
  //       out_mode: "out",
  //       attract: {
  //         enable: false,
  //         rotateX: 600,
  //         rotateY: 1200,
  //       },
  //     },
  //   },
  //   interactivity: {
  //     events: {
  //       onhover: {
  //         enable: true,
  //         mode: ["grab"],
  //       },
  //       onclick: {
  //         enable: false,
  //         mode: "bubble",
  //       },
  //       resize: true,
  //     },
  //     modes: {
  //       grab: {
  //         distance: 400,
  //         line_linked: {
  //           opacity: 1,
  //         },
  //       },
  //       bubble: {
  //         distance: 400,
  //         size: 40,
  //         duration: 2,
  //         opacity: 8,
  //         speed: 3,
  //       },
  //       repulse: {
  //         distance: 200,
  //       },
  //       push: {
  //         particles_nb: 4,
  //       },
  //       remove: {
  //         particles_nb: 2,
  //       },
  //     },
  //   },
  //   retina_detect: true,
  //   background: {
  //     color: "#111",
  //     image: "",
  //     position: "50% 50%",
  //     repeat: "no-repeat",
  //     size: "cover",
  //   },
  // };

  // const anInitFunction = async (main: any) => {
  //   // console.log(main);

  //   // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  //   // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //   // starting from v2 you can add only the features you need reducing the bundle size
  //   await loadFull(main);
  // };

  return (
    <div>
      {/* <Particles
        className="particles -z-40"
        options={particlesOptions}
        init={anInitFunction}
      /> */}

      <Container>
        <Heading title="Reservations!" subTitle="Booking on your properties!" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionLabel="Cancel guest reservation!"
              currentUser={currentUser}
              onAction={onCancel}
              actionId={reservation.id}
              disabled={reservation.id === deletingId}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
