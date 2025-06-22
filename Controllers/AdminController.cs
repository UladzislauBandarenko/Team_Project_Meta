using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Team_Project_Meta.DTOs.Admin;
using Team_Project_Meta.Services.Admin;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("metrics")]
        public async Task<ActionResult<AdminMetricsDto>> GetMetrics()
        {
            var metrics = await _adminService.GetMetricsAsync();
            return Ok(metrics);
        }
    }
}
