using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TokaInternacional.Models
{
    public class ApplicationSetting_Token
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
    }
}
