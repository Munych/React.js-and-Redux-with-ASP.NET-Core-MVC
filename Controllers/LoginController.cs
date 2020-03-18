using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class LoginController : Controller
    {
        /// <summary>
        /// Открытие отображения
        /// </summary>
        public IActionResult Index()
        {
            ViewBag.Title = "Авторизация";
            ViewBag.Message = "Введите учетные данные";

            var model = new LoginModel(HttpContext);

            return View(model);
        }

        /// <summary>
        /// Кнопка Вход
        /// </summary>
        /// <returns></returns>
        public IActionResult Authenticate(string userName, string password)
        {
            if (LoginModel.CheckAccount(HttpContext, userName, password))
                return Redirect("/");

            return Json("Неверные учетные данные");
        }
    }
}
