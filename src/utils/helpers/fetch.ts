export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetcherOptions {
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
}

export interface APIFieldErrors {
  [key: string]: string;
}

export class APIError extends Error {
  fieldErrors?: APIFieldErrors;
  constructor(message: string, fieldErrors?: APIFieldErrors) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

export const fetcher = async <T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> => {
  try {
    const { method = 'GET', body, headers = {} } = options;
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_API_URL}${endpoint}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      if (res.status === 422 && errorBody?.errors) {
        throw new APIError(errorBody.message || "Validation error", errorBody.errors);
      }
      throw new Error(errorBody.message || "API error");
    }
    return res.json();
  } catch (error) {
    throw error;
  }
};
