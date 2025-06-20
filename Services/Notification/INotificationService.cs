namespace Team_Project_Meta.Services.Notification
{
    public interface INotificationService
    {
        Task SendEmailAsync(string toEmail, string subject, string bodyHtml);
    }
}
