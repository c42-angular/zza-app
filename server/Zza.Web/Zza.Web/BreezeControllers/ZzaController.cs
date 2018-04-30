using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using Zza.Data;
using Zza.Web.BusinessLogic;

namespace Zza.Web.BreezeControllers
{
    [BreezeController]
    public class ZzaController : ApiController
    {
        EFContextProvider<ZzaDbContext> _contextProvider = new EFContextProvider<ZzaDbContext>();

        public ZzaController()
        {
            //_contextProvider.BeforeSaveEntitiesDelegate += beforeSaveEntities;
            _contextProvider.BeforeSaveEntityDelegate += beforeSaveEntity;
        }

        private bool beforeSaveEntity(EntityInfo entityInfo)
        {
            if (entityInfo.Entity.GetType() == typeof(Customer))
            {
                var customer = (Customer)entityInfo.Entity;
                if (customer.Zip == "22222") throw new ArgumentException("22222 is an invalid zip code");
            }
                //return CustomerLogic.OnSaveCustomer((Customer)entityInfo.Entity);
            return true;
        }

        //private Dictionary<Type, List<EntityInfo>> beforeSaveEntities(Dictionary<Type, List<EntityInfo>> entityInfos)
        //{
        //    if (entityInfos.ContainsKey(typeof(Order)))
        //    {
        //        var orders = entityInfos[typeof(Order)];
        //        var orderTotal = 0m;
        //        orders.ForEach(o => orderTotal += ((Order)o.Entity).ItemsTotal);
        //        if (orderTotal > 10.0m)
        //            throw new ArgumentException("Order total exceeds single call policy");
        //    }
        //    return entityInfos;
        //}

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject bundle)
        {
            return _contextProvider.SaveChanges(bundle);
        }

        [HttpGet]
        //[EnableBreezeQuery(AllowedQueryOptions = AllowedQueryOptions.All & ~(AllowedQueryOptions.OrderBy | AllowedQueryOptions.Top | AllowedQueryOptions.Skip))]
        //[EnableBreezeQuery(MaxExpansionDepth = 1)]
        public IQueryable<Customer> Customers()
        {
            //var user = ClaimsPrincipal.Current.Identity.Name;
            //// Lookup state that user is responsible for
            //var userState = "MO";
            //return _contextProvider.Context.Customers.Where(c => c.State == userState);
            return _contextProvider.Context.Customers;
        }

        [HttpGet]
        public IQueryable<Product> Products()
        {
            return _contextProvider.Context.Products;
        }

        [HttpGet]
        public IQueryable<Order> Orders()
        {
            return _contextProvider.Context.Orders;
        }

        [HttpGet]
        public object Lookups()
        {
            return new
            {
                OrderStatuses = _contextProvider.Context.OrderStatuses,
                ProductOptions = _contextProvider.Context.ProductOptions,
                ProductSizes = _contextProvider.Context.ProductSizes
            };
        }

    }
}
