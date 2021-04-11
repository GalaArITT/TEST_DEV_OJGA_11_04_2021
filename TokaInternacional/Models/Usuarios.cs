using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TokaInternacional.Models
{
    public partial class Usuarios
    {
        public int IdUsuarios { get; set; }
        public string NombreUsuario { get; set; }
        public string Password { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}
