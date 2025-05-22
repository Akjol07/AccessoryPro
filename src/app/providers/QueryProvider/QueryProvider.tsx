"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
          mutations: {
            onError: (error) => {
              const errorMessage = (
                error as unknown as { response: { data: { detail: string } } }
              ).response.data.detail;

              toast(errorMessage || "Something went wrong");
            },
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
