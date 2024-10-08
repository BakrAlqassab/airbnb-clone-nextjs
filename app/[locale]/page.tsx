import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings, { IListingParams } from "@/app/actions/getListings";
import ListingCard from "@/app/components/listings/ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { safeListing } from "@/app/types";

interface HomePageProps {
  searchParams: IListingParams;
}
export default async function Home({ searchParams }: HomePageProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 main-page card">
        {listings &&
          listings.map((listing: safeListing, index: any) => {
            return (
              <div className="m-p-t" key={index}>
                <ListingCard
                  currentUser={currentUser}
                  key={listing?.id}
                  data={listing}
                />
              </div>
            );
          })}
      </div>
    </Container>
  );
}
