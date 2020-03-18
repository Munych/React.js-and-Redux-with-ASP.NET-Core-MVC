using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApplication1.Models;
using System;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<UserDescription> GetUsersList(int pageNum)
        {
            using (StreamReader r = new StreamReader("users.json"))
            {
                string json = r.ReadToEnd();
                List<UserDescription> users = JsonConvert.DeserializeObject<List<UserDescription>>(json);

                return users;
            }
        }

        [HttpGet("[action]")]
        public JsonResult BlockUser(int recordId)
        {
            List<UserDescription> buffer; // ввожу новую переменную типа List дл€ переноса массива юзеров между методами чтени€ и записи
            using (StreamReader r = new StreamReader("users.json")) // метод чтени€ файла json
            {
                string json = r.ReadToEnd(); // считываю данные с файла в переменную json
                List<UserDescription> users = JsonConvert.DeserializeObject<List<UserDescription>>(json); // ƒесериализую в List
                foreach (var user in users) // прохожусь по массиву users foreach-ом
                {
                    if (user.id == recordId) // если id пришедшего из запроса равен id юзера, то поле blocked юзера мен€ю на true
                    {
                        user.blocked = true;
                    }
                }
                buffer = users; // присваиваю в buffer измененный массив юзеров
            }
            using (StreamWriter w = new StreamWriter("users.json")) // метод записи данных в файл json
            {
                string json = JsonConvert.SerializeObject(buffer.ToArray()); // сериализую массив buffer в json
                w.WriteLine(json); // перезаписываю файл users.json
            }
           // return Json("ѕерезаписано");
            return Json(buffer); // ответ дл€ контрол€
        }
    }
}
