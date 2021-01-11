using Microsoft.AspNetCore.Mvc;

namespace Hahn.ApplicationProcess.December2020.Web.Controllers
{
    [Controller]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        public HomeController() { }

        [HttpGet]
        public ActionResult Get()
        {
            return File("~/index.html", "text/html");
        }
    }
}