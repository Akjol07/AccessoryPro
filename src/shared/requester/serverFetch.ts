"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN, BASE_URL } from "../variables/variables";

export const serverFetch = async <T>(
  input: string,
  init?: RequestInit | undefined,
): Promise<T | null> => {
  try {
    const access_token = (await cookies()).get(ACCESS_TOKEN)?.value;

    const response = await fetch(new URL(input, BASE_URL!).href, {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        ...(init?.headers ?? {}),
      },
      next: { revalidate: 0 },
      ...(init ?? {}),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const json = await response.json();
      if (response.status === 401) {
        return {
          ...json,
          expired: true,
        };
      }
      return json;
    }
  } catch (error) {
    console.error(error);
    // @ts-expect-error/error-type-any
    const digest = error.digest;
    if (
      digest &&
      typeof digest === "string" &&
      digest.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return null;
  }
};
