export abstract class BaseService {
  protected getErrorMessage(error: unknown): string {
    if (typeof error === "string") {
      return error;
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === "object" && error && "response" in error) {
      const response = error as {
        response?: {
          data?: {
            errors?: string[];
            message?: string;
          };
          statusText?: string;
        };
      };

      const errors = response.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        return String(errors[0]);
      }

      if (response.response?.data?.message) {
        return String(response.response.data.message);
      }

      if (response.response?.statusText) {
        return response.response.statusText;
      }
    }

    return "Request failed";
  }
}
