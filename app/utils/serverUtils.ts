"use server";

import { getLocale } from "next-intl/server";

export async function getLang() {
  return getLocale();
}
