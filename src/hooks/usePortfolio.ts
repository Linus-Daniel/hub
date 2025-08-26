// hooks/usePortfolios.ts
import { useState, useEffect } from "react";
import { Portfolio } from "@/types";

export const usePortfolios = (userId?: string) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const url = userId
        ? `/api/portfolios?userId=${userId}`
        : "/api/portfolios";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch portfolios");
      const data = await response.json();
      setPortfolios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createPortfolio = async (
    portfolioData: Omit<Portfolio, "_id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolioData),
      });
      if (!response.ok) throw new Error("Failed to create portfolio");
      await fetchPortfolios();
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const updatePortfolio = async (
    id: string,
    portfolioData: Partial<Portfolio>
  ) => {
    try {
      const response = await fetch(`/api/portfolios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolioData),
      });
      if (!response.ok) throw new Error("Failed to update portfolio");
      await fetchPortfolios();
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const deletePortfolio = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete portfolio");
      await fetchPortfolios();
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [userId]);

  return {
    portfolios,
    loading,
    error,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    refetch: fetchPortfolios,
  };
};
