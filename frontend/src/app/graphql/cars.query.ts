import gql from 'graphql-tag';

export const getCar = gql`
    query getCar($id: Long!){
        car(arg0 : $id){
            id
            name
            giphyUrl
        }
    }`;


export const getAllCars = gql`
    query getAllCars {
        cars{
            id
            name
            giphyUrl
        }
    }`;

export const saveCar = gql`
    mutation saveCar($car: CarInput!) {
        saveCar(arg0: $car) {
            id
            name
            giphyUrl
        }
    }`;

export const deleteCar = gql`
    mutation deleteCar($id: Long!) {
        deleteCar(arg0: $id)
    }`;
