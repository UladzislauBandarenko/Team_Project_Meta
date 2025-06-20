using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Team_Project_Meta.Services.Notification
{
    public class NotificationService : INotificationService
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;

        public NotificationService(IConfiguration configuration)
        {
            var smtpHost = configuration["EmailSettings:SmtpHost"];
            var smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"]);
            var smtpUser = configuration["EmailSettings:SmtpUser"];
            var smtpPass = configuration["EmailSettings:SmtpPass"];
            _fromEmail = configuration["EmailSettings:FromEmail"];

            _smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = true
            };
        }

        public async Task SendEmailAsync(string toEmail, string subject, string bodyHtml)
        {
            var message = new MailMessage(_fromEmail, toEmail, subject, bodyHtml)
            {
                IsBodyHtml = true
            };

            await _smtpClient.SendMailAsync(message);
        }

    }
}
