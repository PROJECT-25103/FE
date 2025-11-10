import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useFilterStore } from "../store/useFilterStore";

export const useQueryFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    query,
    setQuery,
    resetFilter,
    resetFilterExceptPageAndLimit,
    updateQueryParams,
    onChangeSearchInput,
  } = useFilterStore();

  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => (params[key] = value));
    setQuery(params);
  }, [searchParams, setQuery]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
    });
    navigate(`${pathname}?${newParams.toString()}`, { replace: true });
  }, [navigate, pathname, query]);

  return {
    query,
    updateQueryParams,
    resetFilter,
    resetFilterExceptPageAndLimit,
    onChangeSearchInput,
  };
};
