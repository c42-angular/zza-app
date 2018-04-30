import { Injectable } from '@angular/core';

import{ EntityManager, EntityQuery} from 'breeze-client';

import { Customer } from '../model/customer';


@Injectable()
export class ZzaRepositoryService {

    private _em: EntityManager = new EntityManager('http://zzaapi.azurewebsites.net/breeze/zza');

    constructor() { }

    getCustomers() : Promise<Customer[]> {
        let promise = new Promise<Customer[]>((resolve, reject) => {
            let query = EntityQuery.from("Customers");
            this._em.executeQuery(query).then(queryResult => resolve(<any>queryResult.results),
                    error => reject(error));
        });

        return promise;
    }
}