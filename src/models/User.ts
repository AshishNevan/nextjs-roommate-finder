export default class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public phone: string,
        public gender: string,
        public age: number,
        public university: string,
        public major: string,
        public graduation_date: string,
        public preferences: {
            smoking: boolean,
            pets: boolean,
            study_habits: string,
            sleeping_habits: string,
            move_in_date: string,
            move_out_date: string,
            budget: number,
        },
        public location: {
            address: string,
            city: string,
            state: string,
            zip_code: string,
            latitude: number,
            longitude: number,
        },
        public createdAt: string,
        public _id?: string
    ) { }
}