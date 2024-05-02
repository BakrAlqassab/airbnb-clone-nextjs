"use client"
import {useCallback, useState, useMemo} from "react";

import Modal from "./Modal";
import {useRouter, useSearchParams} from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import {Range} from "react-date-range"
import dynamic from "next/dynamic"
import Map from "@/app/components/Map"
import CountrySelect, {countrySelectValues} from "../inputs/CountrySelect"
import Counter from "../inputs/Counter"
import qs from "query-string";
import {formatISO} from "date-fns";
import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/inputs/Calendar";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2

}


export default function SearchModal() {
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<countrySelectValues>()

    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({

        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    })


    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (params) {

            currentQuery = qs.parse(params.toString())
        }

        const updateQuery: any = {
            ...currentQuery,
            locationValue: location.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updateQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate)
        }


        const url = qs.stringifyUrl({

            url: "/",
            query: updateQuery


        }, {skipNull: true})

        setStep(STEPS.LOCATION)

        searchModal.onClose()

        router.push(url)


    }, [
        step,
        searchModal,
        guestCount,
        roomCount,
        bathroomCount,
        location,
        dateRange,
        onNext,
        onBack,
        params,
        router

    ])

    const actionLabel = useMemo(() => {

        if (step === STEPS.INFO) {
            return "Search"
        }

        return "Next"

    }, [step])

    const secondaryActionLabel = useMemo(() => {

        if (step === STEPS.LOCATION) {
            return undefined
        }

        return "Back"

    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title=" Where do you wanna go" subTitle="Find the perfect location!"/>
            <CountrySelect onChange={(value) => setLocation(value as countrySelectValues)} value={location}/>
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="when do upu plan to go ? " subTitle=" Make sure everyone is free!"/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title=" More information" subTitle="Find your perfect place"/>

                <Counter title="guests" subTitle="How many guests are coming ? "
                         value={guestCount}
                         onChange={(value) => setGuestCount(value)}/>
                <Counter title="Rooms" subTitle="How many rooms do you need ? "
                         value={roomCount}
                         onChange={(value) => setRoomCount(value)}/>

                <Counter title="Bathrooms" subTitle="How many bathrooms do you need ? "
                         value={bathroomCount}
                         onChange={(value) => setBathroomCount(value)}/>
            </div>
        )
    }


    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    )
}
