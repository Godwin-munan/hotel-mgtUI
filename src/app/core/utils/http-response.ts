export interface HttpResponse<T> {
    httpStatus: string,
    response: string,
    message: string,
    status: number,
    data: T
}