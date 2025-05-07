using Microsoft.AspNetCore.Mvc;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/{controller}")]
public class TasksController : ControllerBase
{
    public TasksController()
    {

    }
}