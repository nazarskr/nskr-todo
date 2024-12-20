export interface RequestStatus {
  loading: boolean;
  error: string | null;
}

export const initialRequestStatus: RequestStatus = {
  loading: false,
  error: null,
};

export const startLoading = (): RequestStatus => ({
  loading: true,
  error: null,
});

export const requestSuccess = (): RequestStatus => ({
  loading: false,
  error: null,
});

export const requestFailure = (error: string): RequestStatus => ({
  loading: false,
  error,
});
