import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses");
      return res.data.data;
    },
  });
}