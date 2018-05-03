import { Injectable } from '@angular/core';

import{ EntityManager, EntityQuery} from 'breeze-client';

import { Customer } from '../model/entity-model';
import { RegistrationHelper } from '../model/registration-helper'

@Injectable()
export class ZzaRepositoryService {

    // private _em: EntityManager = new EntityManager('http://localhost:2113/breeze/zza');
    private _em: EntityManager = new EntityManager('http://zzaapi.azurewebsites.net/breeze/zza');

    constructor() { 
        RegistrationHelper.register(this._em.metadataStore);
    }

    getCustomers() : Promise<Customer[]> {
        let promise = new Promise<Customer[]>((resolve, reject) => {
            let query = EntityQuery.from("Customers");
            this._em.executeQuery(query).then(queryResult => resolve(<any>queryResult.results),
                    error => reject(error));
        });

        return promise;
    }

    saveChanges() {
        let promise = new Promise((resolve, reject) => {
            this._em.saveChanges().then(() => resolve(), 
                            error => reject(error));
        });

        return promise;
    }
}