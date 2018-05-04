import { Injectable } from '@angular/core';

import { EntityManager, EntityQuery, Predicate, FilterQueryOp } from 'breeze-client';

import { Customer } from '../model/entity-model';
import { RegistrationHelper } from '../model/registration-helper';
import { reject } from 'q';

@Injectable()
export class ZzaRepositoryService {

    // private _em: EntityManager = new EntityManager('http://localhost:2113/breeze/zza');
    private _em: EntityManager = new EntityManager('http://zzaapi.azurewebsites.net/breeze/zza');

    constructor() {
        RegistrationHelper.register(this._em.metadataStore);
    }

    getCustomers(pageNumber: number, pageSize: number): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            const query = EntityQuery.from('Customers')
                        .orderBy(['state', 'lastName'])
                        .skip((pageNumber - 1) * pageSize)
                        .take(pageSize)
                        .inlineCount();

                        this._em.executeQuery(query).then(queryResult =>
                            resolve({customers: queryResult.results, totalRecords: queryResult.inlineCount}),
                            error => reject(error));
        });

        return promise;
    }

    getCustomer(id) : Promise<Customer> {
        let promise = new Promise<Customer>((resolve, reject) => {
            let query = EntityQuery.from('Customers').where('id', 'equals', id);

            if (!this._em.metadataStore.isEmpty) {
                let customers = this._em.executeQueryLocally(query);
                if (customers && customers.length === 1) {
                    resolve(<any>customers[0]);
                }
            }

            this._em.executeQuery(query).then(queryResults => {
                let customers = queryResults.results;
                if (customers && customers.length ===1) {
                    resolve(<any> customers[0]);
                } else {
                    reject(null);
                }
            }, error => {
                reject(error);
            });
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

    search(searchText: string, field: string): Promise<Customer[]> {
      const promise = new Promise<Customer[]>((resolve, reject) => {
        let pred: Predicate;

        if (field === 'name') {
          pred = new Predicate('firstName', FilterQueryOp.Contains, searchText)
                  .or(new Predicate('lastName', FilterQueryOp.Contains, searchText));
        } else { pred = new Predicate(field, FilterQueryOp.Contains, searchText); }

        const query = EntityQuery.from('Customers').where(pred);
        const customers = <Customer[]> this._em.executeQueryLocally(query);

        resolve(customers);
      });

      return promise;
    }
}
