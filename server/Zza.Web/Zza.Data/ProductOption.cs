using System;
using System.Collections.Generic;
using System.Linq;

namespace Zza.Data
{
    public class ProductOption
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public int Factor { get; set; }
        public bool IsPizzaOption { get; set; }
        public bool IsSaladOption { get; set; }
    }
}
