using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Zza.Data;

namespace Zza.Web.BusinessLogic
{
    public class CustomerLogic
    {
        public static bool OnSaveCustomer(Customer customer)
        {
            if (customer.FirstName == "Derek") throw new ArgumentException("Disavowed customer");
            return customer.FirstName != "Jordan";
        }
    }
}