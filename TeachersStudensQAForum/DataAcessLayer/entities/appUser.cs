using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

//namespace DataAcessLayer.entities
//{
//    internal class appUser
//    {
//    }
//}
public class appUser : IdentityUser
{
    public string FullName { get; set; }
}
