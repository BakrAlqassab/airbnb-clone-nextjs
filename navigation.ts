import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {locales, pathnames, localePrefix} from './config';

export const { useRouter} =
    createLocalizedPathnamesNavigation({
        locales,
        pathnames,
        localePrefix
    });
