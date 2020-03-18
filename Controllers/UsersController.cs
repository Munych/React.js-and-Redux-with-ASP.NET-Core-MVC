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
            List<UserDescription> buffer; // ����� ����� ���������� ���� List ��� �������� ������� ������ ����� �������� ������ � ������
            using (StreamReader r = new StreamReader("users.json")) // ����� ������ ����� json
            {
                string json = r.ReadToEnd(); // �������� ������ � ����� � ���������� json
                List<UserDescription> users = JsonConvert.DeserializeObject<List<UserDescription>>(json); // ������������ � List
                foreach (var user in users) // ��������� �� ������� users foreach-��
                {
                    if (user.id == recordId) // ���� id ���������� �� ������� ����� id �����, �� ���� blocked ����� ����� �� true
                    {
                        user.blocked = true;
                    }
                }
                buffer = users; // ���������� � buffer ���������� ������ ������
            }
            using (StreamWriter w = new StreamWriter("users.json")) // ����� ������ ������ � ���� json
            {
                string json = JsonConvert.SerializeObject(buffer.ToArray()); // ���������� ������ buffer � json
                w.WriteLine(json); // ������������� ���� users.json
            }
           // return Json("������������");
            return Json(buffer); // ����� ��� ��������
        }
    }
}
