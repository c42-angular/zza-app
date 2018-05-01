using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace Zza.Web.BreezeControllers
{
    [BreezeController]
    public class ZzaController : ApiController
    {
        EFContextProvider<ZzaDbContext> _contextProvider = new EFContextProvider<ZzaDbContext>();

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
        public IQueryable Customers()
        {
            return _contextProvider.Context.Customers;
        }

        [HttpGet]
        public IQueryable Products()
        {
            return _contextProvider.Context.Products;
        }

        [HttpGet]
        public IQueryable Orders()
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
