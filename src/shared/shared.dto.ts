export class SuccessResDto {
    startusCode: string
    date: any

    constructor(partial: Partial<SuccessResDto>) {
        Object.assign(this, partial);
    }
}