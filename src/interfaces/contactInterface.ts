interface contactInterface{
    id:number;
    name: string;
    address: string;
    phone: string;
    email: string;
    is_favourite_contact: boolean;
    photograph: any;

}

export type contactToCreate = Omit<contactInterface, "id">

export default contactInterface;