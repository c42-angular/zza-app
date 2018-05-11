import { Injectable } from '@angular/core';

import { EntityManager, EntityQuery, Predicate, FilterQueryOp,
    FetchStrategySymbol, FetchStrategy, EntityState, Entity, core } from 'breeze-client';

import { Customer, Order } from '../model/entity-model';
import { RegistrationHelper } from '../model/registration-helper';

@Injectable()
export class ZzaRepositoryService {

   // private _em: EntityManager = new EntityManager('http://localhost:2113/breeze/zza');
    private _em: EntityManager = new EntityManager('http://zzaapi.azurewebsites.net/breeze/zza');
    private _isInitialised = false;

    constructor() {
        RegistrationHelper.register(this._em.metadataStore);
    }

    initialise(): Promise<boolean> {
      const promise = new Promise<boolean>((resolve, reject) => {
        // tslint:disable-next-line:curly
        if (this._isInitialised) {
          resolve(true);
        } else {
        this._em.fetchMetadata()
          .then(_ => {
            this._isInitialised = true;
            resolve(true);
          })
          .catch(err => {
            console.error(err);
            reject(false);
          });
        }
      });

      return promise;
    }

    createEntity(entityType: string): Entity {
      const config = {};

      if (entityType === 'Customer') config.id = core.getUuid();

      return this._em.createEntity(entityType, config);
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

    getCustomer(id): Promise<Customer> {
        const promise = new Promise<Customer>((resolve, reject) => {
            const query = EntityQuery.from('Customers').where('id', 'equals', id);

            let strategy: FetchStrategySymbol;
            if (!this._em.metadataStore.isEmpty) {
              strategy = FetchStrategy.FromLocalCache;
            } else {
              strategy = FetchStrategy.FromServer;
            }

            this._em.executeQuery(query.using(strategy)).then(queryResults => {
                const customers = queryResults.results;
                if (customers && customers.length === 1) {
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

    // gets only from local cache
    getCustomerById(id: string) {
      return this._em.getEntityByKey('Customer', id);
    }

    // gets entities from local cache in specified states
    getCustomersWithChanges() {
      return this._em.getEntities('Customer',
            [EntityState.Added, EntityState.Deleted, EntityState.Modified]);
    }

    getCustomerOrderHistory(customerId: string): Promise<Order[]> {
      const promise = new Promise<Order[]>((resolve, reject) => {
        const query = EntityQuery.from('Orders')
              .where('customerId', 'equals', customerId)
              .expand(['items', 'items.product']);

        this._em.executeQuery(query).then(queryResult => resolve(<Order[]>queryResult.results),
          error => reject(error));
      });

      return promise;
    }

    saveChanges() {
        const promise = new Promise((resolve, reject) => {
            this._em.saveChanges().then(() => resolve(),
                            error => reject(error));
        });

        return promise;
    }

    getCustomerSummaries(): Promise<Customer[]> {
      const promise = new Promise<Customer[]>((resolve, reject) => {
        const query = EntityQuery.from('Customers')
                      .select(['firstName', 'lastName', 'phone', 'email']);
        this._em.executeQuery(query).then(queryResults => {
          resolve(<Customer[]> queryResults.results);
        }, error => reject(error));
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
