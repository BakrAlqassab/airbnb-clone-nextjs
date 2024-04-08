interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: ((value: Range) => void);
    dateRange: Range
    onSubmit: () => void;
    disabled?: boolean
    disabledDates:Date[];

}

export default function ListingReservation() {
    return (


        <div></div>
    )
}
