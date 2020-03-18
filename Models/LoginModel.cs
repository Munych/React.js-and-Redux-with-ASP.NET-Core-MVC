using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace WebApplication1.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class LoginModel
    {
        /// <summary>
        /// Конструктор
        /// </summary>
        public LoginModel(HttpContext httpContext)
        {
            UserName = httpContext.Session.GetString("UserName");
            Password = httpContext.Session.GetString("Password");
        }

        public string UserName { get; set; }

        public string Password { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public static bool CheckAccount(HttpContext httpContext, string userName, string password)
        {
            var siteUser = Startup.Configuration.GetSection("SiteUser").Get<SiteUser>();

            if (siteUser.UserName == userName && siteUser.Password == password)
            {
                return true;
            }

            httpContext.Session.SetString("UserName", userName);
            httpContext.Session.SetString("Password", password);

            return false;
        }
    }
}