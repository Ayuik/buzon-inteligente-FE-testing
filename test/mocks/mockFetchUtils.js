import { vi } from "vitest";

export const mockFetch = (response) => vi.fn(() => Promise.resolve(response));

export const mockJsonResponse = (response, ok = true, status = 200) => ({
  ok,
  status,
  json: () => Promise.resolve(response),
});