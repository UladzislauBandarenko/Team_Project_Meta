using Team_Project_Meta.DTOs.Admin;

namespace Team_Project_Meta.Services.Admin
{
    public interface IAdminService
    {
        Task<AdminMetricsDto> GetMetricsAsync();
    }
}
